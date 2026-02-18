<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import leftArrowSvg from "../../assets/icons/arrows/left.svg?raw";
  import rightArrowSvg from "../../assets/icons/arrows/right.svg?raw";

  const { images } = $props() as {
    images: ImageMetadata[];
  };

  let isFirstImageShown = $state(true);
  let isLastImageShown = $state(false);
  let activeImageIndex = $state(0);
  let isScrollable = $state(false);

  onMount(() => {
    updateScrollState();
    showcaseContainer!.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", updateScrollState);

    return () => {
      showcaseContainer!.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  });


  function updateScrollState() {
    isFirstImageShown = showcaseContainer!.scrollLeft == 0;
    isLastImageShown =
      showcaseContainer!.scrollLeft + showcaseContainer!.clientWidth >=
      showcaseContainer!.scrollWidth - 1;

    const maxScroll =
      showcaseContainer!.scrollWidth - showcaseContainer!.clientWidth;

    isScrollable = maxScroll > 0;

    if (maxScroll <= 0) {
      // all images fit on screen, TODO: hide dots
      activeImageIndex = 0;
      return;
    }

    let totalImageWidth = 0; // to circumvent gaps causing a problem
    for (const child of showcaseContainer!.children) {
      totalImageWidth += (child as HTMLElement).offsetWidth;
    }

    let currentCheckpoint = 0;
    for (let i = 0; i < showcaseContainer!.children.length; i++) {
      const child = showcaseContainer!.children[i] as HTMLElement;
      const segmentLength = (child.offsetWidth / totalImageWidth) * maxScroll;
      currentCheckpoint += segmentLength;

      if (
        showcaseContainer!.scrollLeft <= currentCheckpoint ||
        i === showcaseContainer!.children.length - 1
      ) {
        activeImageIndex = i;
        break;
      }
    }
  }

  function nextImage() {
    let nextUnshownElement: Element | undefined;

    for (const element of showcaseContainer!.children) {
      if (
        element.getBoundingClientRect().right >
        showcaseContainer!.getBoundingClientRect().right
      ) {
        nextUnshownElement = element;
        break;
      }
    }

    nextUnshownElement?.scrollIntoView({
      inline: "center",
      block: "nearest",
      behavior: "smooth",
    });
  }

  function previousImage() {
    let firstUnshownElement: Element | undefined;

    for (const element of [...showcaseContainer!.children].toReversed()) {
      if (
        element.getBoundingClientRect().left <
        showcaseContainer!.getBoundingClientRect().left
      ) {
        firstUnshownElement = element;
        break;
      }
    }

    firstUnshownElement?.scrollIntoView({
      inline: "center",
      block: "nearest",
      behavior: "smooth",
    });
  }

  let showcaseContainer: HTMLElement | undefined = $state(undefined);
</script>

<div class="showcase-carousel">
  <div class="carousel-buttons">
    {#if !isFirstImageShown}
      <button
        onclick={previousImage}
        transition:fade={{ duration: 200 }}
        class="previous"
      >
        {@html leftArrowSvg}
      </button>
    {/if}

    {#if !isLastImageShown}
      <button
        onclick={nextImage}
        transition:fade={{ duration: 200 }}
        class="next"
      >
        {@html rightArrowSvg}
      </button>
    {/if}
  </div>

  <div class="showcase-images" bind:this={showcaseContainer}>
    {#each images as image}
      <img src={image.src} alt="" />
    {/each}
  </div>

  {#if isScrollable}
    <div class="dots">
      {#each images as _, i}
        <div class="dot" class:active={i === activeImageIndex}></div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .showcase-carousel {
    position: relative;
    height: 20rem;
    margin: 2rem 0;

    &:hover {
      .carousel-buttons button {
        opacity: 1;
      }
    }
  }

  .showcase-images {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;

    display: flex;
    gap: 0.8rem;

    overflow-x: scroll;
    scroll-snap-type: x mandatory;

    &::-webkit-scrollbar {
      display: none;
    }

    & :global(img) {
      height: 100%;
      width: auto;

      scroll-snap-align: center;
    }

    & img:first-child {
      border-top-left-radius: var(--rounded-corner-radius);
      border-bottom-left-radius: var(--rounded-corner-radius);
    }

    & img:last-child {
      border-top-right-radius: var(--rounded-corner-radius);
      border-bottom-right-radius: var(--rounded-corner-radius);
    }
  }

  .carousel-buttons {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    display: flex;
    align-items: center;
    margin: 0 1rem;

    button :global {
      z-index: 2;

      height: 2.8rem;
      aspect-ratio: 1;
      padding: 0.4rem;

      background: var(--surface-color);
      color: var(--primary-color);
      opacity: 0.8;
      border: none;
      border-radius: 100%;

      transition-duration: 200ms;
      opacity: 0;

      &.previous {
        margin-right: auto;
      }
      &.next {
        margin-left: auto;
      }

      svg {
        width: 100%;
        height: 100%;
      }
    }
  }

  .dots {
    position: absolute;
    bottom: 1rem;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    z-index: 2;
    pointer-events: none;
  }

  .dot {
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
    background-color: var(--surface-color);
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
    opacity: 0.5;
    transition:
      opacity 200ms,
      transform 200ms;

    &.active {
      opacity: 1;
      transform: scale(1.2);
    }
  }
</style>
