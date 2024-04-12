import { FloorGeometry } from '@/scene/floor/FloorGeometry'
import { FloorMaterial } from '@/scene/floor/FloorMaterial'

export class Floor extends THREE.Mesh{
    constructor() {
        super(new FloorGeometry(), new FloorMaterial())
        this.rotation.x = -Math.PI * 0.5
    }
}