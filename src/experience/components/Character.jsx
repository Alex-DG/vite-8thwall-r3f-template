import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

const url = '/models/AnimationLibrary_Godot_Standard.glb'

const Character = (props, animation = 'Push_Loop') => {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF(url)
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    // Start the animation
    if (actions[animation]) {
      actions[animation].reset().fadeIn(0.5).play()
    }
    return () => {
      // Cleanup: fade out animation when component unmounts
      if (actions[animation]) {
        actions[animation].fadeOut(0.5)
      }
    }
  }, [actions])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Rig" position={[-0.001, -0.014, 0]}>
          <group name="Mannequin">
            <skinnedMesh
              name="Mannequin_1"
              geometry={nodes.Mannequin_1.geometry}
              material={materials.M_Main}
              skeleton={nodes.Mannequin_1.skeleton}
              castShadow
            />
            <skinnedMesh
              name="Mannequin_2"
              geometry={nodes.Mannequin_2.geometry}
              material={materials.M_Joints}
              skeleton={nodes.Mannequin_2.skeleton}
              castShadow
            />
          </group>
          <primitive object={nodes.root} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload(url)

export default Character
