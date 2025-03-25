import { Box } from '@react-three/drei'
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

const SimpleBox = ({ args = [1, 1, 1], ...props }) => {
  const boxRef = useRef()
  const clock = useRef(new THREE.Clock())
  const color = useRef(new THREE.Color())
  const baseHeight = 1
  const amplitude = 0.5

  // Set initial color
  color.current.setHSL(0, 1, 0.5)

  useFrame(() => {
    const currentTime = clock.current.getElapsedTime()
    const frequency = 0.6
    const timeOffset = Math.PI / frequency
    const adjustedTime = currentTime + timeOffset
    boxRef.current.position.y =
      baseHeight + Math.abs(Math.sin(adjustedTime * frequency)) * amplitude

    boxRef.current.rotation.y += 0.01

    // Update color
    color.current.setHSL(currentTime * 0.1, 1, 0.5)
    boxRef.current.material.color = color.current
    boxRef.current.material.emissive = color.current
    boxRef.current.material.emissiveIntensity = 0.6
  })

  return (
    <Box ref={boxRef} args={args} castShadow {...props}>
      <meshStandardMaterial
        color={color.current}
        roughness={0.1}
        metalness={0.3}
        emissive={color.current}
        emissiveIntensity={0.8}
        toneMapped={false}
        wireframe={props.wireframe}
      />
    </Box>
  )
}

export default SimpleBox
