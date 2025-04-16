import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Perf } from 'r3f-perf'

import EightWallBridge from './EigthWallBridge'

import Scene from './Scene'

function App() {
  return (
    <Canvas shadows>
      <EightWallBridge>
        <Perf position="top-left" antialias={false} minimal />

        <Suspense fallback={'loading...'}>
          <Scene />
        </Suspense>
      </EightWallBridge>
    </Canvas>
  )
}

export default App
