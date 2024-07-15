import { useEffect, useState } from "react";
import { View, TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";

// Types
import { User } from "../types/StateTypes";
import { RootState } from "../types/StateTypes";

// Redux
import { useSelector } from "react-redux";

const SearchBar = ({ setSearchedUsers }: { setSearchedUsers: any }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const accessToken = useSelector((state: RootState) => state.user.accessToken);

  useEffect(() => {
    if (searchTerm.length > 0) {
      fetch(`http://10.0.2.2:5000/api/user/search?query=${searchTerm}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setSearchedUsers(data as User[]));
    }
    if (searchTerm.length === 0) {
      setSearchedUsers([]);
    }
  }, [searchTerm]);

  return (
    <View className="flex-row w-full h-12 justify-between items-center pl-2 pr-2 border-2 rounded-lg border-black bg-white">
      <TextInput
        className="flex-1 h-full"
        placeholder="Search"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <AntDesign name="search1" size={20} color="black" />
    </View>
  );
};

export default SearchBar;
