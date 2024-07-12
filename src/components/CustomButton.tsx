import { TouchableOpacity, Text, ButtonProps } from "react-native";

const CustomButton: React.FC<ButtonProps> = ({ title, ...props }) => {
  return (
    <TouchableOpacity
      className="h-20 w-full justify-center items-center pl-2 border-2 rounded-lg border-black bg-white hover:bg-gray-500"
      {...props}
    >
      <Text className="font-bold text-lg">{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
