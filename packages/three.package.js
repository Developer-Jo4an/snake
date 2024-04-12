import { ASSETS, FLOOR_PATH, SKIN_PATH } from '@/scene/constants/assetsConstants'
import { loadTexturesHelper } from '@/scene/helpers/loadTexturesHelper'

export const installTHREEPackage = async () => {
    window.THREE = await import('three')

	window.texturesLoader = new THREE.TextureLoader()
	ASSETS.skin = await loadTexturesHelper(SKIN_PATH)
	ASSETS.floor = await loadTexturesHelper(FLOOR_PATH)
}