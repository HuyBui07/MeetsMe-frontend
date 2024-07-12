// Components
import { View } from "react-native";
import CustomText from "./CustomText";
import { AntDesign } from "@expo/vector-icons";

// Type
import { Member } from "../types/StateTypes";

const MemberTile = ({ member }: { member: Member }) => {
  const handleDeleteUser = async () => {
    console.log("Delete user");
    // Implement delete user
  };

  return (
    <View className="flex-row h-10 w-full mt-2 justify-between items-center pl-2 border-2 rounded-lg border-black bg-white hover:bg-gray-500">
      <CustomText>{member.member_name}</CustomText>
      <AntDesign
        name="deleteusergroup"
        size={24}
        color="black"
        onPress={handleDeleteUser}
      />
    </View>
  );
};

export default MemberTile;
