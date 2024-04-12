export const FORWARD = 'FORWARD'
export const LEFT = 'LEFT'
export const RIGHT = 'RIGHT'

export const MOVE_SPEED = 0.2
export const ROTATE_SPEED = 0.02

export const ACTIONS = {
	[FORWARD]: {
		name: FORWARD,
		keys: [87, 38],
		isActive: false
	},
	[LEFT]: {
		name: LEFT,
		keys: [65, 37],
		isActive: false
	},
	[RIGHT]: {
		name: RIGHT,
		keys: [68, 39],
		isActive: false
	}
}

export const AVAILABLE_KEYS = Object.values(ACTIONS)
	.reduce((acc, { keys }) => [...acc, ...keys], [])

export const MOVE_LOGIC = {
	[FORWARD]: function () {
		this.snakeHead.translateX(-MOVE_SPEED)

		const snakeParts = [this.snakeHead, ...this.snakeBodyChunks]

		snakeParts.forEach((curChunk, i, arr) => {
			if (!i) return

			const previousChunk = arr[i - 1]

			curChunk.lookAt(previousChunk.position)

			const distance = curChunk.position.distanceTo(previousChunk.position)
			const permittedDistance = curChunk.geometry.parameters.height
			const diff = distance - permittedDistance

			if (diff > 0) curChunk.translateZ(diff)
		})
	},
	[LEFT]: function () {
		this.snakeHead.rotation.y += ROTATE_SPEED
	},
	[RIGHT]: function () {
		this.snakeHead.rotation.y -= ROTATE_SPEED
	}
}