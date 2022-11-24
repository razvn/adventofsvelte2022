import { CellValue, type Player } from "./types";

export class Game {
    readonly messageDraw = "It's a draw"
    gameIsPlaying: boolean;
	gameIsDraw: boolean
    private board: Cell[][]
    private winList: Cell[] = [];
    player1: Player = { player: CellValue.O, score: 0 };
	player2: Player = { player: CellValue.X, score: 0 };
    private currentPlayer: Player 

    constructor() {
        this.board = this.initBoard()
        this.gameIsDraw = false
        this.currentPlayer = this.randomPlayer(this.player1, this.player2)
        this.gameIsPlaying = true
    }


    private initBoard():Cell[][] {
		let c = [1, 2, 3];
		let newBoard: Cell[][] = [];
		for (var row of c) {
			const rowArr = []
			for (var col of c) {
				rowArr.push({ row, col });
			}
			newBoard.push(rowArr)
		}
		return newBoard;
	};

    play(row: number, col: number) {
        // console.log("playing: ", row, col)
        if (this.gameIsPlaying) {
			let currentCase = this.board[row][col]
            // console.log("\tcase ", currentCase)
			if (currentCase && !currentCase.value) {
				currentCase.value = this.currentPlayer.player
                // console.log("\tnew value:", currentCase)
			}

			this.winList = this.checkWin();
			if (this.winList.length) {
				// console.log('Winner', this.winList);
				this.gameIsPlaying = false;
				this.currentPlayer.score = this.currentPlayer.score + 1;
			} else {
				this.changePlayer()
			}
		}
    } 

	private checkWin(): Cell[] {
		let winIdx: Cell[] = [];
		//line
		winIdx = this.rowWins(0)
		if (winIdx.length) return winIdx;
		winIdx = this.rowWins(1)
		if (winIdx.length) return winIdx;
		winIdx = this.rowWins(2)
		if (winIdx.length) return winIdx;
		
		
		// column
		winIdx = this.colWins(0)
		if (winIdx.length) return winIdx;
		winIdx = this.colWins(1)
		if (winIdx.length) return winIdx;
		winIdx = this.colWins(2)
		if (winIdx.length) return winIdx;
		
		// diag
		winIdx = this.diagRowWins()
		if (winIdx.length) return winIdx;
		winIdx = this.diagColWins()
		if (winIdx.length) return winIdx;

		if (this.noMoreUnplayedCases()) {
			this.gameIsPlaying = false;
			if (!this.winList.length) {
				this.gameIsDraw = true;		
			}
		}
		return [];
	};

	private rowWins(i: number):Cell[] {
		const fst = this.board[i][0]
		if (fst?.value) {
			const snd = this.board[i][1]
			const thrd = this.board[i][2]
			if (fst.value == snd?.value && fst.value == thrd?.value) return [fst, snd, thrd]
		}
		return []
	}

	private colWins(i: number):Cell[] {
		const fst = this.board[0][i]
		if (fst?.value) {
			const snd = this.board[1][i]
			const thrd = this.board[2][i]
			if (fst.value == snd?.value && fst.value == thrd?.value) return [fst, snd, thrd]
		}
		return []
	}

	private diagRowWins() {
		const fst = this.board[0][0]
		if (fst?.value) {
			const snd = this.board[1][1]
			const thrd = this.board[2][2]
			if (fst.value == snd?.value && fst.value == thrd?.value) return [fst, snd, thrd]
		}
		return []
	}

	private diagColWins() {
		const fst = this.board[0][2]
		if (fst?.value) {
			const snd = this.board[1][1]
			const thrd = this.board[2][0]
			if (fst.value == snd.value && fst.value == thrd.value) return [fst, snd, thrd]
		}
		return []
	}

    private noMoreUnplayedCases():boolean {
        return this.board.every(line => line.every(c => c.value))
    } 

    private changePlayer() {
		if (this.currentPlayer == this.player1) this.currentPlayer = this.player2;
		else this.currentPlayer = this.player1;
	}

    private randomPlayer(first: Player, second: Player): Player {
        return Math.random() < 0.5 ? first : second;
    }

    private messagePlaying(player: Player): string {
        return `Now playing: ${player.player}`;
    } 
	private messageWinner(player: Player): string {
        return `The winner is: ${player.player}`;
    }

    cellWins(row: number, col: number): boolean {
        const cell = this.board[row][col]
        return (cell && this.winList.includes(cell))
    }
    
    cellValue(row: number, col: number): CellValue | undefined {
        const cell = this.board[row][col]
        return cell?.value
    }

    isAWinner(): boolean {
        return this.winList.length > 0
    }

    currentMessage(): string {
        if (this.gameIsPlaying) return this.messagePlaying(this.currentPlayer)
        else if (this.winList.length) return this.messageWinner(this.currentPlayer)
        else return this.messageDraw
    }
	
    restart() {
        this.board = this.initBoard()
        this.currentPlayer = this.randomPlayer(this.player1, this.player2)
        this.winList = []
        this.gameIsDraw = false
        this.gameIsPlaying = true
    }

    reset() {
        this.player1.score = 0
        this.player2.score = 0
        this.restart()
    }
}
	

export type Cell = { row: number; col: number; value?: CellValue };
	