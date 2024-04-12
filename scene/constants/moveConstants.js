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

		this.snakeBodyChunks.forEach((curChunk, i) => {
			if (i === 0) {
				curChunk.lookAt(this.snakeHead.position)

				const distance = curChunk.position.distanceTo(this.snakeHead.position)
				const permittedDistance = curChunk.geometry.parameters.height

				if (distance > permittedDistance) curChunk.translateZ(distance - permittedDistance)
				return
			}

			const previousChunk = this.snakeBodyChunks[i - 1]

			curChunk.lookAt(previousChunk.position)

			const distance = previousChunk.position.distanceTo(curChunk.position)
			const permittedDistance = curChunk.geometry.parameters.height

			if (distance > permittedDistance) curChunk.translateZ(distance - permittedDistance)
		})
	},
	[LEFT]: function () {
		this.snakeHead.rotation.y += ROTATE_SPEED
	},
	[RIGHT]: function () {
		this.snakeHead.rotation.y += -ROTATE_SPEED
	}
}