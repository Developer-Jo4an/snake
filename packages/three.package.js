export const importThree = async () => {
    window.THREE = await import('three')
    window.OrbitControls = (await import('three/addons')).OrbitControls
}