import { Icosahedron } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

// Color palette
const colors = [
  new THREE.Color('#FF69B4'), // hot pink
  new THREE.Color('#00fff5'), // cyan
]

const SimpleIcosahedron = ({ args = [1, 1], ...props }) => {
  const icoRef = useRef()
  const materialRef = useRef()
  const colorIndex = useRef(2) // Start from cyan to alternate with box
  const lerpFactor = useRef(0)

  useFrame(({ clock }) => {
    // Icosahedron movement animation
    const amplitude = 1
    const baseHeight = 1
    const frequency = 0.5
    const time = clock.getElapsedTime() // No offset needed, this is our reference motion

    icoRef.current.position.y =
      baseHeight + Math.abs(Math.sin(time * frequency)) * amplitude

    // Add some gentle wobble - opposite direction to box
    icoRef.current.rotation.x += 0.005
    icoRef.current.rotation.y -= 0.01 // Opposite direction
    icoRef.current.rotation.z += 0.002

    // Color transition animation - started from different color
    lerpFactor.current += 0.005
    if (lerpFactor.current >= 1) {
      lerpFactor.current = 0
      colorIndex.current = (colorIndex.current + 1) % colors.length
    }

    const currentColor = colors[colorIndex.current]
    const nextColor = colors[(colorIndex.current + 1) % colors.length]

    materialRef.current.color
      .copy(currentColor)
      .lerp(nextColor, lerpFactor.current)
    materialRef.current.emissive
      .copy(materialRef.current.color)
      .multiplyScalar(0.8)
  })

  return (
    <Icosahedron ref={icoRef} args={args} castShadow {...props}>
      <meshStandardMaterial
        ref={materialRef}
        roughness={0.1}
        metalness={0.3}
        emissive={colors[2]} // Start from cyan to match colorIndex
        emissiveIntensity={1}
        toneMapped={false}
      />
    </Icosahedron>
  )
}

export default SimpleIcosahedron
