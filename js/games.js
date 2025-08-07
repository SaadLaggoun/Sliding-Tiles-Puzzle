export const boardGame = {
	init(columns) {
		this.columns = columns
		this.setRootProp('--columns', columns)
		this.gap = this.getRootProp('--gap')
		const windowWidth = window.innerWidth * 0.8
		const windowHeight = window.innerHeight - 350
		this.boardWidth = Math.min(windowHeight, windowWidth)
		this.setRootProp('--width', this.boardWidth + 'px')
		window.addEventListener('load', function () {
			this.setRootProp('--width', this.boardWidth + 'px')
		})
		this.tileSize =
			this.boardWidth / this.columns - this.gap * (1 + 1 / this.columns)
		this.emptyTileIndex = this.columns ** 2
		this.numberOfMoves = 0

		this.board = this.initBoard(this.columns)
		this.boardWrapper = this.initDOM()

		return this
	},

	initBoard(columns) {
		const board = {
			tiles: Array.from({ length: columns ** 2 - 1 }, (el, idx) => idx + 1),
			solvedTiles: {
				markSolved(elNumber) {
					if (this[elNumber] == false) {
						this.solved++
					}
					this[elNumber] = true
				},
				markUnsolved(elNumber) {
					if (this[elNumber] == true) {
						this.solved--
					}
					this[elNumber] = false
				},
				populate(tiles) {
					tiles.forEach((element, idx) => {
						if (element == idx + 1) {
							this[idx + 1] = true
							this.solved++
						} else {
							this[idx + 1] = false
						}
					})
				},
				solved: 0,
			},
		}

		board.tiles.push(Infinity)
		shuffleBoard(board.tiles)
		board.solvedTiles.populate(board.tiles)

		return board
	},

	initDOM() {
		const wrapper = document.createElement('div')
		wrapper.className = 'wrapper board-game'
		let j = 0
		for (let i = 0; i < this.columns ** 2; i++) {
			const tile = document.createElement('span')
			tile.className = 'tile'
			tile.dataset.index = i + 1
			tile.textContent = this.board.tiles[i]
			tile.style.lineHeight = this.tileSize + 'px'
			tile.style.width = this.tileSize + 'px'
			if (i && i % this.columns == 0) j++
			let k = i % this.columns
			tile.style.top = j * this.tileSize + 'px'
			tile.style.left = k * this.tileSize + 'px'
			if (k > 0)
				tile.style.marginLeft =
					k * (this.gap + this.gap / this.columns) + 'px'
			if (i >= this.columns)
				tile.style.marginTop =
					j * (this.gap + this.gap / this.columns) + 'px'
			tile.dataset.row = j
			tile.dataset.column = k
			if (this.board.tiles[i] == Infinity) {
				tile.style.background = '#fff'
				tile.textContent = ''
				tile.style.zIndex = -1
			}
			wrapper.appendChild(tile)
		}

		return wrapper
	},

	getRootProp(property) {
		const root = getComputedStyle(document.documentElement)
		return root.getPropertyValue(property)
			? parseInt(root.getPropertyValue(property).slice(0, -2))
			: null
	},

	setRootProp(property, value) {
		const root = document.documentElement
		root.style.setProperty(property, value)
		return true
	},
}

function shuffleBoard(arr) {
	const n = arr.length

	if (arr[n - 1] !== Infinity) {
		throw new Error('Last element must be Infinity')
	}

	// 1) Fisher–Yates on [0..n-2]
	for (let i = n - 2; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[arr[i], arr[j]] = [arr[j], arr[i]]
	}

	// 2) Count inversions in arr[0..n-2]
	let inv = 0
	for (let i = 0; i < n - 1; i++) {
		for (let j = i + 1; j < n - 1; j++) {
			if (arr[i] > arr[j]) inv++
		}
	}

	// 3) If parity is odd, swap two board to flip it
	if (inv % 2 === 1) {
		// swap positions 0 and 1 (both are non-blank)
		;[arr[0], arr[1]] = [arr[1], arr[0]]
	}
}
