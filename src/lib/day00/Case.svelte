<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { CellStyle } from './types';
	import type { Borders, Cell } from './types';

	export let borders: Borders;
	export let infos: Cell;

	const bordersStyles = (): string => {
		const left = `${borders?.left ? 'border-left: 1px solid;' : ''}`;
		const right = `${borders?.right ? 'border-right: 1px solid;' : ''}`;
		const top = `${borders?.top ? 'border-top: 1px solid;' : ''}`;
		const bottom = `${borders?.bottom ? 'border-bottom: 1px solid;' : ''}`;

		return `${left}${right}${top}${bottom}`;
	};

	const dispatch = createEventDispatcher();

	const play = () => {
		if (!infos.value) {
			dispatch('play');
		}
	};
	const isDisabled = (c: Cell) => c.value != null || c.style == CellStyle.DISABLED;
	const isWin = (c: Cell) => c.style == CellStyle.WIN;
</script>

<button
	disabled={isDisabled(infos)}
	class:wins={isWin(infos)}
	style={bordersStyles()}
	on:click={play}
	on:keyup={play}
>
	<span>
		{#if infos.value}
			{infos.value}
		{/if}
	</span>
</button>

<style>
	.wins {
		background-color: rgba(0, 128, 0, 0.504) !important;
	}
	button {
		width: 100px;
		height: 100px;
		line-height: 100px;
		text-align: center;
		background-color: rgba(222, 184, 135, 0.137);
		margin: 2px;
	}
	button:disabled,
	button[disabled] {
		color: #000;
        background-color: rgba(118, 118, 118, 0.343);
		cursor: not-allowed;
	}
	span {
		display: inline-block;
		vertical-align: middle;
		line-height: normal;
		font-family: Arial, Helvetica, sans-serif;
		font-size: 5vmax;
	}
</style>
