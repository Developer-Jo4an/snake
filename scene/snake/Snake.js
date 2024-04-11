import { Head } from '@/scene/snake/Head'
import { Body } from '@/scene/snake/Body'
import { Controls } from '@/scene/snake/Controls'
import { BODY_CHUNK_AMOUNT, BODY_CHUNK_RADIUS } from '@/scene/constants/bodyContstants'

export class Snake {
    head
    bodyChunks = []
    controls
	chunkCounter = BODY_CHUNK_AMOUNT

    constructor() {
        this.createHead()
        this.createBodyChunks()
        this.activate()
    }

    createHead() {
	    this.head = new Head()
    }

    createBodyChunks() {
		let multiple = 0
        for (let x = 1; x < this.chunkCounter; x++) {
            this.bodyChunks.push(new Body(x, multiple))
	        multiple -= BODY_CHUNK_RADIUS * 0.5
        }
    }

    activate() {
        this.controls = new Controls({
            head: this.head,
            bodyChunks: this.bodyChunks
        })
        this.controls.listenEvents()
    }

    deactivate() {
        this.controls.unlistenEvents()
    }
}