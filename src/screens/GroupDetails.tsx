import { useEffect, useState } from "react";
import { GroupDetailsScreenProps } from "../types/ScreenTypes";

// Components
import MeetTile from "../components/MeetTile";
import { View } from "react-native";

// Store
import { useSelector } from "react-redux";

// StateTypes
import { RootState } from "../types/StateTypes";

type Meet = {
  id: number;
  opener_name: string;
  status: string;
  title: string;
};

const GroupDetails = ({ route, navigation }: GroupDetailsScreenProps) => {
  // Accessing user's data
  const userData = useSelector((state: RootState) => state.user);

  const [meets, setMeets] = useState<Meet[]>([]);

  const groupId = route.params.groupId;

  useEffect(() => {
    fetch("http://10.0.2.2:5000/api/meet/get_all_meets?group_id=" + groupId, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + userData.accessToken,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((meetsData) => setMeets(meetsData))
      .catch((error) => {
        console.error("Failed to fetch meets:", error);
      });
  }, []);

  return (
    <View className="pt-4 px-4">
      {meets.map((meet, index) => (
        <MeetTile
          key={index}
          meetId={meet.id}
          meetOpener={meet.opener_name}
          status={meet.status}
          title={meet.title}
          groupId={groupId}
          navigation={navigation}
        />
      ))}
    </View>
  );
};

export default GroupDetails;
