import Svg, { Rect } from "react-native-svg";
import { useColors } from "../../theme";

type WaveIconProps = {
  size?: number;
  color?: string;
};

const BARS = [
  { x: 0, h: 8 },
  { x: 6, h: 16 },
  { x: 12, h: 24 },
  { x: 18, h: 14 },
  { x: 24, h: 8 },
];

export default function WaveIcon({ size = 24, color }: WaveIconProps) {
  const palette = useColors();
  const fill = color ?? palette.purple;
  return (
    <Svg width={size} height={size} viewBox="0 0 28 24" fill="none">
      {BARS.map((bar) => (
        <Rect
          key={bar.x}
          x={bar.x}
          y={(24 - bar.h) / 2}
          width={4}
          height={bar.h}
          rx={2}
          fill={fill}
        />
      ))}
    </Svg>
  );
}
