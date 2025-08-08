<script lang="ts">
	import { onMount } from "svelte";
	import { Sun, Moon } from "lucide-svelte";

	let isDark = false;
	let animating = false;

	onMount(() => {
		const saved = localStorage.getItem("theme");
		if (saved) {
			isDark = saved === "dark";
		} else {
			isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
		}
		updateTheme();
	});

	function toggleTheme() {
		isDark = !isDark;
		updateTheme();
		localStorage.setItem("theme", isDark ? "dark" : "light");
		animating = true;
		setTimeout(() => {
			animating = false;
		}, 500);
	}

	function updateTheme() {
		if (isDark) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}
</script>

<button on:click={toggleTheme} class="theme-toggle" aria-label="Toggle theme">
	<span class="toggle-icon" aria-hidden="true" class:rotating={animating}>
		{#if isDark}
			<Moon size={20} />
		{:else}
			<Sun size={20} />
		{/if}
	</span>
</button>

<style>
	.theme-toggle {
		position: fixed;
		top: 1.5rem;
		right: 1.5rem;
		z-index: 100;
		width: 48px;
		height: 48px;
		padding: 0;
		border-radius: 50%;
		border: 1px solid rgba(255, 255, 255, 0.2);
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(15px);
		-webkit-backdrop-filter: blur(15px);
		color: #1f2937;
		cursor: pointer;
		transition: all 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow:
			0 4px 16px rgba(0, 0, 0, 0.1),
			inset 0 1px 0 rgba(255, 255, 255, 0.2);
		pointer-events: auto;
	}

	.toggle-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		transition:
			color 0.4s,
			filter 0.4s;
	}

	.toggle-icon.rotating {
		animation: toggle-rotate 0.5s cubic-bezier(0.4, 0, 0.6, 1);
	}

	.theme-toggle:hover .toggle-icon {
		color: #facc15;
		filter: drop-shadow(0 0 8px #facc15);
	}

	@keyframes toggle-rotate {
		0% {
			transform: rotate(0deg);
		}
		40% {
			transform: rotate(180deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.theme-toggle:hover {
		background: rgba(255, 255, 255, 0.2);
		border-color: rgba(255, 255, 255, 0.3);
		transform: scale(1.05);
		box-shadow:
			0 6px 20px rgba(0, 0, 0, 0.15),
			inset 0 1px 0 rgba(255, 255, 255, 0.3);
	}

	.theme-toggle:focus {
		outline: 2px solid rgba(255, 255, 255, 0.5);
		outline-offset: 2px;
	}

	:global(.dark) .theme-toggle {
		color: #f1f5f9;
		background: rgba(0, 0, 0, 0.2);
		border-color: rgba(255, 255, 255, 0.1);
	}

	:global(.dark) .theme-toggle:hover {
		background: rgba(0, 0, 0, 0.3);
		border-color: rgba(255, 255, 255, 0.2);
	}

	:global(.dark) .theme-toggle:focus {
		outline-color: rgba(255, 255, 255, 0.3);
	}

	/* Mobile responsiveness */
	@media (max-width: 640px) {
		.theme-toggle {
			top: 1rem;
			right: 1rem;
			width: 44px;
			height: 44px;
		}
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		.theme-toggle {
			transition: none;
		}
	}
</style>
