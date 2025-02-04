import React from 'react'

const Picture = ({nodes, texture}) => {
  return (
    <group>
        <mesh
            geometry={nodes.picture.geometry}
            position={[0.013, 0.15, 0.21]}
            rotation={[1.57, Math.PI, 0]}
            scale={[-1.755, 0.528, 0.911]}
        >
            <meshStandardMaterial map={texture} />
        </mesh>
    </group>
  )
}

export default Picture