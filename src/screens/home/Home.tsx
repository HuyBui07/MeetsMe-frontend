import { useState, useEffect } from "react";
import { HomeScreenProps } from "../../types/ScreenTypes";

// Components
import GroupTile from "../../components/GroupTile";
import CustomText from "../../components/CustomText";
import Notification from "../../components/Notification";
import { View, TouchableOpacity } from "react-native";
import InvitationsModal from "./InvitationsModal";

// Store
import { useSelector } from "react-redux";

// StateTypes
import { RootState } from "../../types/StateTypes";
import { Invitation } from "../../types/StateTypes";

type Group = {
  group_id: number;
  name: string;
};

export default function Home({ navigation }: HomeScreenProps) {
  // Accessing user's data
  const userData = useSelector((state: RootState) => state.user);

  const [groups, setGroups] = useState<Group[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [refresh, setRefresh] = useState(false);

  // Modal state
  const [isModalVisible, setIsModalVisible] = useState(false);

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

    fetch("http://10.0.2.2:5000/api/group/invitations", {
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
      .then((invitationsData) => setInvitations(invitationsData))
      .catch((error) => {
        console.error("Failed to fetch invitations:", error);
      });
  }, [refresh]);

  return (
    <View>
      <View className="h-full pt-4 px-4 justify-between">
        <View>
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

        {invitations.length > 0 && (
          <Notification
            numberOfInvites={invitations.length}
            openModal={() => setIsModalVisible(true)}
          />
        )}
      </View>
      {isModalVisible && (
        <InvitationsModal
          onClose={() => {
            setIsModalVisible(false);
            setRefresh(!refresh);
          }}
        />
      )}
    </View>
  );
}
