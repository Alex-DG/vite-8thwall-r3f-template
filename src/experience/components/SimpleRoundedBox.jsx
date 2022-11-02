import { RoundedBox } from '@react-three/drei'

export default function SimpleRoundedBox({
  color = 'hotpink',
  smoothness = 4,
  radius = 0.08,
  args = [1, 1, 1],
  ...props
}) {
  return (
    <RoundedBox {...{ args, radius, smoothness }} {...props}>
      <meshPhongMaterial color={color} />
    </RoundedBox>
  )
}
