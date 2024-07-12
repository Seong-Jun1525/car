import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useSphere } from '@react-three/cannon'
import { useControls } from 'leva'

useGLTF.preload('/assets/models/ball.glb')

export function Ball(props) {
  const { nodes, materials } = useGLTF('/assets/models/ball.glb')

  // leva라이브러리 사용
  const ballValue = useControls('ballValue', {
      x: {value : 0, min: -3, max: 3}, 
      y: {value : 0, min: -3, max: 3}, 
      z: {value : 0, min: -3, max: 3}, 
  })

  const [ref] = useSphere(() => ({
    args: [0.15],
    mass: 5,
    ...props
  }), useRef(null))

  return (
    <group ref={ref}>
      <group
        scale={0.15}
        // position={[ballValue.x, ballValue.y, ballValue.z]} // leva 라이브러리로 위치잡고 아래처럼 위치 설정
        position={[0, -0.153, -0.004]}
      >
        <mesh geometry={nodes.beach_ball_red_0_1.geometry} material={materials.material} />
        <mesh geometry={nodes.beach_ball_red_0_2.geometry} material={materials.blue} />
        <mesh geometry={nodes.beach_ball_red_0_3.geometry} material={materials.white} />
        <mesh geometry={nodes.beach_ball_red_0_4.geometry} material={materials.yellow} />
      </group>
    </group>
  )
}