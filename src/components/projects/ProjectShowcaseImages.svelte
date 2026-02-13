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

  onMount(() => {
    updateBorderImageVisiblities();
    showcaseContainer.addEventListener("scroll", updateBorderImageVisiblities);
  });

  function updateBorderImageVisiblities() {
    isFirstImageShown = showcaseContainer.scrollLeft == 0;
    isLastImageShown =
      showcaseContainer.scrollLeft + showcaseContainer.clientWidth >=
      showcaseContainer.scrollWidth - 1;
  }

  function nextImage() {
    let nextUnshownElement: Element | undefined;

    for (const element of showcaseContainer.children) {
      if (
        element.getBoundingClientRect().right >
        showcaseContainer.getBoundingClientRect().right
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

    for (const element of [...showcaseContainer.children].toReversed()) {
      if (
        element.getBoundingClientRect().left <
        showcaseContainer.getBoundingClientRect().left
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

  let showcaseContainer: HTMLElement;
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
</style>
