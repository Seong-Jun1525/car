import React, { useEffect, useState } from 'react'
import { useBox } from "@react-three/cannon";

export function Box(props) {

  const [meshRef, api] = useBox( // meshRef three.js 메서드나 속성에 접근할 수 있음
    () => ({ args: [1, 1, 1], mass: 1, ...props }),
  )

  useEffect(() => {
    console.log(meshRef)
    console.log(api)
  }, [meshRef])

  const [hovered, setHover] = useState(false)

  return (
    <mesh
      {...props}
      ref={meshRef}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onPointerDown={() => api.velocity.set(0, 5, 0)} // velocity : 위치 조정가능
      >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}