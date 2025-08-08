<script lang="ts">
	import { onMount } from "svelte";

	export let className: string = "";

	let prefersReducedMotion = false;

	onMount(() => {
		// Check for reduced motion preference
		const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
		prefersReducedMotion = mediaQuery.matches;

		// Listen for changes in motion preference
		const handleChange = (e: MediaQueryListEvent) => {
			prefersReducedMotion = e.matches;
		};

		if (mediaQuery.addEventListener) {
			mediaQuery.addEventListener("change", handleChange);
		} else {
			// Fallback for older browsers
			mediaQuery.addListener(handleChange);
		}

		return () => {
			if (mediaQuery.removeEventListener) {
				mediaQuery.removeEventListener("change", handleChange);
			} else {
				mediaQuery.removeListener(handleChange);
			}
		};
	});
</script>

<div class="grid-hero {className}" aria-hidden="true">
	<div class="grid-pattern" class:no-animation={prefersReducedMotion}></div>
</div>

<style>
	.grid-hero {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		opacity: 0.3;
		pointer-events: none;
	}

	.grid-pattern {
		width: 100%;
		height: 100%;
		background-image: linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
		background-size: 40px 40px;
		animation: grid-move 20s linear infinite;
	}

	.grid-pattern.no-animation {
		animation: none;
	}

	@keyframes grid-move {
		0% {
			transform: translate(0, 0);
		}
		100% {
			transform: translate(40px, 40px);
		}
	}

	/* Dark mode */
	:global(.dark) .grid-pattern {
		background-image: linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px);
	}

	/* Reduce grid intensity on smaller screens */
	@media (max-width: 640px) {
		.grid-hero {
			opacity: 0.2;
		}

		.grid-pattern {
			background-size: 30px 30px;
		}
	}

	/* High contrast mode support */
	@media (prefers-contrast: high) {
		.grid-hero {
			opacity: 0.15;
		}
	}
</style>
