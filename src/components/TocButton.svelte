<script lang="ts">
  import type { MarkdownHeading } from "astro";
  import { onMount } from "svelte";

  const { headings }: { headings: MarkdownHeading[] } = $props();

  let tocModal: HTMLElement;
  let tocButton: HTMLElement;

  let isMaximised = $state(false);

  function openToc() {
    isMaximised = true;
  }

  function closeToc() {
    isMaximised = false;
  }

  onMount(() => {
    document.addEventListener("click", (event) => {
      if (!isMaximised) return;
      if (event.target == null) return;
      if (tocModal == event.target) return;
      if (tocModal.contains(event.target as Node)) return;
      if (tocButton == event.target) return;
      if (tocButton.contains(event.target as Node)) return;

      closeToc();
    });
  });
</script>

{#if headings.length > 0}
  <button
    onclick={openToc}
    bind:this={tocButton}
    class={{ maximised: isMaximised }}
    aria-label="Table of Contents"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#ffffff"
      ><path
        d="M160-280q-17 0-28.5-11.5T120-320q0-17 11.5-28.5T160-360h480q17 0 28.5 11.5T680-320q0 17-11.5 28.5T640-280H160Zm0-160q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520h480q17 0 28.5 11.5T680-480q0 17-11.5 28.5T640-440H160Zm0-160q-17 0-28.5-11.5T120-640q0-17 11.5-28.5T160-680h480q17 0 28.5 11.5T680-640q0 17-11.5 28.5T640-600H160Zm640 320q-17 0-28.5-11.5T760-320q0-17 11.5-28.5T800-360q17 0 28.5 11.5T840-320q0 17-11.5 28.5T800-280Zm0-160q-17 0-28.5-11.5T760-480q0-17 11.5-28.5T800-520q17 0 28.5 11.5T840-480q0 17-11.5 28.5T800-440Zm0-160q-17 0-28.5-11.5T760-640q0-17 11.5-28.5T800-680q17 0 28.5 11.5T840-640q0 17-11.5 28.5T800-600Z"
      /></svg
    >
  </button>
{/if}

<aside class={{ maximised: isMaximised }} bind:this={tocModal}>
  {#each headings as heading}
    <a
      href="#{heading.slug}"
      onclick={closeToc}
      style="--heading-indentation: {heading.depth - 2}"
    >
      {heading.text}
    </a>
  {/each}
</aside>

<style>
  :root {
    --transition-duration: 300ms;
    --transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
  }

  button {
    position: fixed;
    bottom: 2rem;
    left: 2rem;

    background-color: var(--primary-color);
    box-shadow: var(--shadow);
    border: none;
    border-radius: 100%;
    aspect-ratio: 1;
    width: 4rem;
    padding: 0.8rem;

    transition-duration: var(--transition-duration);
    transition-timing-function: var(--transition-timing-function);

    svg {
      width: 100%;
      height: 100%;
    }

    &.maximised {
      opacity: 0;
    }
  }

  aside {
    position: fixed;
    bottom: 2rem;
    left: 2rem;

    max-height: 70vw;

    scale: 0;
    transform-origin: 1rem calc(100% - 1rem);
    transition-duration: var(--transition-duration);
    transition-timing-function: var(--transition-timing-function);

    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem;
    overflow-y: scroll;

    background-color: var(--primary-color);
    border-radius: var(--rounded-corner-radius);
    box-shadow: var(--shadow);

    &.maximised {
      scale: 1;
    }

    &::-webkit-scrollbar {
      display: none;
    }
  }

  a {
    color: white;
    text-decoration: none;

    font-size: 1.2rem;
    text-indent: calc(var(--heading-indentation) * 2rem);
  }
</style>
