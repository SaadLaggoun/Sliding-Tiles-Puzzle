import { navigation } from './navigation.js'
import { storage } from './storage.js'
import { boardGame } from './games.js'

export const app = document.querySelector('.app')

export const components = {
	welcome() {
		let cssClass = 'welcome-screen'

		let markup = `
		<div class="${cssClass} container">
			<h1 class="text-center">Welcome to the board!</h2>
			<p>Come and play the puzzle of sliding tiles and compete with your friends and family.</p>
			<h2>Game instructions</h2>
			<div class="instructions">
				<ol>
					<li>
						<p>The tiles will start unsotred</p>
						<div class="board-example">
							<span>4</span>
							<span>6</span>
							<span>3</span>
							<span>2</span>
							<span>1</span>
							<span>5</span>
							<span>8</span>
							<span>7</span>
							<span class="empty-tile"></span>
						</div>
					</li>
					<li>
						<p>Move the tiles towards their correct positions</p>
						<p>Use gestures or your arrow keys to navigate 
							<span class="key">&lt;</span>
							<span class="key">&gt;</span>
							<span class="key"><span class="turn-up">&lt;</span></span>
							<span class="key"><span class="turn-down">&lt;</span></span></p>
						<div class="board-example">
							<span>4</span>
							<span>6</span>
							<span>3</span>
							<span>2</span>
							<span>1</span>
							<span>5</span>
							<span>8</span>
							<span class="animate">7</span>
							<span class="empty-tile"></span>
						</div>
					</li>
					<li>
						<p>Celebrate your win with your friends</p>
						<div class="board-example">
							<span class="sparkles">
								<svg viewBox="0 0 140 140" width="140" height="140" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img">
									<path fill="#FFCC4D" d="M70 10l13.292 43.564 35.596 13.176-35.584 13.172-13.296 44.892-13.296-44.892-35.58-13.172 35.6-13.176L70 10z"/>
								</svg>
								<svg viewBox="0 0 40 40" width="40" height="40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img">
									<path fill="#FFCC4D" d="M20 4l3.6 13.2 9.256 3.424-9.204 3.412-3.628 14.488-3.628-14.488-9.204-3.412 9.252-3.424L20 4z"/>
								</svg>
								<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img">
									<path fill="#FFCC4D" d="M16 4l3.504 9.46 9.456 3.5-9.46 3.5-3.5 9.46-3.5-9.46-9.46-3.5 9.46-3.5 3.5-9.46z"/>
								</svg>
							</span>
							<span>1</span>
							<span>2</span>
							<span>3</span>
							<span>4</span>
							<span>5</span>
							<span>6</span>
							<span>7</span>
							<span>8</span>
							<span class="empty-tile"></span>
						</div>
					</li>
				</ol>
			</div>
			<p>The player who solves the game with fewer moves is the winning player!</p>
			<div class="navigation shadow-scroll">
				${
					!storage.isPlayerLogged()
						? '<button class="button signup-button"><svg class="box" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path class="fill" fill-rule="evenodd" clip-rule="evenodd" d="M1.625 12C1.625 12.4142 1.96079 12.75 2.375 12.75L13.3476 12.75L11.3869 14.4306C11.0724 14.7001 11.036 15.1736 11.3056 15.4881C11.5751 15.8026 12.0486 15.839 12.3631 15.5694L15.8631 12.5694C16.0293 12.427 16.125 12.2189 16.125 12C16.125 11.7811 16.0293 11.573 15.8631 11.4306L12.3631 8.43056C12.0486 8.16099 11.5751 8.19741 11.3056 8.51191C11.036 8.8264 11.0724 9.29988 11.3869 9.56944L13.3476 11.25L2.375 11.25C1.96079 11.25 1.625 11.5858 1.625 12Z"/><path class="fill" d="M9.375 9.75004L9.75328 9.75004C9.49473 9.01645 9.6241 8.16876 10.1667 7.53576C10.9754 6.59228 12.3958 6.48301 13.3393 7.29171L16.8393 10.2917C17.338 10.7192 17.625 11.3432 17.625 12C17.625 12.6569 17.338 13.2809 16.8393 13.7084L13.3393 16.7084C12.3958 17.5171 10.9754 17.4078 10.1667 16.4643C9.6241 15.8313 9.49473 14.9836 9.75328 14.25L9.375 14.25L9.375 16C9.375 18.8284 9.375 20.2426 10.2537 21.1213C11.1324 22 12.5466 22 15.375 22L16.375 22C19.2034 22 20.6176 22 21.4963 21.1213C22.375 20.2426 22.375 18.8284 22.375 16L22.375 8C22.375 5.17158 22.375 3.75736 21.4963 2.87868C20.6176 2 19.2034 2 16.375 2L15.375 2C12.5466 2 11.1324 2 10.2537 2.87868C9.375 3.75736 9.375 5.17157 9.375 8L9.375 9.75004Z"/></svg>Signup</button>'
						: '<button class="button restart-game"><svg class="box" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="fill" d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z"/></svg>Play</button>'
				}
				${
					storage.isPlayerLogged()
						? '<button class="button show-profile"><svg class="box" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="fill" fill-rule="evenodd" clip-rule="evenodd" d="M16.5 7.063C16.5 10.258 14.57 13 12 13c-2.572 0-4.5-2.742-4.5-5.938C7.5 3.868 9.16 2 12 2s4.5 1.867 4.5 5.063zM4.102 20.142C4.487 20.6 6.145 22 12 22c5.855 0 7.512-1.4 7.898-1.857a.416.416 0 0 0 .09-.317C19.9 18.944 19.106 15 12 15s-7.9 3.944-7.989 4.826a.416.416 0 0 0 .091.317z"/></svg>Profile</button>'
						: ''
				}
				<button class="button show-leaderboard">
					<svg class="box" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path class="fill" fill-rule="evenodd" clip-rule="evenodd" d="M21.8382 11.1263L21.609 13.5616C21.2313 17.5742 21.0425 19.5805 19.8599 20.7902C18.6773 22 16.9048 22 13.3599 22H10.6401C7.09517 22 5.32271 22 4.14009 20.7902C2.95748 19.5805 2.76865 17.5742 2.391 13.5616L2.16181 11.1263C1.9818 9.2137 1.8918 8.25739 2.21899 7.86207C2.39598 7.64823 2.63666 7.5172 2.89399 7.4946C3.36968 7.45282 3.96708 8.1329 5.16187 9.49307C5.77977 10.1965 6.08872 10.5482 6.43337 10.6027C6.62434 10.6328 6.81892 10.6018 6.99526 10.5131C7.31351 10.3529 7.5257 9.91812 7.95007 9.04852L10.1869 4.46486C10.9888 2.82162 11.3898 2 12 2C12.6102 2 13.0112 2.82162 13.8131 4.46485L16.0499 9.04851C16.4743 9.91812 16.6865 10.3529 17.0047 10.5131C17.1811 10.6018 17.3757 10.6328 17.5666 10.6027C17.9113 10.5482 18.2202 10.1965 18.8381 9.49307C20.0329 8.1329 20.6303 7.45282 21.106 7.4946C21.3633 7.5172 21.604 7.64823 21.781 7.86207C22.1082 8.25739 22.0182 9.2137 21.8382 11.1263ZM12.9524 12.699L12.8541 12.5227C12.4741 11.841 12.2841 11.5002 12 11.5002C11.7159 11.5002 11.5259 11.841 11.1459 12.5227L11.0476 12.699C10.9397 12.8927 10.8857 12.9896 10.8015 13.0535C10.7173 13.1174 10.6125 13.1411 10.4028 13.1886L10.2119 13.2318C9.47396 13.3987 9.10501 13.4822 9.01723 13.7645C8.92945 14.0468 9.18097 14.3409 9.68403 14.9291L9.81418 15.0813C9.95713 15.2485 10.0286 15.3321 10.0608 15.4355C10.0929 15.5389 10.0821 15.6504 10.0605 15.8734L10.0408 16.0765C9.96476 16.8613 9.92674 17.2538 10.1565 17.4282C10.3864 17.6027 10.7318 17.4436 11.4227 17.1255L11.6014 17.0432C11.7978 16.9528 11.8959 16.9076 12 16.9076C12.1041 16.9076 12.2022 16.9528 12.3986 17.0432L12.5773 17.1255C13.2682 17.4436 13.6136 17.6027 13.8435 17.4282C14.0733 17.2538 14.0352 16.8613 13.9592 16.0765L13.9395 15.8734C13.9179 15.6504 13.9071 15.5389 13.9392 15.4355C13.9714 15.3321 14.0429 15.2485 14.1858 15.0813L14.316 14.9291C14.819 14.3409 15.0706 14.0468 14.9828 13.7645C14.895 13.4822 14.526 13.3987 13.7881 13.2318L13.5972 13.1886C13.3875 13.1411 13.2827 13.1174 13.1985 13.0535C13.1143 12.9896 13.0603 12.8927 12.9524 12.699Z"/>
					</svg>
					Leaderboard
				</button>
				${
					storage.isPlayerLogged()
						? '<button class="button logout"><svg class="box" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="fill" fill-rule="evenodd" clip-rule="evenodd" d="M16.125 12C16.125 11.5858 15.7892 11.25 15.375 11.25L4.40244 11.25L6.36309 9.56944C6.67759 9.29988 6.71401 8.8264 6.44444 8.51191C6.17488 8.19741 5.7014 8.16099 5.38691 8.43056L1.88691 11.4306C1.72067 11.573 1.625 11.7811 1.625 12C1.625 12.2189 1.72067 12.427 1.88691 12.5694L5.38691 15.5694C5.7014 15.839 6.17488 15.8026 6.44444 15.4881C6.71401 15.1736 6.67759 14.7001 6.36309 14.4306L4.40244 12.75L15.375 12.75C15.7892 12.75 16.125 12.4142 16.125 12Z"/><path class="fill" d="M9.375 8C9.375 8.70219 9.375 9.05329 9.54351 9.3055C9.61648 9.41471 9.71025 9.50848 9.81946 9.58145C10.0717 9.74996 10.4228 9.74996 11.125 9.74996L15.375 9.74996C16.6176 9.74996 17.625 10.7573 17.625 12C17.625 13.2426 16.6176 14.25 15.375 14.25L11.125 14.25C10.4228 14.25 10.0716 14.25 9.8194 14.4185C9.71023 14.4915 9.6165 14.5852 9.54355 14.6944C9.375 14.9466 9.375 15.2977 9.375 16C9.375 18.8284 9.375 20.2426 10.2537 21.1213C11.1324 22 12.5464 22 15.3748 22L16.3748 22C19.2032 22 20.6174 22 21.4961 21.1213C22.3748 20.2426 22.3748 18.8284 22.3748 16L22.3748 8C22.3748 5.17158 22.3748 3.75736 21.4961 2.87868C20.6174 2 19.2032 2 16.3748 2L15.3748 2C12.5464 2 11.1324 2 10.2537 2.87868C9.375 3.75736 9.375 5.17157 9.375 8Z"/></svg>Logout</button>'
						: ''
				}			
			</div>
		</div>
		<p class="text-center">Designed & Developed by <a href="https://github.com/SaadLaggoun" class="inline-button">Saad Laggoun</a></p>
		`

		app.innerHTML = markup
		navigation.run()
	},
	signup() {
		const dialog = document.querySelector('.dialog')
		if (dialog) dialog.remove()
		let cssClass = 'signup-screen'
		let el = document.querySelector(`.${cssClass}`)
		if (el) return

		const loggedPlayer = storage.getLoggedPlayer()
		let playerIsLogged = ''
		if (loggedPlayer) {
			playerIsLogged = `
			<p class="text-center">You are already logged in as ${loggedPlayer.username}, <button class="inline-button continue-player">Continue?</button> or <button class="inline-button logout">singout</button></p>
			`
		}
		let markup = `
			${loggedPlayer ? playerIsLogged + '<span class="separator">OR</span>' : ''}
			<form class="signup-form">
				<h2>Login if registered, signup if not</h2>
				<div class="input-form">
					<div class="input-group">
						<label for="username">Username</label>
						<input type="text" name="username" id="username" required minlength="3" maxlength="20">
					</div>
					<div class="input-group">
						<label for="password">Password</label>
						<input type="password" name="password" id="password" required>
					</div>
					<div class="input-group">
						<button class="button" type="submit">Enter</button>
					</div>
				</div>
			</form>
		`
		const content = document.createElement('div')
		content.className = `${cssClass} dialog container`
		content.innerHTML = markup

		app.appendChild(content)
		navigation.run()
	},
	pickBoard() {
		const dialog = document.querySelector('.dialog')
		if (dialog) dialog.remove()
		const cssClass = 'pickup-screen'
		const el = document.querySelector(`.${cssClass}`)
		if (el) return

		const markup = `
			<h2>Pick board size</h2>
			<p>Choose the size of the board you want to play with</p>
			<div class="board-size">
				<button class="button board-size-item" data-size="3">3x3</button>
				<button class="button board-size-item" data-size="4">4x4</button>
				<button class="button board-size-item" data-size="5">5x5</button>
			</div>
		`

		const content = document.createElement('div')
		content.className = `${cssClass} dialog container`
		content.innerHTML = markup

		app.appendChild(content)
		navigation.run()
	},
	boardGame(columns) {
		const el = document.querySelector('.board-game')
		if (el) el.remove()

		app.innerHTML = ''

		globalThis.game = boardGame.init(columns)
		const wrapper = globalThis.game.boardWrapper
		wrapper.classList.add('board-container')

		const gameHeader = document.createElement('div')
		gameHeader.className = 'game-header container text-center'
		gameHeader.innerHTML = `
			<h2>Board Game - Arrange tiles</h2>
			<div class="game-info">
				<span class="moves">Moves: <span class="moves-count">${globalThis.game.numberOfMoves}</span></span>
			</div>
			<div class="navigation shadow-scroll">
				<button class="button show-home">
					<svg class="box" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path class="fill" fill-rule="evenodd" clip-rule="evenodd" d="M2.5192 7.82274C2 8.77128 2 9.91549 2 12.2039V13.725C2 17.6258 2 19.5763 3.17157 20.7881C4.34315 22 6.22876 22 10 22H14C17.7712 22 19.6569 22 20.8284 20.7881C22 19.5763 22 17.6258 22 13.725V12.2039C22 9.91549 22 8.77128 21.4808 7.82274C20.9616 6.87421 20.0131 6.28551 18.116 5.10812L16.116 3.86687C14.1106 2.62229 13.1079 2 12 2C10.8921 2 9.88939 2.62229 7.88403 3.86687L5.88403 5.10813C3.98695 6.28551 3.0384 6.87421 2.5192 7.82274ZM9.44661 15.3975C9.11385 15.1508 8.64413 15.2206 8.39747 15.5534C8.15082 15.8862 8.22062 16.3559 8.55339 16.6025C9.5258 17.3233 10.715 17.75 12 17.75C13.285 17.75 14.4742 17.3233 15.4466 16.6025C15.7794 16.3559 15.8492 15.8862 15.6025 15.5534C15.3559 15.2206 14.8862 15.1508 14.5534 15.3975C13.825 15.9373 12.9459 16.25 12 16.25C11.0541 16.25 10.175 15.9373 9.44661 15.3975Z"/>
					</svg>
				</button>
				<button class="button restart-game">
					<svg class="box" viewBox="-1.5 0 19 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
						<g id="Free-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
							<g transform="translate(-1193.000000, -305.000000)" id="Group">
								<g transform="translate(1189.000000, 302.000000)" id="Shape">
									<path class="stroke" d="M12,7 C15.8659932,7 19,10.1340068 19,14 C19,17.8659932 15.8659932,21 12,21 C8.13400675,21 5,17.8659932 5,14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
									<path class="fill" d="M10.8260915,10.8857148 L5.69568021,7.30477744 C5.47956961,7.17854145 5.43577155,6.93976099 5.5978545,6.77144635 C5.62566353,6.74256812 5.65860149,6.71691486 5.69568021,6.69525619 L10.8260915,3.11431886 C11.1502574,2.92496489 11.610137,2.97613213 11.8532614,3.2286041 C11.948511,3.32751578 12,3.4478202 12,3.5714598 L12,10.4285738 C12,10.7441638 11.6715145,11 11.2663072,11 C11.1075579,11 10.9530909,10.9598985 10.8260915,10.8857148 Z"></path>
								</g>
							</g>
						</g>
					</svg>
					Replay
				</button>
				<button class="button show-profile">
					<svg class="box" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="fill" fill-rule="evenodd" clip-rule="evenodd" d="M16.5 7.063C16.5 10.258 14.57 13 12 13c-2.572 0-4.5-2.742-4.5-5.938C7.5 3.868 9.16 2 12 2s4.5 1.867 4.5 5.063zM4.102 20.142C4.487 20.6 6.145 22 12 22c5.855 0 7.512-1.4 7.898-1.857a.416.416 0 0 0 .09-.317C19.9 18.944 19.106 15 12 15s-7.9 3.944-7.989 4.826a.416.416 0 0 0 .091.317z"/></svg>
					Profile
				</button>
				<button class="button logout">
					<svg class="box" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path class="fill" fill-rule="evenodd" clip-rule="evenodd" d="M16.125 12C16.125 11.5858 15.7892 11.25 15.375 11.25L4.40244 11.25L6.36309 9.56944C6.67759 9.29988 6.71401 8.8264 6.44444 8.51191C6.17488 8.19741 5.7014 8.16099 5.38691 8.43056L1.88691 11.4306C1.72067 11.573 1.625 11.7811 1.625 12C1.625 12.2189 1.72067 12.427 1.88691 12.5694L5.38691 15.5694C5.7014 15.839 6.17488 15.8026 6.44444 15.4881C6.71401 15.1736 6.67759 14.7001 6.36309 14.4306L4.40244 12.75L15.375 12.75C15.7892 12.75 16.125 12.4142 16.125 12Z"/>
						<path class="fill" d="M9.375 8C9.375 8.70219 9.375 9.05329 9.54351 9.3055C9.61648 9.41471 9.71025 9.50848 9.81946 9.58145C10.0717 9.74996 10.4228 9.74996 11.125 9.74996L15.375 9.74996C16.6176 9.74996 17.625 10.7573 17.625 12C17.625 13.2426 16.6176 14.25 15.375 14.25L11.125 14.25C10.4228 14.25 10.0716 14.25 9.8194 14.4185C9.71023 14.4915 9.6165 14.5852 9.54355 14.6944C9.375 14.9466 9.375 15.2977 9.375 16C9.375 18.8284 9.375 20.2426 10.2537 21.1213C11.1324 22 12.5464 22 15.3748 22L16.3748 22C19.2032 22 20.6174 22 21.4961 21.1213C22.3748 20.2426 22.3748 18.8284 22.3748 16L22.3748 8C22.3748 5.17158 22.3748 3.75736 21.4961 2.87868C20.6174 2 19.2032 2 16.3748 2L15.3748 2C12.5464 2 11.1324 2 10.2537 2.87868C9.375 3.75736 9.375 5.17157 9.375 8Z"/>
					</svg>
					Logout
				</button>
			</div>
		`

		const confettiCanvas = document.createElement('canvas')
		confettiCanvas.id = 'confetti'
		confettiCanvas.style.display = 'none'
		confettiCanvas.style.position = 'absolute'
		confettiCanvas.style.zIndex = '4'
		confettiCanvas.style.top = '0'
		confettiCanvas.style.left = '0'

		app.appendChild(gameHeader)
		app.appendChild(wrapper)
		app.appendChild(confettiCanvas)
		navigation.run()
	},
	winnerScreen() {
		const dialog = document.querySelector('.dialog')
		if (dialog) dialog.remove()
		let cssClass = 'winner-screen'
		let el = document.querySelector(`.${cssClass}`)
		if (el) return

		const players = storage.getPlayers()
		const player = players.findIndex(
			(player) => player.username === storage.getLoggedPlayer().username
		)
		let playerBested = false
		if (player !== -1) {
			playerBested = storage.updateGameScore(
				globalThis.game.columns,
				globalThis.game.numberOfMoves,
				players[player].username
			)

			if (playerBested) {
				const confettiCanvas = document.querySelector('#confetti')
				confettiCanvas.style.display = 'block'
				const ctx = confettiCanvas.getContext('2d')
				confettiCanvas.width = window.innerWidth
				confettiCanvas.height = window.innerHeight

				const confettis = []
				const colors = [
					'#FF007A',
					'#7A00FF',
					'#00FF7A',
					'#FFD700',
					'#00D4FF',
				]

				function createConfetti() {
					const confetti = {
						x: Math.random() * confettiCanvas.width,
						y:
							Math.random() * confettiCanvas.height -
							confettiCanvas.height,
						size: Math.random() * 10 + 5,
						color: colors[Math.floor(Math.random() * colors.length)],
						speedX: Math.random() * 6 - 1.5,
						speedY: Math.random() * 10 + 2,
						rotation: Math.random() * 360,
					}
					confettis.push(confetti)
				}

				for (let i = 0; i < 200; i++) {
					createConfetti()
				}

				function animateConfetti() {
					ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height)
					confettis.forEach((confetti, index) => {
						confetti.x += confetti.speedX
						confetti.y += confetti.speedY
						confetti.rotation += confetti.speedX

						ctx.save()
						ctx.translate(confetti.x, confetti.y)
						ctx.rotate((confetti.rotation * Math.PI) / 180)
						ctx.fillStyle = confetti.color
						ctx.fillRect(
							-confetti.size / 2,
							-confetti.size / 2,
							confetti.size,
							confetti.size
						)
						ctx.restore()

						if (confetti.y > confettiCanvas.height) {
							confettis.splice(index, 1)
						}
					})

					if (confettis.length > 0) {
						requestAnimationFrame(animateConfetti)
					} else {
						confettiCanvas.remove()
					}
				}

				setTimeout(() => {
					animateConfetti()
				}, 400)
			}
		}

		let markup = `
			<h2 class="text-center">You won!</h2>
			<p>Congratulations! You solved the puzzle in <em class="moves-count">${
				globalThis.game.numberOfMoves
			}</em> moves.</p>
			${playerBested ? '<p>You made a new record!</p>' : ''}
			<div class="navigation shadow-scroll" style="--primary-color: #fff">
				<button class="button restart-game">
				<svg class="box" viewBox="-1.5 0 19 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
					<g id="Free-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
						<g transform="translate(-1193.000000, -305.000000)" id="Group">
							<g transform="translate(1189.000000, 302.000000)" id="Shape">
								<path class="stroke" d="M12,7 C15.8659932,7 19,10.1340068 19,14 C19,17.8659932 15.8659932,21 12,21 C8.13400675,21 5,17.8659932 5,14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
								<path class="fill" d="M10.8260915,10.8857148 L5.69568021,7.30477744 C5.47956961,7.17854145 5.43577155,6.93976099 5.5978545,6.77144635 C5.62566353,6.74256812 5.65860149,6.71691486 5.69568021,6.69525619 L10.8260915,3.11431886 C11.1502574,2.92496489 11.610137,2.97613213 11.8532614,3.2286041 C11.948511,3.32751578 12,3.4478202 12,3.5714598 L12,10.4285738 C12,10.7441638 11.6715145,11 11.2663072,11 C11.1075579,11 10.9530909,10.9598985 10.8260915,10.8857148 Z"></path>
							</g>
						</g>
					</g>
				</svg>
				Replay
				</button>
				<button class="button show-profile">
					<svg class="box" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="fill" fill-rule="evenodd" clip-rule="evenodd" d="M16.5 7.063C16.5 10.258 14.57 13 12 13c-2.572 0-4.5-2.742-4.5-5.938C7.5 3.868 9.16 2 12 2s4.5 1.867 4.5 5.063zM4.102 20.142C4.487 20.6 6.145 22 12 22c5.855 0 7.512-1.4 7.898-1.857a.416.416 0 0 0 .09-.317C19.9 18.944 19.106 15 12 15s-7.9 3.944-7.989 4.826a.416.416 0 0 0 .091.317z"/></svg>
					Profile
				</button>
				<button class="button show-leaderboard">
					<svg class="box" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path class="fill" fill-rule="evenodd" clip-rule="evenodd" d="M21.8382 11.1263L21.609 13.5616C21.2313 17.5742 21.0425 19.5805 19.8599 20.7902C18.6773 22 16.9048 22 13.3599 22H10.6401C7.09517 22 5.32271 22 4.14009 20.7902C2.95748 19.5805 2.76865 17.5742 2.391 13.5616L2.16181 11.1263C1.9818 9.2137 1.8918 8.25739 2.21899 7.86207C2.39598 7.64823 2.63666 7.5172 2.89399 7.4946C3.36968 7.45282 3.96708 8.1329 5.16187 9.49307C5.77977 10.1965 6.08872 10.5482 6.43337 10.6027C6.62434 10.6328 6.81892 10.6018 6.99526 10.5131C7.31351 10.3529 7.5257 9.91812 7.95007 9.04852L10.1869 4.46486C10.9888 2.82162 11.3898 2 12 2C12.6102 2 13.0112 2.82162 13.8131 4.46485L16.0499 9.04851C16.4743 9.91812 16.6865 10.3529 17.0047 10.5131C17.1811 10.6018 17.3757 10.6328 17.5666 10.6027C17.9113 10.5482 18.2202 10.1965 18.8381 9.49307C20.0329 8.1329 20.6303 7.45282 21.106 7.4946C21.3633 7.5172 21.604 7.64823 21.781 7.86207C22.1082 8.25739 22.0182 9.2137 21.8382 11.1263ZM12.9524 12.699L12.8541 12.5227C12.4741 11.841 12.2841 11.5002 12 11.5002C11.7159 11.5002 11.5259 11.841 11.1459 12.5227L11.0476 12.699C10.9397 12.8927 10.8857 12.9896 10.8015 13.0535C10.7173 13.1174 10.6125 13.1411 10.4028 13.1886L10.2119 13.2318C9.47396 13.3987 9.10501 13.4822 9.01723 13.7645C8.92945 14.0468 9.18097 14.3409 9.68403 14.9291L9.81418 15.0813C9.95713 15.2485 10.0286 15.3321 10.0608 15.4355C10.0929 15.5389 10.0821 15.6504 10.0605 15.8734L10.0408 16.0765C9.96476 16.8613 9.92674 17.2538 10.1565 17.4282C10.3864 17.6027 10.7318 17.4436 11.4227 17.1255L11.6014 17.0432C11.7978 16.9528 11.8959 16.9076 12 16.9076C12.1041 16.9076 12.2022 16.9528 12.3986 17.0432L12.5773 17.1255C13.2682 17.4436 13.6136 17.6027 13.8435 17.4282C14.0733 17.2538 14.0352 16.8613 13.9592 16.0765L13.9395 15.8734C13.9179 15.6504 13.9071 15.5389 13.9392 15.4355C13.9714 15.3321 14.0429 15.2485 14.1858 15.0813L14.316 14.9291C14.819 14.3409 15.0706 14.0468 14.9828 13.7645C14.895 13.4822 14.526 13.3987 13.7881 13.2318L13.5972 13.1886C13.3875 13.1411 13.2827 13.1174 13.1985 13.0535C13.1143 12.9896 13.0603 12.8927 12.9524 12.699Z"/>
					</svg>
					Leaderboard
				</button>
				<button class="button logout">
				<svg class="box" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path class="fill" fill-rule="evenodd" clip-rule="evenodd" d="M16.125 12C16.125 11.5858 15.7892 11.25 15.375 11.25L4.40244 11.25L6.36309 9.56944C6.67759 9.29988 6.71401 8.8264 6.44444 8.51191C6.17488 8.19741 5.7014 8.16099 5.38691 8.43056L1.88691 11.4306C1.72067 11.573 1.625 11.7811 1.625 12C1.625 12.2189 1.72067 12.427 1.88691 12.5694L5.38691 15.5694C5.7014 15.839 6.17488 15.8026 6.44444 15.4881C6.71401 15.1736 6.67759 14.7001 6.36309 14.4306L4.40244 12.75L15.375 12.75C15.7892 12.75 16.125 12.4142 16.125 12Z"></path>
					<path class="fill" d="M9.375 8C9.375 8.70219 9.375 9.05329 9.54351 9.3055C9.61648 9.41471 9.71025 9.50848 9.81946 9.58145C10.0717 9.74996 10.4228 9.74996 11.125 9.74996L15.375 9.74996C16.6176 9.74996 17.625 10.7573 17.625 12C17.625 13.2426 16.6176 14.25 15.375 14.25L11.125 14.25C10.4228 14.25 10.0716 14.25 9.8194 14.4185C9.71023 14.4915 9.6165 14.5852 9.54355 14.6944C9.375 14.9466 9.375 15.2977 9.375 16C9.375 18.8284 9.375 20.2426 10.2537 21.1213C11.1324 22 12.5464 22 15.3748 22L16.3748 22C19.2032 22 20.6174 22 21.4961 21.1213C22.3748 20.2426 22.3748 18.8284 22.3748 16L22.3748 8C22.3748 5.17158 22.3748 3.75736 21.4961 2.87868C20.6174 2 19.2032 2 16.3748 2L15.3748 2C12.5464 2 11.1324 2 10.2537 2.87868C9.375 3.75736 9.375 5.17157 9.375 8Z"></path>
				</svg>
				Logout
				</button>
			</div>
		`

		const content = document.createElement('div')
		content.className = `${cssClass} dialog container`
		content.innerHTML = markup

		app.appendChild(content)
		navigation.run()
	},
	leaderBoard() {
		const dialog = document.querySelector('.dialog')
		if (dialog) dialog.remove()
		const cssClass = 'leaderboard-screen'
		const el = document.querySelector(`.${cssClass}`)
		if (el) return

		const markup = `
			<h1>Leaderboard</h1>
			<p>Top players who went through the battle and come alive</p>
			<div class="leaderboard"></div>
		`

		const content = document.createElement('div')
		content.className = `${cssClass} dialog container`
		content.innerHTML = markup

		app.appendChild(content)
		this.leaderBoardTable()
		navigation.run()
	},
	leaderBoardTable(sortBy) {
		const games = storage.getGames()
		sortBy = sortBy ?? Object.keys(games)[0]
		const players = storage.getLeaderboardBySize(sortBy.slice(0, 1))
		if (!games) return null
		if (!storage.getPlayers()) {
			const content = document.createElement('p')
			content.className = 'text-center'
			content.textContent = 'Currently there are no players'
			const leaderboard = document.querySelector('.leaderboard')
			leaderboard.innerHTML = ''
			leaderboard.appendChild(content)
			return
		}

		let gamesMarkup = ''
		for (const game in games) {
			let selectedSort = ''
			if (game == sortBy) selectedSort = 'active'

			gamesMarkup += `
				<th>
					<button class="leaderboard-sortby inline-button ${selectedSort}" data-size="${game.slice(
				0,
				1
			)}">
				${game} &darr;
					</button>
				</th>
			`
		}

		let leadingPlayers = ''
		players.forEach((player) => {
			leadingPlayers += `
				<tr>
				<td>${player.username}</td>
			`
			for (const game in games) {
				if (player[game] == Infinity) {
					leadingPlayers += `
						<td>&mdash;</td>
					`
					continue
				}
				leadingPlayers += `
					<td>${player[game]}</td>
				`
			}
			leadingPlayers += '</tr>'
		})

		const markup = `
			<table>
				<thead>
					<tr>
						<th>Username</th>
						${gamesMarkup}
					</tr>
				</thead>
				<tbody>
					${leadingPlayers}
				</tbody>
			</table>
		`

		let content = document.querySelector('.leaderboard')
		content.innerHTML = markup

		navigation.run()
	},
	profile() {
		const dialog = document.querySelector('.dialog')
		if (dialog) dialog.remove()
		let cssClass = 'profile-screen'
		let el = document.querySelector(`.${cssClass}`)
		if (el) return

		const loggedPlayer = storage.getLoggedPlayer()
		if (!loggedPlayer) return

		const games = storage.getPlayerGameStats(loggedPlayer.username)
		if (!games) return

		let bestScore = ''
		let lastScores = ''
		for (const game in games) {
			if (games[game].bestScore !== 999999)
				bestScore += `${game} (${games[game].bestScore}) `

			if (games[game].lastScore)
				lastScores += `${game} (${games[game].lastScore}) `
		}
		bestScore = bestScore ? bestScore : 'No records found.'
		lastScores = lastScores ? lastScores : 'No records found.'

		let markup = `
			<h1>Profile</h1>
			<h2>Hello, ${loggedPlayer.username}! Nice seeing you</h2>
			<p>Your best scores are: ${bestScore}</p>
			<p>Your last scores are: ${lastScores}</p>
		`

		const content = document.createElement('div')
		content.className = `${cssClass} dialog container`
		content.innerHTML = markup

		app.appendChild(content)
		navigation.run()
	},
}
