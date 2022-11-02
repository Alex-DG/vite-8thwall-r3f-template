export default function Lights() {
  return (
    <>
      <directionalLight position={[0, 2, 2]} intensity={1.4} />
      <ambientLight intensity={0.5} />
    </>
  )
}
