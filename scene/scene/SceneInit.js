import { WebGLRenderer } from 'three'
import { Snake } from '@/scene/snake/Snake'
import { Floor } from '@/scene/floor/Floor'

export class SceneInit {
	scene = new THREE.Scene()
	camera = new THREE.PerspectiveCamera(75, 2, 0.1, 100)
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

	createFloor() {
		this.scene.add(new Floor())
	}

	updateCamera() {
		this.camera.position.set(
			this.snake.head.position.x + 20,
			this.snake.head.position.y + 20,
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

		this.scene.fog = new THREE.Fog('#ffffff', 25, 50)
		this.scene.background = new THREE.Color('#ffffff')

		this.camera.aspect = +this.$container.offsetWidth / +this.$container.offsetHeight
		this.camera.position.set(10, 10, 0)

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