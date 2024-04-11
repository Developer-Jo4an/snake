import { GridHelper, WebGLRenderer } from 'three'
import { Snake } from '@/scene/Snake'

export class SceneInit {
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(75, 2, 0.1, 100)
    renderer = new WebGLRenderer()
    axesHelper = new THREE.AxesHelper(100)
    gridHelper = new GridHelper(100, 100, '#ffffff', '#ff0000')
    orbitControls = new OrbitControls(this.camera, this.renderer.domElement)

    constructor(container) {
        this.resize = this.resize.bind(this)
        this.generalAnimation = this.generalAnimation.bind(this)

        this.$container = container
    }

    createSnake() {
        const { head, bodyChunks } = new Snake()
        this.scene.add(head)
        bodyChunks.forEach(chunk => this.scene.add(chunk))
    }

    generalAnimation() {
        this.orbitControls.update()

        this.renderer.render(this.scene, this.camera)
        requestAnimationFrame(this.generalAnimation)
    }

    mounting() {
        this.$container.append(this.renderer.domElement)

        this.camera.aspect = +this.$container.offsetWidth / +this.$container.offsetHeight
        this.camera.position.set(10, 10, 0)

        this.scene.add(this.axesHelper)
        this.scene.add(this.gridHelper)

        this.createSnake()

        this.resize()

        requestAnimationFrame(this.generalAnimation)
    }

    demounting() {
        while (this.scene.children[0]) {
            this.scene.remove(this.scene.children[0])
        }
        this.renderer.dispose()
        delete window.OrbitControls
        delete window.THREE
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