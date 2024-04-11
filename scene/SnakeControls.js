import { FORWARD, LEFT, RIGHT } from '@/scene/constants'

export class SnakeControls {
    actions = {
        [FORWARD] : {
            keys: [87, 38],
            isActive: false
        },
        [LEFT]: {
            keys: [65, 37],
            isActive: false
        },
        [RIGHT]: {
            keys: [68, 39],
            isActive: false
        }
    }

    availableKeys = Object.values(this.actions)
        .reduce((acc, { keys }) => [...acc, ...keys], [])


    constructor(snake) {
        this.activateAction = this.activateAction.bind(this)
        this.deactivateAction = this.deactivateAction.bind(this)
        this.snakeAnimation = this.snakeAnimation.bind(this)

        this.snakeHead = snake.head
        this.snakeBodyChunks = snake.bodyChunks
    }

    snakeAnimation() {

        requestAnimationFrame(this.snakeAnimation)
    }

    activateAction(e) {
        const { keyCode } = e
        if (!this.availableKeys.includes(keyCode)) return

        let currentAction = null
        for (const key in this.actions) {
            const iterAction = this.actions[key]
            if (iterAction.keys.includes(keyCode)) {
                currentAction = iterAction
            }
        }
    }

    deactivateAction(e) {

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