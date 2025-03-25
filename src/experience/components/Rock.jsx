import React from 'react'
import { useGLTF } from '@react-three/drei'

const url = '/models/rock-v1.glb'

const Rock = (props) => {
  const { nodes, materials } = useGLTF(url)

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        geometry={nodes.defaultMaterial.geometry}
        material={materials.DefaultMaterial}
      />
    </group>
  )
}

useGLTF.preload(url)

export default Rock
