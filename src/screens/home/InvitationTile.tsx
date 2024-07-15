import { useState } from "react";

// Components
import { TouchableOpacity, View } from "react-native";
import { ReceivedInvitation, RootState } from "../../types/StateTypes";
import CustomText from "../../components/CustomText";
import { AntDesign } from "@expo/vector-icons";

// Redux
import { useSelector } from "react-redux";

const InvitationTile = ({ invitation }: { invitation: ReceivedInvitation }) => {
  const accessToken = useSelector((state: RootState) => state.user.accessToken);

  const [isResponsed, setIsResponsed] = useState(false);

  const invitationResponse = async (response: boolean) => {
    const responseString = response ? "accept" : "reject";

    fetch("http://10.0.2.2:5000/api/group/response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        group_id: invitation.group_id,
        response: responseString,
      }),
    })
      .then((response) => {
        if (response.ok) {
          setIsResponsed(true);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return isResponsed ? null : (
    <View className="flex-row h-20 w-full mt-2 justify-center items-center space-x-7 pl-2 border-2 rounded-lg border-black bg-white">
      <CustomText>
        You've been invited to join {invitation.group_name}!
      </CustomText>
      <View className="flex-row space-x-3">
        <TouchableOpacity onPress={() => invitationResponse(true)}>
          {<AntDesign name="checkcircleo" size={24} color="black" />}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => invitationResponse(false)}>
          <AntDesign name="closecircleo" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InvitationTile;
