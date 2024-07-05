import React from 'react'
import { usePlane } from "@react-three/cannon";

export function Ground(props) {

  const [meshRef] = usePlane(
    () => ({ args: [15, 15], mass: 1, type: 'Static', ...props}),
  )

  return (
    <mesh
    {...props}
    ref={meshRef} 
    receiveShadow
    >
    <planeGeometry args={[15, 15]} />
    <meshStandardMaterial color="black" wireframe/>
    {/* 
      wireframe을 줘서 눈으로 확인하기 편함
    */}
  </mesh>
  )
}