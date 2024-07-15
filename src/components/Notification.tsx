import { TouchableOpacity } from "react-native";
import CustomText from "./CustomText";
import { Ionicons } from "@expo/vector-icons";

const Notification = ({
  numberOfInvites,
  openModal,
}: {
  numberOfInvites: number;
  openModal: any;
}) => {
  return (
    <TouchableOpacity
      className="flex-row h-20 w-full mb-4 justify-center items-center space-x-2 pl-2 border-2 rounded-lg border-black bg-white hover:bg-gray-500"
      onPress={openModal}
    >
      <Ionicons name="notifications" size={24} color="black" />
      <CustomText>You have {numberOfInvites} new invites!</CustomText>
    </TouchableOpacity>
  );
};

export default Notification;
