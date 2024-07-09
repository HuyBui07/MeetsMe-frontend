import { TouchableOpacity } from "react-native";
import CustomText from "./CustomText";

const MeetTile = ({
  meetId,
  meetOpener,
  status,
  title,
  groupId,
  navigation,
}: {
  meetId: number;
  meetOpener: string;
  status: string;
  title: string;
  groupId: number;
  navigation: any;
}) => {
  return (
    <TouchableOpacity
      className="h-20 w-full mt-2 justify-center pl-2 border-2 rounded-lg border-black bg-white hover:bg-gray-500"
      onPress={() => {
        navigation.navigate("MeetDetails", { meetId: meetId, groupId: groupId});
      }}
    >
      <CustomText>
        {title} - {meetOpener}
      </CustomText>
    </TouchableOpacity>
  );
};

export default MeetTile;
