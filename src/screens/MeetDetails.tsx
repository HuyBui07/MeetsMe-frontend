import { useEffect, useState } from "react";
import { MeetDetailsScreenProps } from "../types/ScreenTypes";

// Components
import { View } from "react-native";

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

  const meetId = route.params.meetId;
  const groupId = route.params.groupId;

  useEffect(() => {});

  return <></>;
};

export default MeetDetails;