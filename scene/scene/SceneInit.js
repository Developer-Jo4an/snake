import { WebGLRenderer } from 'three'
import { Snake } from '@/scene/snake/Snake'
import { Floor } from '@/scene/floor/Floor'
import {
	BACK_FOR_FOG,
	FOG_COLOR,
	FOG_FAR,
	FOG_NEAR
} from '@/scene/constants/fogConstants'
import {
	CAMERA_DEFAULT_ASPECT,
	CAMERA_FAR,
	CAMERA_FOV,
	CAMERA_NEAR,
	CAMERA_X_DISTANCE,
	CAMERA_Y_DISTANCE
} from '@/scene/constants/cameraConstants'

export class SceneInit {

	scene = new THREE.Scene()

	camera = new THREE.PerspectiveCamera(
		CAMERA_FOV,
		CAMERA_DEFAULT_ASPECT,
		CAMERA_NEAR,
		CAMERA_FAR
	)

	renderer = new WebGLRenderer()

	snake = new Snake()

	constructor(container) {
		this.resize = this.resize.bind(this)
		this.generalAnimation = this.generalAnimation.bind(this)

		this.$container = container
	}

	addSnake() {
		this.scene.add(this.snake.head)
		this.snake.bodyChunks.forEach(chunk => this.scene.add(chunk))
		this.snake.activate()
	}

	createFog() {
		this.scene.fog = new THREE.Fog(FOG_COLOR, FOG_NEAR, FOG_FAR)
		this.scene.background = new THREE.Color(BACK_FOR_FOG)
	}

	createFloor() {
		this.scene.add(new Floor())
	}

	updateCamera() {
		this.camera.position.set(
			this.snake.head.position.x + CAMERA_X_DISTANCE,
			this.snake.head.position.y + CAMERA_Y_DISTANCE,
			this.snake.head.position.z
		)
		this.camera.updateWorldMatrix()
		this.camera.lookAt(this.snake.head.position)
	}

	generalAnimation() {
		this.updateCamera()

		this.renderer.render(this.scene, this.camera)
		requestAnimationFrame(this.generalAnimation)
	}

	mounting() {
		this.$container.append(this.renderer.domElement)

		this.createFog()
		this.createFloor()
		this.addSnake()

		this.resize()

		requestAnimationFrame(this.generalAnimation)
	}

	demounting() {
		while (this.scene.children[0])
			this.scene.remove(this.scene.children[0])
		this.renderer.dispose()
		this.snake.deactivate()
		delete window.THREE
		delete window.texturesLoader
		cancelAnimationFrame(this.generalAnimation)
	}

	resize() {
		const width = +this.$container.offsetWidth
		const height = +this.$container.offsetHeight

		this.camera.aspect = width / height
		this.camera.updateProjectionMatrix()

		this.renderer.setSize(width, height)
	}

	activate() {
		this.mounting()
		window.addEventListener('resize', this.resize)
	}

	deactivate() {
		this.demounting()
		window.removeEventListener('resize', this.resize)
	}
}