import { Head } from '@/scene/snake/Head'
import { Body } from '@/scene/snake/Body'
import { Controls } from '@/scene/snake/Controls'
import { BODY_CHUNK_AMOUNT } from '@/scene/constants/bodyContstants'

export class Snake {

    head = new Head()

    bodyChunks = new Array(BODY_CHUNK_AMOUNT).fill().map((_, x) => new Body(x + 1))

    controls

    activate() {
        this.controls = new Controls(this.head, this.bodyChunks)
        this.controls.listenEvents()
    }

    deactivate() {
        this.controls.unlistenEvents()
    }
}