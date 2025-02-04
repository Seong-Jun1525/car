import { useBox } from '@react-three/cannon'
import React, { useRef } from 'react'

const DummyMotionArea = ({position}) => {
    const [ref, api] = useBox(() => ({
        args: [1, 0.2, 1],
        position,
        mass: 1,
        type: "Kinematic"
    }), useRef(null))
    return (
        <mesh ref={ref} onClick={() => api.velocity.set(0, 0.5, 0)}>
            <boxGeometry
                args={[1, 0.2, 1]}
            />
            <meshNormalMaterial />
        </mesh>
    )
}

export default DummyMotionArea