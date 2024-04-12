import { ASSETS } from '@/scene/constants/assetsConstants'
import { FLOOR_HEIGHT, FLOOR_WIDTH } from '@/scene/constants/floorConstants'

export class FloorMaterial extends THREE.MeshBasicMaterial{
    constructor() {
        super({ map: ASSETS.floor })

        this.map.wrapS = THREE.RepeatWrapping
        this.map.wrapT = THREE.RepeatWrapping
        this.map.repeat.set(FLOOR_WIDTH, FLOOR_HEIGHT)
        this.map.magFilter = THREE.NearestFilter
    }
}