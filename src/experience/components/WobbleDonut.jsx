import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshWobbleMaterial } from '@react-three/drei'
import * as THREE from 'three'

const WobbleDonut = ({ args = [1, 0.4, 16, 32], ...props }) => {
  const meshRef = useRef()
  const clock = useRef(new THREE.Clock())

  useFrame(() => {
    meshRef.current.rotation.y += 0.01
    meshRef.current.rotation.z -= 0.05
    meshRef.current.rotation.x -= 0.01
  })

  return (
    <mesh ref={meshRef} {...props}>
      <torusGeometry args={args} />
      <MeshWobbleMaterial
        factor={0.6}
        speed={1}
        color="hotpink"
        roughness={1}
        metalness={0.0}
      />
    </mesh>
  )
}

export default WobbleDonut
