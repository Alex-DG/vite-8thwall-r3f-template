import { RoundedBox } from '@react-three/drei'

export default function SimpleRoundedBox({
  color = 'hotpink',
  smoothness = 4,
  radius = 0.08,
  size = [1, 1, 1],
  ...props
}) {
  return (
    <RoundedBox args={size} {...{ radius, smoothness }} {...props}>
      <meshPhongMaterial color={color} />
    </RoundedBox>
  )
}
