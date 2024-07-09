import { Text, TextProps } from "react-native";

const CustomText: React.FC<TextProps> = ({ children, style, ...props }) => (
  <Text style={[{ fontFamily: "Comic-Sans" }, style]} {...props}>
    {children}
  </Text>
);

export default CustomText
