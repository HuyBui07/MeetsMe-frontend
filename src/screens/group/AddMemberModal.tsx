import { useState } from "react";

// Components
import { Modal, View, ScrollView } from "react-native";
import CustomButton from "../../components/CustomButton";
import SearchBar from "../../components/SearchBar";
import SearchedUserTile from "../../components/SearchedUserTile";

// Types
import { User } from "../../types/StateTypes";

const AddMemberModal = ({
  closeModalFunction,
}: {
  closeModalFunction: any;
}) => {
  const [searchedUsers, setSearchedUsers] = useState([] as User[]);

  return (
    <Modal>
      <View className="h-full p-4 justify-between">
        <SearchBar setSearchedUsers={setSearchedUsers} />
        <ScrollView className="mt-2 mb-2 p-2 border-2 rounded-lg border-black bg-white">
          {searchedUsers.map((user) => (
            <SearchedUserTile key={user.id} user={user} />
          ))}
        </ScrollView>
        <CustomButton title="back" onPress={closeModalFunction} />
      </View>
    </Modal>
  );
};

export default AddMemberModal;
