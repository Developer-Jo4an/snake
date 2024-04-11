import { SnakeHead } from '@/scene/SnakeHead'
import { SnakeBodyChunk } from '@/scene/SnakeBodyChunk'
import { SnakeControls } from '@/scene/SnakeControls'

export class Snake {
    head
    bodyChunks = []
    controls

    constructor() {
        this.createHead()
        this.createBodyChunks()
        this.activate()
    }

    createHead() {
        this.head = new SnakeHead()
    }

    createBodyChunks() {
        for (let x = 1.5; x < 9; x += 1.5) {
            this.bodyChunks.push(new SnakeBodyChunk(x))
        }
    }

    activate() {
        this.controls = new SnakeControls({
            head: this.head,
            bodyChunks: this.bodyChunks
        })
        this.controls.listenEvents()
    }

    deactivate() {
        this.controls.unlistenEvents()
    }
}