import { BodyGeometry } from '@/scene/snake/BodyGeometry'
import { BodyMaterial } from '@/scene/snake/BodyMaterial'
import { BODY_CHUNK_HEIGHT } from '@/scene/constants/bodyContstants'

export class Body extends THREE.Mesh {
    constructor(x, multiple) {
        super(new BodyGeometry(), new BodyMaterial())

	    this.rotation.y = -Math.PI * 0.5
        this.position.set(x * BODY_CHUNK_HEIGHT + multiple, 1, 0)
    }
}