import { useEffect, useState, useLayoutEffect } from "react";
import { GroupDetailsScreenProps } from "../../types/ScreenTypes";

// Components
import MeetTile from "../../components/MeetTile";
import { View } from "react-native";
import GroupMemberModal from "./GroupMemberModal";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

// Store
import { useSelector, useDispatch } from "react-redux";

// StateTypes
import { Member, RootState } from "../../types/StateTypes";
import { openModal, setSelectedGroup } from "../../store/groupMemberModalSlice";

type Meet = {
  id: number;
  opener_name: string;
  status: string;
  title: string;
};

const GroupDetails = ({ route, navigation }: GroupDetailsScreenProps) => {
  const dispatch = useDispatch();

  // Accessing user's data
  const userData = useSelector((state: RootState) => state.user);
  const isModalVisible = useSelector(
    (state: RootState) => state.groupMemberModal.isOpen
  );

  const [meets, setMeets] = useState<Meet[]>([]);

  const groupId = route.params.groupId;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => dispatch(openModal())}>
          <FontAwesome name="group" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

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

    fetch(
      "http://10.0.2.2:5000/api/group/get_group_members?group_id=" + groupId,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + userData.accessToken,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((meetsData) =>
        dispatch(
          setSelectedGroup({
            group_id: groupId,
            members: meetsData as Member[],
          })
        )
      )
      .catch((error) => {
        console.error("Failed to fetch members:", error);
      });
  }, []);

  return (
    <>
      {isModalVisible && <GroupMemberModal />}
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
    </>
  );
};

export default GroupDetails;
