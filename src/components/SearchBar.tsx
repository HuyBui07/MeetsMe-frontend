import { useState } from "react";
import { View, TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <View className="flex-row w-full h-12 justify-between items-center pl-2 pr-2 border-2 rounded-lg border-black bg-white">
      <TextInput
        className="flex-row h-full"
        placeholder="Search"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <AntDesign name="search1" size={20} color="black" />
    </View>
  );
};

export default SearchBar;
