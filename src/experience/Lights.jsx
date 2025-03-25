export default function Lights() {
  return (
    <>
      <directionalLight
        position={[5, 5, 5]}
        intensity={2}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={20}
      />
      <ambientLight intensity={0.5} />
    </>
  )
}
