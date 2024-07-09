import { View } from "react-native";
import { useState, useEffect } from "react";
import { HomeScreenProps } from "../types/ScreenTypes";

// Components
import GroupTile from "../components/GroupTile";
import CustomText from "../components/CustomText";

// Store
import { useSelector } from "react-redux";

// StateTypes
import { RootState } from "../types/StateTypes";

type Group = {
  group_id: number;
  name: string;
};

export default function Home({ navigation }: HomeScreenProps) {
  // Accessing user's data
  const userData = useSelector((state: RootState) => state.user);

  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    fetch("http://10.0.2.2:5000/api/group/get_all_groups", {
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
      .then((groupsData) => setGroups(groupsData))
      .catch((error) => {
        console.error("Failed to fetch groups:", error);
      });
  }, []);

  return (
    <View className="pt-8 px-4">
      <CustomText>Hello Bob,</CustomText>
      {groups.map((group, index) => (
        <GroupTile
          key={index}
          groupId={group.group_id}
          name={group.name}
          navigation={navigation}
        />
      ))}
    </View>
  );
}
