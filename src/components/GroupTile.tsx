import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Components
import CustomText from "./CustomText";
import GroupDetails from "../screens/GroupDetails";

const GroupTile = ({
  groupId,
  name,
  navigation,
}: {
  groupId: number;
  name: string;
  navigation: any;
}) => {
  return (
    <TouchableOpacity
      className="h-20 w-full mt-2 justify-center pl-2 border-2 rounded-lg border-black bg-white hover:bg-gray-500"
      onPress={() => {
        navigation.navigate("GroupDetails", {
          groupId: groupId,
          groupName: name,
        });
      }}
    >
      <CustomText className="font-bold">{name}</CustomText>
    </TouchableOpacity>
  );
};

export default GroupTile;
