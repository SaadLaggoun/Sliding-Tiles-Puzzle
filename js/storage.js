export const storage = {
	init() {
		console.log('Initializing storage...')
		const storageItems = ['games', 'players', 'loggedPlayer', 'leaderboard']
		for (const item of storageItems) {
			if (!localStorage.getItem(item)) {
				localStorage.setItem(item, null)
				switch (item) {
					case 'games':
						const games = {
							'3x3': { bestScore: 999999, player: null },
							'4x4': { bestScore: 999999, player: null },
							'5x5': { bestScore: 999999, player: null },
						}
						localStorage.setItem(item, JSON.stringify(games))
						break
					case 'leaderboard':
						const leaderboard = {
							'3x3': [],
							'4x4': [],
							'5x5': [],
						}
						localStorage.setItem(item, JSON.stringify(leaderboard))
						break
				}
			}
		}
	},

	getLoggedPlayer() {
		const loggedPlayer = localStorage.getItem('loggedPlayer')
		return loggedPlayer ? JSON.parse(loggedPlayer) : null
	},

	setLoggedPlayer(player) {
		localStorage.setItem('loggedPlayer', JSON.stringify(player))
		return true
	},

	isPlayerLogged() {
		return this.getLoggedPlayer() !== null
	},

	logoutPlayer() {
		localStorage.setItem('loggedPlayer', null)
		return true
	},

	getPlayers() {
		const players = localStorage.getItem('players')
		return players ? JSON.parse(players) : null
	},

	setPlayers(players) {
		localStorage.setItem('players', JSON.stringify(players))
	},

	getPlayer(username) {
		const players = this.getPlayers()
		return players
			? players.find((player) => player.username == username)
			: false
	},

	addPlayer(player) {
		const players = this.getPlayers() || []
		if (!this.findPlayer(player.username)) {
			const playerWithRecords = {
				...player,
				games: {
					'3x3': { lastScore: null, bestScore: 999999 },
					'4x4': { lastScore: null, bestScore: 999999 },
					'5x5': { lastScore: null, bestScore: 999999 },
				},
			}
			players.push(playerWithRecords)
			this.setPlayers(players)
			return true
		}
		return false
	},

	findPlayer(username) {
		const players = this.getPlayers()
		return players
			? players.find((player) => player.username === username)
			: null
	},

	updatePlayer(username, updates) {
		const players = this.getPlayers()
		if (!players) return false

		const index = players.findIndex((player) => player.username === username)
		if (index === -1) return false

		players[index] = { ...players[index], ...updates }
		this.setPlayers(players)
		return true
	},

	removePlayer(username) {
		const players = this.getPlayers()
		if (!players) return false

		const filtered = players.filter((player) => player.username !== username)
		if (filtered.length !== players.length) {
			this.setPlayers(filtered)
			return true
		}
		return false
	},

	getGames() {
		const games = localStorage.getItem('games')
		return games ? JSON.parse(games) : null
	},

	setGames(games) {
		localStorage.setItem('games', JSON.stringify(games))
	},

	getGameScore(size) {
		const games = this.getGames()
		return games ? games[`${size}x${size}`] : null
	},

	updateGameScore(size, score, playerUsername) {
		const games = this.getGames()
		if (!games) return false

		const gameKey = `${size}x${size}`
		if (!(gameKey in games)) return false

		const player = this.findPlayer(playerUsername)
		if (!player) return false

		let playerBested = false
		if (score < player.games[gameKey].bestScore) {
			playerBested = true
		}

		player.games[gameKey] = {
			lastScore: score,
			bestScore: Math.min(score, player.games[gameKey].bestScore),
		}

		this.updatePlayer(playerUsername, player)

		const currentBest = games[gameKey].bestScore
		if (score < currentBest) {
			games[gameKey] = {
				bestScore: score,
				player: playerUsername,
			}
			this.setGames(games)
		}

		this.updateLeaderboard(size, playerUsername, score)

		return playerBested
	},

	getPlayerGameStats(username) {
		const player = this.findPlayer(username)
		return player ? player.games : null
	},

	getPlayerGameScore(username, size) {
		const player = this.findPlayer(username)
		if (!player) return null

		const gameKey = `${size}x${size}`
		return player.games[gameKey]
	},

	getAllBestScores() {
		const games = this.getGames()
		if (!games) return null

		return Object.entries(games).map(([size, data]) => ({
			size,
			...data,
		}))
	},

	resetGameScores() {
		const games = {
			'3x3': { bestScore: 999999, player: null },
			'4x4': { bestScore: 999999, player: null },
			'5x5': { bestScore: 999999, player: null },
		}
		this.setGames(games)
	},

	getLeaderboard() {
		const leaderboard = localStorage.getItem('leaderboard')
		return leaderboard ? JSON.parse(leaderboard) : null
	},

	setLeaderboard(leaderboard) {
		localStorage.setItem('leaderboard', JSON.stringify(leaderboard))
	},

	findPlayerInLeaderboard(username, size) {
		const leaderboard = this.getLeaderboard()
		if (!leaderboard) return false

		const gameKey = `${size}x${size}`
		if (!(gameKey in leaderboard)) return false

		const playerIndex = leaderboard[gameKey].findIndex(
			(player) => player.username == username
		)

		return playerIndex
	},

	updateLeaderboard(size, username, score) {
		const leaderboard = this.getLeaderboard()
		if (!leaderboard) return false

		const gameKey = `${size}x${size}`
		if (!(gameKey in leaderboard)) return false

		const player = this.findPlayer(username)
		if (!player) return false

		const playerIndexLB = this.findPlayerInLeaderboard(username, size)

		const newEntry = {
			username,
			score,
			date: new Date().toISOString(),
		}

		if (playerIndexLB !== -1) {
			const existingScore = leaderboard[gameKey][playerIndexLB].score
			if (score < existingScore) {
				leaderboard[gameKey][playerIndexLB] = newEntry
			}
		} else {
			leaderboard[gameKey].push(newEntry)
		}

		leaderboard[gameKey].sort((a, b) => a.score - b.score)
		leaderboard[gameKey] = leaderboard[gameKey].slice(0, 10)

		this.setLeaderboard(leaderboard)
		return true
	},

	getLeaderboardBySize(size, sortBySize = size) {
		const leaderboard = this.getLeaderboard()
		if (!leaderboard) return null

		const gameKey = `${size}x${size}`
		const sortKey = `${sortBySize}x${sortBySize}`

		if (!(gameKey in leaderboard)) return null

		const allPlayers = new Set()
		Object.values(leaderboard).forEach((sizeScores) => {
			sizeScores.forEach((entry) => allPlayers.add(entry.username))
		})

		const playerRecords = Array.from(allPlayers).map((username) => {
			const record = { username }
			Object.entries(leaderboard).forEach(([size, scores]) => {
				const playerScore = scores.find((s) => s.username === username)
				record[size] = playerScore ? playerScore.score : Infinity
			})
			return record
		})

		return playerRecords.sort((a, b) => a[sortKey] - b[sortKey]).slice(0, 10)
	},

	clear() {
		localStorage.clear()
	},

	clearPlayerData(username) {
		this.removePlayer(username)
		this.clearGameState(username)
	},
}

// Initialize storage when module is imported
storage.init()
