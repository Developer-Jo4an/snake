import { ACTIONS, AVAILABLE_KEYS, MOVE_LOGIC } from '@/scene/constants/moveConstants'

export class Controls {
	actions = ACTIONS
	availableKeys = AVAILABLE_KEYS
	activeKeys = []
	activeActions = []

	moveLogic = MOVE_LOGIC

	constructor(snake) {
		this.activateAction = this.activateAction.bind(this)
		this.deactivateAction = this.deactivateAction.bind(this)
		this.snakeAnimation = this.snakeAnimation.bind(this)

		this.snakeHead = snake.head
		this.snakeBodyChunks = snake.bodyChunks
	}

	snakeAnimation() {
		this.activeActions.forEach(action => this.moveLogic[action].call(this))
		requestAnimationFrame(this.snakeAnimation)
	}

	getCurrentAction(keyCode) {
		return Object.entries(this.actions)
			.reduce((acc, [_, actionObj]) =>
			actionObj.keys.includes(keyCode) ?
				actionObj
				:
				acc
		, null)
	}

	activateAction({ keyCode }) {
		if (!this.availableKeys.includes(keyCode)) return

		this.activeKeys.push(keyCode)

		const currentAction = this.getCurrentAction(keyCode)

		if (currentAction.isActive) return

		currentAction.isActive = true
		this.activeActions.push(currentAction.name)
	}

	deactivateAction({ keyCode }) {
		if (!this.availableKeys.includes(keyCode)) return

		this.activeKeys = this.activeKeys.filter(key => key !== keyCode)

		const currentAction = this.getCurrentAction(keyCode)

		const isWillActive = currentAction.keys.reduce((acc, key) =>
			this.activeKeys.includes(key) ? true : acc
		, false)

		if (isWillActive) return

		currentAction.isActive = false
		this.activeActions = this.activeActions.filter(action => action !== currentAction.name)
	}

	listenEvents() {
		requestAnimationFrame(this.snakeAnimation)
		window.addEventListener('keydown', this.activateAction)
		window.addEventListener('keyup', this.deactivateAction)
	}

	unlistenEvents() {
		cancelAnimationFrame(this.snakeAnimation)
		window.removeEventListener('keydown', this.activateAction)
		window.removeEventListener('keyup', this.deactivateAction)
	}
}