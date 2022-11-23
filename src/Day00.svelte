<script lang="ts">
  import Buttons from './lib/day00/Buttons.svelte'
	import Case from './lib/day00/Case.svelte';
	import Score from './lib/day00/Score.svelte';
	import { CellStyle, type Cell } from './lib/day00/types'
	import { Game } from './lib/day00/Game';

	let game = new Game()

	const updateGame = () => {
		game = game
	}
	const handlePlay = async (row: number, col: number, event: CustomEvent) => {
		game.play(row, col)
		updateGame()
	};

	const restart = () => {
		game.restart()
		updateGame()
	};

	const reset = () => {
		game.reset()
		updateGame()
	};

	$: currentCell = (row: number, col: number): Cell => {
		let style: CellStyle 
		
		if (game.cellWins(row, col)) style = CellStyle.WIN
		else if (game.gameIsDraw || !game.gameIsPlaying) style = CellStyle.DISABLED
		else style = CellStyle.NORMAL
		const value = game.cellValue(row, col)

		// console.log("Cell", row, col, value, style)

		return {
			value,
			style
		}
	}

	$: message = (): string => {
		return game.currentMessage()
	}
</script>

<div class="wrapper">
	<div class="title">
		<h3><a href="https://adventofvue.com">Advent of <span style="text-decoration:line-through">Vue</span></a> Svelte 2022 - Day 0</h3>
	</div>
	<div class="score"><Score players={[game.player1, game.player2]} /></div>
	<div class="game">
		{#each [0, 1, 2] as row}
			<div class="line">
				{#each [0, 1, 2] as col}
					<Case
						borders = {{ right: true, bottom: true}}
						infos={currentCell(row, col)}
						on:play={(event) => handlePlay(row, col, event)}
					/>
				{/each}
			</div>
		{/each}
	</div>
	<div class="buttons">
		<Buttons on:reset={reset} on:restart={restart} />
	</div>

	<div class="status">
		{message()}
	</div>
	
	<div class="status">
		<hr>
		<a href="/">index</a>
	</div>
</div>

<style>
	.wrapper {
		display: flex;
		flex-wrap: wrap;
		text-align: center;
	}
	.title {
		flex: 100%;
		font-size: x-large;
	}
	.score {
		flex: auto;
		justify-content: center;
	}
	.game {
		flex: none;
	}
	.buttons {
		flex: auto;
		justify-content: center;
	}

	.status {
		flex: 100%;
		font-size: x-large;
		padding-top: 10px;
	}
	.line {
		width: 100%;
		margin: auto;
		text-align: center;
		display: flex;
		justify-content: center;
		font-size: x-large;
	}
</style>
