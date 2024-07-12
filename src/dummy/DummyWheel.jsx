import React from 'react'

const DummyWheel = ({wheelRef, radius}) => {
    return (
        <group ref={wheelRef}>
            <mesh rotation={[0, 0, Math.PI/2]}> {/* rotation값 준 이유 cylinderGeometry를 세워서 바퀴처럼 보이게 하기 위함 */}
                <cylinderGeometry args={[radius, radius, 0.025, 16]} />
                <meshNormalMaterial />
            </mesh>
        </group>
    )
}

export default DummyWheel