import { useBox } from '@react-three/cannon'
import React from 'react'

const DummyBox = (props) => {
    const { args } = props
    const [ref] = useBox(() => ({
        args: args,
        mass: 5,
        // type: "Dynamic", // 기본값은 Dynamic
        ...props
    }))
    return (
        <mesh ref={ref}>
            <boxGeometry args={args} />
            <meshBasicMaterial
                color={"blue"}
                transparent
                opacity={0.5}
            />
        </mesh>
    )
}

export default DummyBox