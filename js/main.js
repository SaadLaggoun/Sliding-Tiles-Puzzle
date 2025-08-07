import { renderWelcomeScreen } from './rendering.js'

/**
 * Initiating application interfaces
 */
window.addEventListener('load', () => {
	globalThis.app = document.querySelector('.app')
	appStart()
	if (window.innerWidth <= 600) {
		document.querySelector('.instructions ol').classList.add('shadow-scroll')
	}
	let resizeTimer
	let adaptTileSize
	let turorialScrollShadow

	window.addEventListener('resize', () => {
		// Pause animations immediately when resize starts
		document.body.classList.add('pause-animations')

		clearTimeout(resizeTimer)
		clearTimeout(adaptTileSize)
		clearTimeout(turorialScrollShadow)

		// Resume animations after resize stops
		resizeTimer = setTimeout(() => {
			document.body.classList.remove('pause-animations')
		}, 250)

		// Change tile sizes after window resize
		adaptTileSize = setTimeout(() => {
			if (globalThis.game) {
				const game = globalThis.game
				const windowWidth = window.innerWidth * 0.8
				const windowHeight = window.innerHeight - 350

				game.boardWidth = Math.min(windowHeight, windowWidth)
				game.setRootProp('--width', game.boardWidth + 'px')
				game.tileSize =
					game.boardWidth / game.columns -
					game.gap * (1 + 1 / game.columns)

				const tiles = document.querySelectorAll('.tile')
				for (const tile of tiles) {
					let x = tile.dataset.row
					let y = tile.dataset.column
					tile.style.top = x * game.tileSize + 'px'
					tile.style.left = y * game.tileSize + 'px'
					tile.style.marginTop =
						x * (game.gap + game.gap / game.columns) + 'px'
					tile.style.marginLeft =
						y * (game.gap + game.gap / game.columns) + 'px'
					tile.style.lineHeight = game.tileSize + 'px'
					tile.style.width = game.tileSize + 'px'
				}
			}
		})

		// Add shadows to the sides to indicate scrolling
		turorialScrollShadow = setTimeout(() => {
			const instructions = document.querySelector('.instructions ol')
			if (!instructions) return

			if (window.innerWidth <= 600) {
				instructions.classList.add('shadow-scroll')
			} else {
				instructions.classList.remove('shadow-scroll')
			}
		}, 250)
	})
})

function appStart() {
	renderWelcomeScreen()
}
