import { Canvas } from '@react-three/fiber'

import EightWallBridge from './EigthWallBridge'

import Scene from './Scene'

function App() {
  return (
    <Canvas>
      <EightWallBridge>
        <Scene />
      </EightWallBridge>
    </Canvas>
  )
}

export default App
