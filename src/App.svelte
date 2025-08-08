<script lang="ts">
	import { onMount } from "svelte";
	import ThemeToggle from "./lib/components/ThemeToggle.svelte";
	import ProfileImage from "./lib/components/ProfileImage.svelte";
	import SocialLink from "./lib/components/SocialLink.svelte";
	import { PROFILE_DATA, SOCIAL_LINKS } from "./lib/data/profile";

	let mounted = false;
	let currentUrl = "";
	let ipAddress: string | null = null;

	onMount(async () => {
		mounted = true;
		currentUrl = window.location.href;
		try {
			const res = await fetch("https://api.ipify.org?format=json");
			const data = await res.json();
			ipAddress = data.ip;
		} catch (e) {
			ipAddress = null;
		}
	});
</script>

<svelte:head>
	<title>{PROFILE_DATA.name} - Linktree</title>
	<meta name="description" content="{PROFILE_DATA.name} - {PROFILE_DATA.role}" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="{PROFILE_DATA.name} - Linktree" />
	<meta property="og:description" content="{PROFILE_DATA.name} - {PROFILE_DATA.role}" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:title" content="{PROFILE_DATA.name} - Linktree" />
	<meta property="twitter:description" content="{PROFILE_DATA.name} - {PROFILE_DATA.role}" />

	<!-- Fonts -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
</svelte:head>

<ThemeToggle />

<main class="main-wrapper">
	{#if mounted}
		<div class="content-container">
			<!-- Profile Section -->
			<div class="profile-section fade-in-up stagger-1">
				<ProfileImage src={PROFILE_DATA.profileImage} alt="{PROFILE_DATA.name} profile picture" size={120} />
			</div>

			<!-- Name and Role -->
			<div class="text-center fade-in-up stagger-2">
				<h1 class="name">{PROFILE_DATA.name}</h1>
				<p class="role">{PROFILE_DATA.role}</p>
			</div>

			<!-- Social Links -->
			<div class="links-section fade-in-up stagger-4">
				{#each SOCIAL_LINKS as link, index}
					<div class="fade-in-up stagger-{5 + index}">
						<SocialLink href={link.href} title={link.title} icon={link.icon} iconSize={link.iconSize ?? 32} />
					</div>
				{/each}
			</div>

			<!-- Footer -->
			<footer class="footer fade-in-up stagger-9">
				{#if ipAddress}
					<p>Your IP Address: <strong>{ipAddress}</strong></p>
				{:else}
					<p>Fetching IP address...</p>
				{/if}
			</footer>
		</div>
	{/if}
</main>

<style>
	.main-wrapper {
		min-height: 100vh;
		display: grid;
		place-items: center;
		padding: 2rem 1rem;
		position: relative;
		overflow-x: hidden;

		/* Background gradients with glassmorphism effect for dark mode */
		background: linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(34, 197, 94, 0.1) 25%, rgba(59, 130, 246, 0.1) 50%, rgba(168, 85, 247, 0.1) 75%, rgba(236, 72, 153, 0.1) 100%);

		&::before {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(34, 197, 94, 0.08) 25%, rgba(59, 130, 246, 0.08) 50%, rgba(168, 85, 247, 0.08) 75%, rgba(236, 72, 153, 0.08) 100%);
			backdrop-filter: blur(20px);
			-webkit-backdrop-filter: blur(20px);
			z-index: -2;
		}

		&::after {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: radial-gradient(circle at 20% 80%, rgba(6, 182, 212, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.15) 0%, transparent 50%),
				radial-gradient(circle at 40% 40%, rgba(168, 85, 247, 0.1) 0%, transparent 50%);
			animation: gradient-flow 20s ease-in-out infinite;
			z-index: -1;
		}
	}

	/* Light mode background */
	:global(.light) .main-wrapper {
		background: #ffffff;

		&::before {
			background: #ffffff;
			backdrop-filter: none;
			-webkit-backdrop-filter: none;
		}

		&::after {
			background: none;
		}
	}

	.main-wrapper {
		min-height: 100vh;
		width: 100vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 2rem 1rem;
		position: relative;
		overflow-x: hidden;

		/* Default background for dark mode */
		background: linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(34, 197, 94, 0.1) 25%, rgba(59, 130, 246, 0.1) 50%, rgba(168, 85, 247, 0.1) 75%, rgba(236, 72, 153, 0.1) 100%);

		&::before {
			content: "";
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(34, 197, 94, 0.08) 25%, rgba(59, 130, 246, 0.08) 50%, rgba(168, 85, 247, 0.08) 75%, rgba(236, 72, 153, 0.08) 100%);
			backdrop-filter: blur(20px);
			-webkit-backdrop-filter: blur(20px);
			z-index: -2;
		}

		&::after {
			content: "";
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: radial-gradient(circle at 20% 80%, rgba(6, 182, 212, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.15) 0%, transparent 50%),
				radial-gradient(circle at 40% 40%, rgba(168, 85, 247, 0.1) 0%, transparent 50%);
			animation: gradient-flow 20s ease-in-out infinite;
			z-index: -1;
		}
	}

	/* Light mode background */
	:global(.light) .main-wrapper {
		background: linear-gradient(135deg, #ffffff 0%, #f8fafc 15%, #f1f5f9 30%, #e2e8f0 45%, #f1f5f9 60%, #f8fafc 75%, #ffffff 100%) !important;

		&::before {
			background: linear-gradient(135deg, rgba(59, 130, 246, 0.03) 0%, rgba(34, 197, 94, 0.02) 25%, rgba(168, 85, 247, 0.02) 50%, rgba(236, 72, 153, 0.03) 75%, rgba(59, 130, 246, 0.02) 100%) !important;
			backdrop-filter: blur(10px) !important;
			-webkit-backdrop-filter: blur(10px) !important;
		}

		&::after {
			background: radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.04) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.04) 0%, transparent 50%),
				radial-gradient(circle at 40% 40%, rgba(168, 85, 247, 0.03) 0%, transparent 50%) !important;
		}
	}

	.content-container {
		max-width: 600px;
		width: 100%;
		position: relative;
		z-index: 1;
	}

	.profile-section {
		margin-bottom: 1.5rem;
		opacity: 0;
	}

	.name {
		font-size: 2rem;
		font-weight: 700;
		margin: 1.5rem 0 0.5rem 0;
		background: linear-gradient(135deg, #3b82f6, #22c55e);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		line-height: 1.2;
	}

	.role {
		font-size: 0.95rem;
		font-weight: 500;
		margin: 0 0 1.5rem 0;
		opacity: 0.8;
		color: #374151;
		white-space: normal;
		line-height: 1.4;
		word-wrap: break-word;
		text-align: center;
	}

	.links-section {
		margin-bottom: 1.5rem;
		opacity: 0;
		width: 100%;
	}

	.footer {
		opacity: 0;
		margin-top: 1rem;
	}

	.footer p {
		font-size: 0.875rem;
		opacity: 0.7;
		margin: 0 0 0.5rem 0;
		color: inherit;
	}

	/* Dark mode styles */
	:global(.dark) .role {
		color: #cbd5e1;
	}

	/* Light mode text styles */
	:global(.light) .name {
		background: linear-gradient(135deg, #1e40af, #059669);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	:global(.light) .role {
		color: #374151;
		font-weight: 600;
	}

	:global(.light) .footer p {
		color: #6b7280;
	}

	:global(.light) .share-button {
		background: rgba(255, 255, 255, 0.8);
		border-color: rgba(156, 163, 175, 0.3);
		color: #374151;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	:global(.light) .share-button:hover {
		background: rgba(255, 255, 255, 0.9);
		border-color: rgba(156, 163, 175, 0.5);
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}

	:global(.light) .share-button:focus {
		outline-color: rgba(59, 130, 246, 0.5);
	}

	:global(.dark) .share-button {
		background: rgba(0, 0, 0, 0.2);
		border-color: rgba(255, 255, 255, 0.2);
		color: #f1f5f9;
	}

	:global(.dark) .share-button:hover {
		background: rgba(0, 0, 0, 0.3);
		border-color: rgba(255, 255, 255, 0.3);
	}

	:global(.dark) .share-button:focus {
		outline-color: rgba(255, 255, 255, 0.5);
	}

	:global(.dark) .footer p {
		color: #94a3b8;
	}

	/* Mobile responsiveness */
	@media (max-width: 640px) {
		.main-wrapper {
			padding: 1rem 0.25rem;
			max-width: none;
		}

		.content-container {
			max-width: 100%;
			padding: 0;
		}

		.profile-section {
			margin-bottom: 1rem;
		}

		.name {
			font-size: 1.75rem;
		}

		.role {
			font-size: 0.9rem;
			margin-bottom: 1rem;
			white-space: normal;
			line-height: 1.3;
			overflow: visible;
			text-overflow: unset;
			padding: 0 0.5rem;
		}

		.share-section {
			margin-bottom: 1rem;
		}

		.links-section {
			margin-bottom: 1rem;
		}
	}

	/* Extra small mobile responsiveness */
	@media (max-width: 375px) {
		.content-container {
			max-width: 100%;
			padding: 0;
		}

		.role {
			font-size: 0.8rem;
			line-height: 1.3;
			white-space: normal;
			overflow: visible;
			text-overflow: unset;
			padding: 0 0.25rem;
		}
	}

	/* Very small mobile (iPhone SE, etc) */
	@media (max-width: 320px) {
		.content-container {
			padding: 0;
		}

		.role {
			font-size: 0.75rem;
			padding: 0 0.1rem;
			line-height: 1.2;
		}
	}

	/* Tablet responsiveness */
	@media (min-width: 768px) {
		.content-container {
			max-width: 700px;
			padding: 0 2.5rem;
		}

		.name {
			font-size: 2.25rem;
		}

		.role {
			white-space: normal;
			overflow: visible;
			text-overflow: unset;
			font-size: 1rem;
			line-height: 1.3;
		}
	}

	/* Large desktop responsiveness */
	@media (min-width: 1024px) {
		.content-container {
			max-width: 800px;
		}

		.role {
			font-size: 1rem;
		}
	}

	/* Initial state for animations */
	.fade-in-up {
		opacity: 0;
	}

	/* Gradient animation */
	@keyframes gradient-flow {
		0%,
		100% {
			opacity: 1;
			transform: scale(1) rotate(0deg);
		}
		33% {
			opacity: 0.8;
			transform: scale(1.05) rotate(1deg);
		}
		66% {
			opacity: 0.9;
			transform: scale(0.98) rotate(-1deg);
		}
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		.share-button {
			transition: none;
		}

		.main-wrapper::before,
		.main-wrapper::after {
			backdrop-filter: none;
			-webkit-backdrop-filter: none;
			animation: none;
		}
	}
</style>
