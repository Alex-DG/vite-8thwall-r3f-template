import { Box, ContactShadows } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

export default function SimpleBox({ args = [1, 1, 1], ...props }) {
  const boxRef = useRef()

  useFrame(({ clock }) => {
    boxRef.current.position.y = Math.sin(clock.getElapsedTime() * 1.8) + 1.5
    boxRef.current.rotation.y += 0.02
  }, [])
  return (
    <>
      <Box ref={boxRef} args={args} {...props}>
        <meshNormalMaterial />
      </Box>

      <ContactShadows
        opacity={0.8}
        scale={10}
        blur={1}
        far={6}
        resolution={512}
        color="#000000"
      />
    </>
  )
}
