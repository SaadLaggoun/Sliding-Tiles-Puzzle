import { components } from './components.js'
import { hashStringSHA256 } from './utils.js'
import { storage } from './storage.js'
import {
	renderingPickBoard,
	renderingBoardGame,
	renderWelcomeScreen,
	renderingWinnerScreen,
	renderingLeaderboard,
	renderingLeaderboardBySize,
	renderProfile,
} from './rendering.js'

export const navigation = {
	run() {
		for (const key in navigation) {
			if (
				navigation.hasOwnProperty(key) &&
				typeof navigation[key] === 'object' &&
				typeof navigation[key].listener === 'function'
			) {
				navigation[key].listener.call(navigation[key])
			}
		}
	},
	welcome: {
		class: 'welcome-screen',
		component: 'welcome',
	},
	showHome: {
		class: 'show-home',
		el() {
			return document.querySelectorAll(`.${this.class}`)
		},
		events: [{ trigger: 'click', from: null }],
		handler: function () {
			renderWelcomeScreen()
		},
		listener() {
			bindEvents.call(this)
		},
		removeListener,
	},
	signup: {
		class: 'signup-button',
		componenet: 'signup-screen',
		boundHandlers: [],
		el() {
			return document.querySelectorAll(`.${this.class}`)
		},
		events: [{ trigger: 'click', from: null }],
		handler: function (event) {
			event.preventDefault()
			components.signup()
		},
		listener() {
			bindEvents.call(this)
		},
		removeListener,
	},
	signupForm: {
		class: 'signup-form',
		boundHandlers: [],
		el() {
			return document.querySelectorAll(`.${this.class}`)
		},
		events: [{ trigger: 'submit', from: null, handler: 'handleSubmit' }],
		handleSubmit: async function (event) {
			event.preventDefault()
			const formData = new FormData(event.target)
			const username = formData.get('username')
			const password = formData.get('password')
			const hashedPassword = /*await*/ hashStringSHA256(password)

			const player = {
				username: username,
				password: hashedPassword,
			}

			if (storage.addPlayer(player)) {
				storage.setLoggedPlayer(player)
				this.removeListener()
				renderWelcomeScreen()
				renderingPickBoard()
			} else {
				const playerInStorage = storage.getPlayer(player.username)
				if (player.password == playerInStorage.password) {
					storage.setLoggedPlayer(player)
					this.removeListener()
					renderWelcomeScreen()
					renderingPickBoard()
				} else {
					formData.set('password', '')
					window.alert('Wrong password, please try again')
				}
			}
		},
		listener() {
			bindEvents.call(this)
		},
		removeListener,
	},
	continuePlayer: {
		class: 'continue-player',
		boundHandlers: [],
		el() {
			return document.querySelectorAll(`.${this.class}`)
		},
		events: [{ trigger: 'click', from: null, handler: 'handleContinue' }],
		handleContinue: function (event) {
			renderingPickBoard()
			this.removeListener()
		},
		listener() {
			bindEvents.call(this)
		},
		removeListener,
	},
	pickUpScreen: {
		class: 'pickup-screen',
		boundHandlers: [],
		el() {
			return document.querySelectorAll(`.${this.class}`)
		},
		events: [{ trigger: 'click', from: null, handler: 'handlePick' }],
		handlePick: function (event) {
			const size = event.target.dataset.size
			if (size) {
				// render
			}
		},
		listener() {
			bindEvents.call(this)
		},
		removeListener,
	},
	pickBoardSize: {
		class: 'board-size-item',
		boundHandlers: [],
		el() {
			return document.querySelectorAll(`.${this.class}`)
		},
		events: [{ trigger: 'click', from: null, handler: 'handlePick' }],
		handlePick: function (event) {
			const size = event.target.dataset.size
			if (size) {
				const columns = parseInt(size)
				renderingBoardGame(columns)
				this.removeListener()
			}
		},
		listener() {
			bindEvents.call(this)
		},
		removeListener,
	},
	closeDialog: {
		class: 'dialog',
		boundHandlers: [],
		el() {
			return document.querySelectorAll(`.${this.class}`)
		},
		events: [{ trigger: 'click', from: window }],
		handler: function (event) {
			const dialogs = this.el()
			if (!dialogs || !dialogs.length) return

			dialogs.forEach((dialog) => {
				if (
					dialog &&
					!dialog.contains(event.target) &&
					event.target.tagName != 'BUTTON' &&
					!event.target.closest('button')
				) {
					dialog.remove()
				}
			})

			// If all dialogs are removed, remove the listener
			if (!document.querySelector(`.${this.class}`)) {
				this.removeListener()
			}
		},
		listener() {
			bindEvents.call(this)
		},
		removeListener,
	},
	board: {
		class: 'board-game',
		boundHandlers: [],
		touchStartX: 0,
		touchStartY: 0,
		mouseStartX: 0,
		mouseStartY: 0,
		isMouseDown: false,
		el() {
			return document.querySelectorAll(`.${this.class}`)
		},
		events: [
			{ trigger: 'keyup', from: window },
			{ trigger: 'touchstart', from: window, handler: 'handleTouchStart' },
			{ trigger: 'touchend', from: window, handler: 'handleTouchEnd' },
			{ trigger: 'mousedown', from: window, handler: 'handleMouseDown' },
			{ trigger: 'mouseup', from: window, handler: 'handleMouseUp' },
		],
		handler: function (event) {
			if (
				this.el() &&
				this.el().length &&
				!event.target.closest('.board-game') &&
				globalThis.game.board.solvedTiles.solved <
					globalThis.game.columns ** 2 - 1
			) {
				moveTile(event)
				if (
					globalThis.game.board.solvedTiles.solved ==
					globalThis.game.columns ** 2 - 1
				) {
					this.removeListener()
					setTimeout(() => {
						renderingWinnerScreen()
						this.removeListener()
					}, 250)
				}
			} else {
				this.removeListener()
			}
		},
		handleTouchStart: function (event) {
			if (
				this.el() &&
				this.el().length &&
				event.target.closest('.board-game') &&
				globalThis.game.board.solvedTiles.solved <
					globalThis.game.columns ** 2 - 1
			) {
				const boardElement = event.target.closest('.board-game')
				if (boardElement) {
					this.touchStartX = event.touches[0].clientX
					this.touchStartY = event.touches[0].clientY
				}
			}
		},
		handleMouseDown: function (event) {
			if (
				this.el() &&
				this.el().length &&
				event.target.closest('.board-game') &&
				globalThis.game.board.solvedTiles.solved <
					globalThis.game.columns ** 2 - 1
			) {
				const boardElement = event.target.closest('.board-game')
				if (boardElement) {
					this.mouseStartX = event.clientX
					this.mouseStartY = event.clientY
					this.isMouseDown = true
					event.preventDefault()
				}
			}
		},
		handleMouseUp: function (event) {
			if (!event.target.closest('.board-game')) return
			if (!this.el().length || !this.isMouseDown) return
			if (
				globalThis.game.board.solvedTiles ==
				globalThis.game.columns ** 2 - 1
			)
				return

			const mouseEndX = event.clientX
			const mouseEndY = event.clientY
			const deltaX = mouseEndX - this.mouseStartX
			const deltaY = mouseEndY - this.mouseStartY
			const minSwipeDistance = 50

			this.isMouseDown = false

			if (Math.abs(deltaX) > Math.abs(deltaY)) {
				// Horizontal swipe
				if (Math.abs(deltaX) > minSwipeDistance) {
					const syntheticEvent = {
						key: deltaX > 0 ? 'ArrowRight' : 'ArrowLeft',
					}
					moveTile(syntheticEvent)
					if (
						globalThis.game.board.solvedTiles.solved ==
						globalThis.game.columns ** 2 - 1
					) {
						this.removeListener()

						setTimeout(() => {
							renderingWinnerScreen()
							this.removeListener()
						}, 250)
					}
				}
			} else {
				// Vertical swipe
				if (Math.abs(deltaY) > minSwipeDistance) {
					const syntheticEvent = {
						key: deltaY > 0 ? 'ArrowDown' : 'ArrowUp',
					}
					moveTile(syntheticEvent)
					if (
						globalThis.game.board.solvedTiles.solved ==
						globalThis.game.columns ** 2 - 1
					) {
						this.removeListener()
						setTimeout(() => {
							renderingWinnerScreen()
							this.removeListener()
						}, 250)
					}
				}
			}
		},
		handleTouchEnd: function (event) {
			if (!event.target.closest('.board-game')) return
			if (!this.el().length) return
			if (
				globalThis.game.board.solvedTiles ==
				globalThis.game.columns ** 2 - 1
			)
				return

			const touchEndX = event.changedTouches[0].clientX
			const touchEndY = event.changedTouches[0].clientY
			const deltaX = touchEndX - this.touchStartX
			const deltaY = touchEndY - this.touchStartY
			const minSwipeDistance = 50

			if (Math.abs(deltaX) > Math.abs(deltaY)) {
				// Horizontal swipe
				if (Math.abs(deltaX) > minSwipeDistance) {
					const syntheticEvent = {
						key: deltaX > 0 ? 'ArrowRight' : 'ArrowLeft',
					}
					moveTile(syntheticEvent)
					if (
						globalThis.game.board.solvedTiles.solved ==
						globalThis.game.columns ** 2 - 1
					) {
						this.removeListener()
						setTimeout(() => {
							renderingWinnerScreen()
							this.removeListener()
						}, 250)
					}
				}
			} else {
				// Vertical swipe
				if (Math.abs(deltaY) > minSwipeDistance) {
					const syntheticEvent = {
						key: deltaY > 0 ? 'ArrowDown' : 'ArrowUp',
					}
					moveTile(syntheticEvent)
					if (
						globalThis.game.board.solvedTiles.solved ==
						globalThis.game.columns ** 2 - 1
					) {
						this.removeListener()
						setTimeout(() => {
							renderingWinnerScreen()
							this.removeListener()
						}, 250)
					}
				}
			}
		},
		listener() {
			bindEvents.call(this)
		},
		removeListener,
	},
	restartGame: {
		class: 'restart-game',
		boundHandlers: [],
		el() {
			return document.querySelectorAll(`.${this.class}`)
		},
		events: [{ trigger: 'click', from: null }],
		handler: function (event) {
			this.removeListener()
			renderingPickBoard()
		},
		listener() {
			bindEvents.call(this)
		},
		removeListener,
	},
	logout: {
		class: 'logout',
		boundHandlers: [],
		el() {
			return document.querySelectorAll(`.${this.class}`)
		},
		events: [{ trigger: 'click', from: null }],
		handler: function (event) {
			storage.logoutPlayer()
			const dialog = document.querySelector('.dialog')
			if (dialog) dialog.remove()
			this.removeListener()
			renderWelcomeScreen()
		},
		listener() {
			bindEvents.call(this)
		},
		removeListener,
	},
	showLeaderBoard: {
		class: 'show-leaderboard',
		boundHandlers: [],
		el() {
			return document.querySelectorAll(`.${this.class}`)
		},
		events: [{ trigger: 'click', from: null, handler: 'handleLeaderboard' }],
		handleLeaderboard: function (event) {
			renderingLeaderboard()
		},
		listener() {
			bindEvents.call(this)
		},
		removeListener,
	},
	leaderboardSortBy: {
		class: 'leaderboard-sortby',
		boundHandlers: [],
		el() {
			return document.querySelectorAll(`.${this.class}`)
		},
		events: [
			{ trigger: 'click', from: null, handler: 'handleLeaderboardSortby' },
		],
		handleLeaderboardSortby: function (event) {
			let target = event.target
			if (target.tagName !== 'BUTTON') target = target.closest('button')

			const size = target.dataset.size
			const sortby = `${size}x${size}`
			renderingLeaderboardBySize(sortby)
		},
		listener() {
			bindEvents.call(this)
		},
		removeListener,
	},
	profile: {
		class: 'show-profile',
		boundHandlers: [],
		el() {
			return document.querySelectorAll(`.${this.class}`)
		},
		events: [{ trigger: 'click', from: null }],
		handler: function (event) {
			renderProfile()
		},
		listener() {
			bindEvents.call(this)
		},
		removeListener,
	},
}

/*
 * Helper functions
 */

function moveTile(event) {
	const emptyTile = document.querySelector(
		`[data-index="${globalThis.game.emptyTileIndex}"]`
	)
	switch (event.key) {
		case 'ArrowUp':
			if (emptyTile.dataset.row < globalThis.game.columns - 1) {
				moveTileHelper(1, 0)
			}
			break
		case 'ArrowDown':
			if (emptyTile.dataset.row != 0) {
				moveTileHelper(-1, 0)
			}
			break
		case 'ArrowLeft':
			if (emptyTile.dataset.column < globalThis.game.columns - 1) {
				moveTileHelper(0, 1)
			}
			break
		case 'ArrowRight':
			if (emptyTile.dataset.column != 0) {
				moveTileHelper(0, -1)
			}
			break
	}
}

function moveTileHelper(rowTo, columnTo) {
	const accepted = [-1, 0, 1]
	if (!accepted.includes(rowTo) && !accepted.includes(columnTo))
		throw 'Invalid tile move.'

	const emptyTile = document.querySelector(
		`[data-index="${globalThis.game.emptyTileIndex}"]`
	)
	const rowFrom = parseInt(emptyTile.dataset.row) + rowTo
	const columnFrom = parseInt(emptyTile.dataset.column) + columnTo
	const tile = document.querySelector(
		`[data-row="${rowFrom}"][data-column="${columnFrom}"]`
	)
	const indexFrom = tile.dataset.index
	const indexTo = emptyTile.dataset.index
	;[
		globalThis.game.board.tiles[indexFrom],
		globalThis.game.board.tiles[indexTo],
	] = [
		globalThis.game.board.tiles[indexTo],
		globalThis.game.board.tiles[indexFrom],
	]

	tile.dataset.index = indexTo
	tile.dataset.row = emptyTile.dataset.row
	tile.dataset.column = emptyTile.dataset.column
	emptyTile.dataset.index = globalThis.game.emptyTileIndex = indexFrom
	emptyTile.dataset.row = rowFrom
	emptyTile.dataset.column = columnFrom

	for (const swap of [emptyTile, tile]) {
		const yTo = swap.dataset.row * globalThis.game.tileSize
		const xTo = swap.dataset.column * globalThis.game.tileSize
		swap.style.top = yTo + 'px'
		swap.style.left = xTo + 'px'
		swap.style.marginLeft =
			swap.dataset.column *
				(globalThis.game.gap +
					globalThis.game.gap / globalThis.game.columns) +
			'px'
		swap.style.marginTop =
			swap.dataset.row *
				(globalThis.game.gap +
					globalThis.game.gap / globalThis.game.columns) +
			'px'
	}

	const movesCount = document.querySelector('.moves-count')
	if (movesCount) {
		movesCount.textContent = ++globalThis.game.numberOfMoves
	}
	if (tile.dataset.index == tile.textContent) {
		globalThis.game.board.solvedTiles.markSolved(tile.textContent)
	} else {
		globalThis.game.board.solvedTiles.markUnsolved(tile.textContent)
	}
}

function bindEvents() {
	this.removeListener()

	if (!this.boundHandlers) {
		this.boundHandlers = []
	}

	const elements = this.el()

	this.events.forEach((eventConfig) => {
		const handlerName = eventConfig.handler || 'handler'
		const handler = this[handlerName]

		if (!handler) {
			console.warn(`Handler ${handlerName} not found for ${this.class}`)
			return
		}

		const boundHandler = (...args) => {
			handler.apply(this, args)
		}

		if (eventConfig.from === window) {
			window.addEventListener(eventConfig.trigger, boundHandler)
			this.boundHandlers.push({
				target: window,
				event: eventConfig.trigger,
				handler: boundHandler,
			})
		} else {
			if (elements && elements.length) {
				elements.forEach((element) => {
					if (element.dataset.events === 'true') return

					element.addEventListener(eventConfig.trigger, boundHandler)
					this.boundHandlers.push({
						target: element,
						event: eventConfig.trigger,
						handler: boundHandler,
					})
				})

				elements.forEach((el) => (el.dataset.events = 'true'))
			}
		}
	})
}

function removeListener() {
	if (!this.boundHandlers) return

	// Remove all stored event listeners
	this.boundHandlers.forEach(({ target, event, handler }) => {
		try {
			target.removeEventListener(event, handler)
		} catch (error) {
			console.warn('Error removing event listener:', error)
		}
	})

	this.boundHandlers = []

	// Reset the events flag on elements
	const elements = this.el()
	if (elements && elements.length) {
		elements.forEach((element) => {
			if (element.dataset) {
				delete element.dataset.events
			}
		})
	}
}
