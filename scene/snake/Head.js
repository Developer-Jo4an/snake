export class Head extends THREE.Mesh {
    constructor() {
	    const geometry = new THREE.SphereGeometry(1)

	    const material = new THREE.MeshBasicMaterial({ color: '#4d9105' })

	    super(geometry, material)

	    this.position.y = 1
    }
}