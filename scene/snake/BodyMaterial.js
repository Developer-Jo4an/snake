import { ASSETS } from '@/scene/constants/assetsConstants'

let instance = null

export class BodyMaterial extends THREE.MeshBasicMaterial {
	constructor() {
		if (instance) return instance

		super({ map: ASSETS.skin })

		instance = this
	}
}