import { Modal, View, ScrollView } from "react-native";
import CustomButton from "../../components/CustomButton";
import SearchBar from "../../components/SearchBar";

const AddMemberModal = ({
  closeModalFunction,
}: {
  closeModalFunction: any;
}) => {
  return (
    <Modal>
      <View className="h-full p-4 justify-between">
        <SearchBar />
        <ScrollView className="mt-2 mb-2 border-2 rounded-lg border-black bg-white"></ScrollView>
        <CustomButton title="back" onPress={closeModalFunction} />
      </View>
    </Modal>
  );
};

export default AddMemberModal;
