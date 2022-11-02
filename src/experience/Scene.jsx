import { Perf } from 'r3f-perf'

import Lights from './Lights'

import SimpleRoundedBox from './components/SimpleRoundedBox'

export default function Scene() {
  return (
    <>
      <Perf position="top-left" />

      <SimpleRoundedBox />
      <Lights />
    </>
  )
}
