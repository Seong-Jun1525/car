import React, { useEffect, useRef, useState } from 'react'
import { Html, useGLTF } from '@react-three/drei'
import { useBox } from '@react-three/cannon'
import { motion } from 'framer-motion-3d'

useGLTF.preload('/assets/models/tree.glb')

export function Tree(props) {
  const { nodes, materials } = useGLTF('/assets/models/tree.glb')
  const [info, setInfo] = useState(false)
  // 물리엔진 적용
  const [ref, api] = useBox(() => ({
    args: [0.3, 1, 0.3],
    // type: 'Kinematic',
    type: 'Static',
    // onCollide: () => console.log('충돌'),
    onCollide: handleCollision,
    ...props
  }), useRef(null))

  // 충돌 메서드
  const handleCollision = (e) => {
    console.log(e, '이벤트')
    if(e.collisionFilters.bodyFilterGroup === 5) {
      // api.velocity.set(0, 1, 0)
      setInfo(true)
    }
  }

  useEffect(() => {
    let timeout
    if(info) {
      timeout = setTimeout(() => setInfo(false), 1000)
    }
    return () => clearTimeout(timeout)
  }, [info])

  return (
    <group ref={ref}>
      <motion.mesh
        scale={0.2}
        geometry={nodes.tree.geometry}
        material={materials['Material.003']}
        position={[0, 0, 0]}
        rotation={[-1.555, 0, 0]}
        animate={{scale: [0, 0.2], y: [-1, 0]}}
        transition={{ delay: 1, duration: 0.3}}
      />
      {info && 
        <Html center>
          <div className='information'>
            "이것은 나무입니다."
          </div>
        </Html>
      }
    </group>
  )
}