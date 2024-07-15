import { useState } from "react";

// Components
import { View } from "react-native";
import CustomText from "./CustomText";
import { AntDesign } from "@expo/vector-icons";

// Type
import { User } from "../types/StateTypes";
import { RootState } from "../types/StateTypes";

// Redux
import { useSelector } from "react-redux";

const SearchedUserTile = ({ user }: { user: User }) => {
  // Get states from redux
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const selectedGroupId = useSelector(
    (state: RootState) => state.groupMemberModal.group_id
  );

  const [invited, setInvited] = useState(false);

  const handleInviteUser = async () => {
    fetch("http://10.0.2.2:5000/api/group/invite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        receiver_id: user.id,
        group_id: selectedGroupId,
      }),
    })
      .then((response) => {
        if (response.ok) {
          setInvited(true);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <View className="flex-row h-10 w-full mt-2 justify-between items-center pl-2 border-2 rounded-lg border-black bg-white hover:bg-gray-500">
      <CustomText>{user.username}</CustomText>
      {invited ? (
        <AntDesign name="check" size={24} color="black" />
      ) : (
        <AntDesign
          name="adduser"
          size={24}
          color="black"
          onPress={handleInviteUser}
        />
      )}
    </View>
  );
};

export default SearchedUserTile;
