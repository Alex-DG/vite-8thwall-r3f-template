import Lights from './Lights'
import Ground from './components/Ground'
import WobbleDonut from './components/WobbleDonut'
import SimpleIcosahedron from './components/SimpleIcosahedron'

export default function Scene() {
  return (
    <>
      <Lights />
      <WobbleDonut castShadow position={[-1.5, 3, 0]} />
      <SimpleIcosahedron castShadow position={[1, 0, 0]} args={[1, 0]} />
      <Ground />
    </>
  )
}
