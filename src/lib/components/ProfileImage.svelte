<script lang="ts">
	export let src: string;
	export let alt: string;
	export let size: number = 120;
</script>

<div class="profile-image" style="width: {size}px; height: {size}px;">
	<img {src} {alt} />
</div>

<style>
	.profile-image {
		border-radius: 50%;
		overflow: hidden;
		border: 4px solid transparent;
		background: linear-gradient(135deg, #3b82f6, #22c55e);
		padding: 4px;
		margin: 0 auto;
		transition: all 0.3s ease;
	}

	.profile-image:hover {
		transform: scale(1.05);
		box-shadow: 0 20px 40px rgba(59, 130, 246, 0.3);
	}

	.profile-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 50%;
		display: block;
	}

	:global(.dark) .profile-image:hover {
		box-shadow: 0 20px 40px rgba(34, 197, 94, 0.3);
	}
</style>
