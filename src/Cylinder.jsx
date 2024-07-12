import React, { useState } from 'react'
import { useCylinder } from "@react-three/cannon";

export function Cylinder(props) {

  const [meshRef, api] = useCylinder( // meshRef three.js 메서드나 속성에 접근할 수 있음
    () => ({ args: [0.5, 0.5, 1, 8], mass: 1, ...props }),
  )

  const [hovered, setHover] = useState(false)

  return (
    <mesh
      {...props}
        ref={meshRef}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        onPointerDown={() => api.velocity.set(0, 5, 0)} // velocity : 위치 조정가능
      >
      <cylinderGeometry args={[0.5, 0.5, 1, 8]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}