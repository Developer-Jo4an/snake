import { Head } from '@/scene/snake/Head'
import { Body } from '@/scene/snake/Body'
import { Controls } from '@/scene/snake/Controls'
import { BODY_CHUNK_AMOUNT, BODY_CHUNK_RADIUS } from '@/scene/constants/bodyContstants'

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
	    this.head = new Head()
    }

    createBodyChunks() {
        for (let x = 1; x < BODY_CHUNK_AMOUNT; x++) {
            this.bodyChunks.push(new Body(x))
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