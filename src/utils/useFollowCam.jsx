import { useThree } from '@react-three/fiber'
import React, { useEffect, useMemo } from 'react'
import { CameraHelper, Object3D } from 'three'

const useFollowCam = () => {
    // const state = useThree() // useThree는 Scene에서 사용하면 안되고 무조건 캔버스 안에 만들어야함
    const { camera, scene } = useThree()
    const pivot = useMemo(() => new Object3D(), [])

    // console.log(state)

    const makeCamera = () => {
        camera.position.set(1, 2, 3.5) // Scene컴포넌트의 Canvas의 camera position을 변경하는것과 비슷
        camera.rotation.x = -0.5

        pivot.add(camera)
        // helper 만드는 법
        // const helper = new CameraHelper(camera)
        // scene.add(helper)
        scene.add(pivot)
    }

    useEffect(() => {
        makeCamera()
    }, [])

    return { pivot }
}

export default useFollowCam