'use client'
import { useEffect, useRef } from 'react'
import { importThree } from '@/packages/three.package'

const Home = () => {
    const snakeContainerRef = useRef()

    useEffect(() => {
        let scene = null

        ;(async () => {
            await importThree()

            const { SceneInit } = await import('@/scene/SceneInit')
            scene = new SceneInit(snakeContainerRef.current)
            scene.activate()
        })()

        return () => {
            if (scene) {
                scene.deactivate()
            }
        }
    }, [])

    return (
        <div className={ 'snake' } ref={ snakeContainerRef }></div>
    )
}

export default Home