export class SnakeBodyChunk extends THREE.Mesh {
    constructor(x) {
        const geometry = new THREE.CylinderGeometry(1, 1, 3)
        const mesh = new THREE.MeshBasicMaterial({ color: '#00ff00' })
        super(geometry, mesh)
        this.position.set(x, 1, 0)
        this.rotation.z = Math.PI * 0.5
    }
}