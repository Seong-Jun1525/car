import React, { useRef } from 'react'
import { Html, useGLTF, useTexture } from '@react-three/drei'
import Picture from './Picture'
import { useBox } from '@react-three/cannon'
import { motion } from 'framer-motion-3d'
import { useRecoilValue } from 'recoil'
import { stageOne } from '../utils/atom'
import BoxDrop from './BoxDrop'

const MotionStageTwo = ({position}) => {
    const { nodes, materials } = useGLTF('/assets/models/popup.glb')
    const texture = useTexture('/assets/images/info.jpg')
    const stage = useRecoilValue(stageOne)
  
    const [ref] = useBox(() => ({
      args: [1, 1, 0.3],
      position,
      type: 'Static',
      rotation: [0, Math.PI/2, 0]
    }), useRef(null))
  
    const x = position[0]
    const y = position[1]
    const z = position[2]
  
    return (
      <group>
        <mesh position={[x + 1, y - 0.53, z]} rotation={[-Math.PI/2, 0, 0]}>
            <planeGeometry args={[1, 1]} />
            <meshStandardMaterial
                color='hotpink'
                transparent
                opacity={0.8}
            />
        </mesh>
        <group ref={ref} scale={0.3}>
          <mesh geometry={nodes.body.geometry} material={materials.Material} position={[0.004, 0.15, 0.065]} scale={[1.957, -1.036, 0.135]} />
          <Picture nodes={nodes} texture={texture} />
        </group>
        <BoxDrop />
      </group>
    )
}

export default MotionStageTwo