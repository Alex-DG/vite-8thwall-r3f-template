export default function Lights() {
  return (
    <>
      <directionalLight position={[0, 3, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />
    </>
  )
}
