<script lang="ts">
	import type { Player } from './types';
	export let players: Player[];
</script>

<div class="wrapper">
	<div class="line">Score</div>
	{#each players as player}
		<div class="row-right"><b>{player.player}</b></div>
		<div class="mid"><b>:</b></div>
		<div class="row-left"><b>{player.score}</b></div>
	{/each}
</div>

<style>
	.wrapper {
		display: flex;
		flex-wrap: wrap;
		text-align: center;
		padding: 10px;
		font-size: x-large;
	}
	.row-right {
		flex: 40%;
        padding-top: 5px;
        text-align: right;
	}
	.row-left {
		flex: 40%;
        padding-top: 5px;
        text-align: left;
	}
    .mid {
        flex: 10%;
    }
	.line {
		flex: 100%;
	}
</style>
