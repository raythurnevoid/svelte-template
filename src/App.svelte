<script lang="ts">
	export let name: string;

	const Lazy = import("./Lazy.svelte");
</script>

<main>
	<h1>Hello {name}!</h1>
	<p>
		Visit the
		<a href="https://svelte.dev/tutorial">Svelte tutorial</a>
		to learn how to build Svelte apps.
	</p>

	{#await Lazy}
		...loading
	{:then Component}
		<svelte:component this={Component.default} />
	{/await}
</main>

<style lang="scss">
	$color: #ff3e00;

	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: $color;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
