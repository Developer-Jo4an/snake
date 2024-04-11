export class SnakeHead extends THREE.Mesh {
    constructor() {
        const geometry = new THREE.SphereGeometry(1)
        const material = new THREE.MeshBasicMaterial({ color: '#ff0000' })
        super(geometry, material)
        this.position.y = 1
    }
}