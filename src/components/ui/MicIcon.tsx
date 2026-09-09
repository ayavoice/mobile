import Svg, { Line, Path, Rect } from "react-native-svg";
import { useColors } from "../../theme";

type MicIconProps = {
  size?: number;
  color?: string;
};

export default function MicIcon({ size = 52, color }: MicIconProps) {
  const palette = useColors();
  const fill = color ?? palette.purple;
  const width = size * 0.55;
  return (
    <Svg width={width} height={size} viewBox="0 0 22 40" fill="none">
      <Rect x={4} y={0} width={14} height={24} rx={7} fill={fill} />
      <Path
        d="M1 20C1 27.18 7.37 33 11 33C14.63 33 21 27.18 21 20"
        stroke={fill}
        strokeWidth={2.5}
        strokeLinecap="round"
        fill="none"
      />
      <Line
        x1={11}
        y1={33}
        x2={11}
        y2={40}
        stroke={fill}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <Line
        x1={6}
        y1={40}
        x2={16}
        y2={40}
        stroke={fill}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}
