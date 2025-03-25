import { Canvas } from '@react-three/fiber'
import { Perf } from 'r3f-perf'

import EightWallBridge from './EigthWallBridge'

import Scene from './Scene'

function App() {
  return (
    <Canvas shadows>
      <EightWallBridge>
        <Perf position="top-left" antialias={false} minimal />
        <Scene />
      </EightWallBridge>
    </Canvas>
  )
}

export default App
