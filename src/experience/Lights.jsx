export default function Lights() {
  return (
    <>
      <directionalLight
        position={[5, 6, 5]}
        intensity={0.7}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-bias={-0.0001}
      />
      <ambientLight intensity={0.7} />
    </>
  )
}
