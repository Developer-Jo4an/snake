'use client'
import { useEffect, useRef } from 'react'
import { installTHREEPackage } from '@/packages/three.package'

const Home = () => {
	const snakeContainerRef = useRef()

	useEffect(() => {
		let scene = null;

		(async () => {
			await installTHREEPackage()

			const { SceneInit } = await import('@/scene/scene/SceneInit')
			scene = new SceneInit(snakeContainerRef.current)
			scene.activate()
		})()

		return () => {
			if (scene)
				scene.deactivate()
		}
	}, [])

	return (
		<div className={ 'snake' } ref={ snakeContainerRef }></div>
	)
}

export default Home