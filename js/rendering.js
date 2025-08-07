import { components, app } from './components.js'

export function renderWelcomeScreen() {
	components.welcome()
}

export function renderingPickBoard() {
	components.pickBoard()
}

export function renderingBoardGame(columns) {
	components.boardGame(columns)
}

export function renderingWinnerScreen() {
	components.winnerScreen()
}

export function renderingLeaderboard() {
	components.leaderBoard()
}

export function renderingLeaderboardBySize(sortby) {
	components.leaderBoardTable(sortby)
}

export function renderProfile() {
	components.profile()
}
