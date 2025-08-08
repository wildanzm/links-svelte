<script lang="ts">
	import { onMount } from "svelte";

	export let href: string;
	export let title: string;
	export let icon: string;
	export let iconSize: number = 32;
	export let analytics: boolean = true;

	let imageLoaded = false;
	let imageError = false;

	onMount(() => {
		// Preload image
		const img = new Image();
		img.onload = () => {
			imageLoaded = true;
		};
		img.onerror = () => {
			imageError = true;
		};
		img.src = icon;
	});

	function handleClick() {
		if (analytics && typeof (window as any).gtag !== "undefined") {
			// Google Analytics event tracking
			(window as any).gtag("event", "click", {
				event_category: "social_link",
				event_label: title,
				value: 1,
			});
		}
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			window.open(href, "_blank", "noopener,noreferrer");
			handleClick();
		}
	}
</script>

<a {href} target="_blank" rel="noopener noreferrer" class="social-link" on:click={handleClick} on:keydown={handleKeyDown} tabindex="0" aria-label="Open {title} in new tab">
	<div class="icon-wrapper">
		{#if imageLoaded && !imageError}
			<img src={icon} alt="{title} icon" class="icon" style={`width: ${iconSize}px; height: ${iconSize}px;`} />
		{:else if imageError}
			<!-- Fallback icon -->
			<svg class="icon fallback-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style={`width: ${iconSize}px; height: ${iconSize}px;`}>
				<circle cx="12" cy="12" r="10" />
				<path d="M8 14s1.5 2 4 2 4-2 4-2" />
				<line x1="9" y1="9" x2="9.01" y2="9" />
				<line x1="15" y1="9" x2="15.01" y2="9" />
			</svg>
		{:else}
			<!-- Loading state -->
			<div class="icon loading-placeholder"></div>
		{/if}
	</div>
	<div class="content">
		<h3 class="title">{title}</h3>
	</div>
	<div class="arrow">
		<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
			<path d="M7 17L17 7M17 7H7M17 7V17" />
		</svg>
	</div>
</a>

<style>
	.social-link {
		display: flex;
		align-items: center;
		padding: 1rem 1.5rem;
		margin-bottom: 1rem;
		border-radius: 16px;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		text-decoration: none;
		color: inherit;
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
		cursor: pointer;
		box-shadow:
			0 4px 16px rgba(0, 0, 0, 0.1),
			inset 0 1px 0 rgba(255, 255, 255, 0.2);
	}

	.social-link:focus {
		outline: 2px solid #3b82f6;
		outline-offset: 2px;
	}

	.social-link::before {
		content: "";
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
		transition: left 0.5s ease;
	}

	.social-link:hover::before,
	.social-link:focus::before {
		left: 100%;
	}

	.social-link:hover,
	.social-link:focus {
		transform: translateY(-2px);
		background: rgba(255, 255, 255, 0.2);
		border-color: rgba(255, 255, 255, 0.3);
		box-shadow:
			0 8px 32px rgba(0, 0, 0, 0.15),
			inset 0 1px 0 rgba(255, 255, 255, 0.3);
	}

	.icon-wrapper {
		flex-shrink: 0;
		width: 48px;
		height: 48px;
		border-radius: 12px;
		background: none;
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 1rem;
		position: relative;
	}

	.icon {
		width: 32px;
		height: 32px;
		transition: transform 0.2s ease;
		display: block;
	}

	:global(.dark) .icon {
		filter: brightness(0) invert(1) grayscale(0.1) contrast(1.2);
	}

	:global(.light) .icon {
		filter: none;
	}

	.fallback-icon {
		color: white;
		filter: none;
	}

	.loading-placeholder {
		width: 24px;
		height: 24px;
		background: rgba(255, 255, 255, 0.3);
		border-radius: 4px;
		animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}

	.social-link:hover .icon,
	.social-link:focus .icon {
		transform: scale(1.1);
	}

	.content {
		flex-grow: 1;
	}

	.title {
		font-size: 1.125rem;
		font-weight: 600;
		margin: 0 0 0.25rem 0;
		background: linear-gradient(135deg, #3b82f6, #22c55e);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		line-height: 1.3;
	}

	.arrow {
		opacity: 0;
		transform: translateX(-10px);
		transition: all 0.3s ease;
		flex-shrink: 0;
	}

	.social-link:hover .arrow,
	.social-link:focus .arrow {
		opacity: 1;
		transform: translateX(0);
	}

	/* Dark mode styles */
	:global(.dark) .social-link {
		background: rgba(0, 0, 0, 0.2);
		border-color: rgba(255, 255, 255, 0.1);
	}

	:global(.dark) .social-link:hover,
	:global(.dark) .social-link:focus {
		background: rgba(0, 0, 0, 0.3);
		border-color: rgba(255, 255, 255, 0.2);
		box-shadow:
			0 8px 32px rgba(0, 0, 0, 0.25),
			inset 0 1px 0 rgba(255, 255, 255, 0.1);
	}

	:global(.dark) .social-link:focus {
		outline-color: #22c55e;
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		.social-link,
		.icon,
		.arrow,
		.social-link::before {
			transition: none;
		}

		.loading-placeholder {
			animation: none;
		}
	}

	/* High contrast mode support */
	@media (prefers-contrast: high) {
		.social-link {
			border: 2px solid;
		}
	}
</style>
