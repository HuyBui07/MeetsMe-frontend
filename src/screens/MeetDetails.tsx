import { useEffect, useState } from "react";
import { MeetDetailsScreenProps } from "../types/ScreenTypes";

// Components
import { View, Text } from "react-native";
import CustomText from "../components/CustomText";
import CustomButton from "../components/CustomButton";

// Store
import { useSelector } from "react-redux";

// StateTypes
import { RootState } from "../types/StateTypes";

type MeetDetails = {
  date: string;
  id: number;
  location: string;
  opener_name: string;
  status: string;
  time: string;
  title: string;
};

const MeetDetails = ({ route }: MeetDetailsScreenProps) => {
  // Accessing user's data
  const userData = useSelector((state: RootState) => state.user);

  const [meetDetails, setMeetDetails] = useState<MeetDetails>();
  const [attendees, setAttendees] = useState<string[]>([]);

  const meetId = route.params.meetId;
  const groupId = route.params.groupId;

  useEffect(() => {
    const params = "?group_id=" + groupId + "&meet_id=" + meetId;
    fetch("http://10.0.2.2:5000/api/meet/get_meet_details" + params, {
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
      .then((meetData) => setMeetDetails(meetData));

    fetch("http://10.0.2.2:5000/api/meet/get_all_attendees?meet_id=" + meetId, {
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
      .then((attendeesData) => setAttendees(attendeesData))
      .catch((error) => {
        console.error("Failed to fetch attendees:", error);
      });
  }, []);

  const meetAccept = async () => {
    const response = await fetch("http://10.0.2.2:5000/api/meet/accept", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + userData.accessToken,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  };

  return (
    <View className="px-4 pt-2">
      <CustomText className="mt-2 text-lg">
        <Text className="font-bold">Title:</Text> {meetDetails?.title}
      </CustomText>
      <CustomText className="mt-2 text-lg">
        <Text className="font-bold">Opener:</Text> {meetDetails?.opener_name}
      </CustomText>
      <CustomText className="mt-2 text-lg">
        <Text className="font-bold">Date:</Text> {meetDetails?.date}
      </CustomText>
      <CustomText className="mt-2 text-lg">
        <Text className="font-bold">Time:</Text> {meetDetails?.time}
      </CustomText>
      <CustomText className="mt-2 text-lg">
        <Text className="font-bold">Location:</Text> {meetDetails?.location}
      </CustomText>
      <CustomText className="mt-2 text-lg">
        <Text className="font-bold">Status:</Text> {meetDetails?.status}
      </CustomText>
      <CustomText className="mt-2 text-lg">
        <Text className="font-bold">Attendees:</Text>
        {attendees.length !== 0
          ? attendees.map((attendee, index) => (
              <Text key={index}> {attendee}</Text>
            ))
          : " No attendees yet"}
      </CustomText>
      {meetDetails && meetDetails.status !== "closed" && (
        <CustomButton title="Accept" onPress={meetAccept} />
      )}
    </View>
  );
};

export default MeetDetails;
