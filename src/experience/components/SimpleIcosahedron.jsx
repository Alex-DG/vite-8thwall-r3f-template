import { Icosahedron } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

// Color palette
const colors = [
  new THREE.Color('#ff0055'), // neon pink
  new THREE.Color('#FF69B4'), // hot pink
  new THREE.Color('#00fff5'), // cyan
  new THREE.Color('#7700ff'), // purple
  new THREE.Color('#ffff00'), // yellow
]

const SimpleIcosahedron = ({ args = [1, 1], ...props }) => {
  const icoRef = useRef()
  const clock = useRef(new THREE.Clock())
  const color = useRef(new THREE.Color())
  const baseHeight = 1.5
  const amplitude = 1

  // Set initial color
  color.current.setHSL(0.5, 1, 0.5)

  useFrame(() => {
    const time = clock.current.getElapsedTime()
    const frequency = 0.8
    icoRef.current.position.y =
      baseHeight + Math.abs(Math.sin(time * frequency)) * amplitude

    icoRef.current.rotation.z += 0.01
    icoRef.current.rotation.x += 0.01

    // Update color
    color.current.setHSL(time * 0.1 + 0.5, 1, 0.5)
    icoRef.current.material.color = color.current
    icoRef.current.material.emissive = color.current
    icoRef.current.material.emissiveIntensity = 0.6
  })

  return (
    <Icosahedron ref={icoRef} args={args} castShadow {...props}>
      <meshStandardMaterial
        color={color.current}
        roughness={0.1}
        metalness={0.6}
        emissive={color.current}
        emissiveIntensity={0.8}
        toneMapped={false}
      />
    </Icosahedron>
  )
}

export default SimpleIcosahedron
