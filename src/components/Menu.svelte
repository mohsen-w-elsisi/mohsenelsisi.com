<script lang="ts">
    let isOpen = $state(false);

    function toggleMenu() {
        isOpen = !isOpen;
        console.log("Menu toggled");
    }
</script>

<button onclick={toggleMenu} title="toggle menu">
    <span class="bar n1 {isOpen ? 'isOpen' : ''}"></span>
    <span class="bar n2 {isOpen ? 'isOpen' : ''}"></span>
    <span class="bar n3 {isOpen ? 'isOpen' : ''}"></span>
</button>

<div class={isOpen ? "isOpen" : ""}>
    <nav>
        <a href="/">Home</a>
        <a href="/projects">Projects</a>
        <a href="/blog">Blog</a>
        <a href="/about">About</a>
        <a href="/resume">Resume</a>
    </nav>
</div>

<style>
    button {
        position: relative;
        z-index: 5;

        background-color: transparent;
        border: none;
    }

    .bar {
        display: block;
        width: 25px;
        height: 3px;
        margin: 5px auto;
        transition: all 0.3s ease-in-out;
        background-color: var(--dark-color);

        &.isOpen {
            background: var(--surface-color);

            &.n1 {
                transform: rotate(-45deg) translate(-5px, 6px);
            }
            &.n2 {
                opacity: 0;
            }
            &.n3 {
                transform: rotate(45deg) translate(-5px, -6px);
            }
        }
    }

    div {
        z-index: 4;

        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;

        background: var(--dark-color);

        opacity: 0;
        translate: 100%;
        transition: all 0.3s ease-in-out;

        &.isOpen {
            opacity: 1;
            translate: 0;
        }
    }

    nav {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: .8rem;
        height: 100%;

        font-size: 2rem;

        a {
            color: var(--surface-color);
        }
    }
</style>
