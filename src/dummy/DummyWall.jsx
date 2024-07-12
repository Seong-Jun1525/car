import { useBox } from '@react-three/cannon'
import React from 'react'

const DummyWall = (props) => {
    const { args } = props
    const [ref] = useBox(() => ({
        args: args,
        type: "Static", // 기본값은 Dynamic
        ...props
    }))
    return (
        <mesh ref={ref}>
            <boxGeometry args={args} />
            <meshBasicMaterial
                color={"black"}
                transparent
                opacity={0.5}
            />
        </mesh>
    )
}

export default DummyWall