import Lights from './Lights'
import Ground from './components/Ground'
import SimpleBox from './components/SimpleBox'
import SimpleIcosahedron from './components/SimpleIcosahedron'

export default function Scene() {
  return (
    <>
      <Lights />
      <SimpleBox
        castShadow
        position={[-1, 0, 0]}
        args={[1, 1, 1, 6, 6, 6]}
        wireframe
      />
      <SimpleIcosahedron castShadow position={[1, 0, 0]} args={[1, 0]} />
      <Ground />
    </>
  )
}
