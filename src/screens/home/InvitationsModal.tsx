import { useEffect, useState } from "react";

// Redux
import { useSelector } from "react-redux";

// Components
import { Modal, ScrollView, View } from "react-native";
import CustomButton from "../../components/CustomButton";
import { ReceivedInvitation, RootState } from "../../types/StateTypes";
import InvitationTile from "./InvitationTile";

const InvitationModal = ({ onClose }: { onClose: any }) => {
  const [invitations, setInvitations] = useState<ReceivedInvitation[]>([]);

  const userData = useSelector((state: RootState) => state.user);

  useEffect(() => {
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
      .then((invitationsData) => {
        setInvitations(invitationsData);
      })
      .catch((error) => {
        console.error("Failed to fetch invitations:", error);
      });
  }, []);

  return (
    <Modal>
      <View className="h-full justify-between p-2">
        <ScrollView>
          {invitations.map((invitation) => (
            <InvitationTile key={invitation.group_id} invitation={invitation} />
          ))}
        </ScrollView>
        <CustomButton title="Close" onPress={onClose} />
      </View>
    </Modal>
  );
};

export default InvitationModal;
