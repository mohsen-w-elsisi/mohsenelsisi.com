<script lang="ts">
  import LeftArrow from "../../assets/icons/arrows/left.svg?raw";
  import RightArrow from "../../assets/icons/arrows/right.svg?raw";

  const { images } = $props() as {
    images: ImageMetadata[];
  };

  let currentlySelecetdElement = 0;

  function nextImage() {
    if (isAtLastElement() && !isLastElementVisible()) return;
    currentlySelecetdElement++;
    updateScrollPosition();
  }

  function previousImage() {
    if (isAtFirstElement()) return;
    currentlySelecetdElement--;
    updateScrollPosition();
  }

  const isAtFirstElement = () => currentlySelecetdElement == 0;
  const isAtLastElement = () =>
    currentlySelecetdElement == showcaseContainer.children.length - 1;

  const isLastElementVisible = () => {
    const lastElement =
      showcaseContainer.children[showcaseContainer.children.length - 1];
    return lastElement.getBoundingClientRect().right <= window.innerWidth;
  };

  function updateScrollPosition() {
    const activeElement = showcaseContainer.children[currentlySelecetdElement];
    activeElement.scrollIntoView({
      inline: "center",
      behavior: "smooth",
    });
  }

  let showcaseContainer: HTMLElement;
</script>

<div class="showcase-carousel">
  <div class="carousel-buttons">
    <button onclick={previousImage} class="previous">
      {@html LeftArrow}
    </button>
    <button onclick={nextImage} class="next">
      {@html RightArrow}
    </button>
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
    justify-content: space-between;
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

      svg {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
