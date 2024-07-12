import { useState } from "react";

// Components
import { Modal, ScrollView, TouchableOpacity, View } from "react-native";
import CustomButton from "../../components/CustomButton";
import MemberTile from "../../components/MemberTile";
import { AntDesign } from "@expo/vector-icons";
import AddMemberModal from "./AddMemberModal";

// Store
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../types/StateTypes";
import { closeModal } from "../../store/groupMemberModalSlice";

const GroupMemberModal = () => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const members = useSelector(
    (state: RootState) => state.groupMemberModal.members
  );

  const handleAddUser = () => {
    setIsModalOpen(true);
  };

  return (
    <Modal>
      {isModalOpen && (
        <AddMemberModal closeModalFunction={() => setIsModalOpen(false)} />
      )}

      <View className="h-full p-4 justify-between">
        <ScrollView>
          {members &&
            members.map((member, index) => (
              <MemberTile key={index} member={member} />
            ))}
          <TouchableOpacity
            className="flex-row h-10 w-full mt-2 justify-center items-center pl-2 border-2 rounded-lg border-black bg-white hover:bg-gray-500"
            onPress={handleAddUser}
          >
            <AntDesign name="addusergroup" size={24} color="black" />
          </TouchableOpacity>
        </ScrollView>

        <CustomButton title="Close" onPress={() => dispatch(closeModal())} />
      </View>
    </Modal>
  );
};

export default GroupMemberModal;
