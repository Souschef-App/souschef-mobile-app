import { SvgProps } from "react-native-svg";

const Backgrounds = {
  curve: require("./curve.svg").default,
  // Add more mappings for other SVGs
} as const satisfies Record<string, React.FC<SvgProps>>;

export default Backgrounds;
