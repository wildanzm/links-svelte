<script lang="ts">
	export let size: "sm" | "md" | "lg" = "md";
	export let color: "primary" | "success" | "white" = "primary";

	const sizeClasses = {
		sm: "w-4 h-4",
		md: "w-8 h-8",
		lg: "w-12 h-12",
	};

	const colorClasses = {
		primary: "border-primary-500",
		success: "border-success-500",
		white: "border-white",
	};
</script>

<div class="loading-spinner {sizeClasses[size]} {colorClasses[color]}" role="status" aria-label="Loading">
	<span class="sr-only">Loading...</span>
</div>

<style>
	.loading-spinner {
		border: 2px solid transparent;
		border-top: 2px solid currentColor;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
</style>
