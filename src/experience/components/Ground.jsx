const Ground = () => {
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[400, 400]} />
      <shadowMaterial opacity={0.5} />
    </mesh>
  )
}

export default Ground
