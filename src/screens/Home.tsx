import { Text, View } from "react-native";
import { useState, useEffect } from "react";

// Components
import GroupTile from "../components/GroupTile";

export default function Home() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchData = async (retryCount = 0) => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/user/signup", {
          method: "GET",
        });
        const groups = await response.json();
        setGroups(groups);
      } catch (error) {
        if (retryCount < 3) {
          console.error("Retry fetch groups");
          fetchData(retryCount + 1);
        } else {
          console.error("Failed to fetch data");
        }
      }
    };

    fetchData();
  }, []);

  return (
    <View className="pt-8 px-4">
      <Text>Hello Bob,</Text>
      <GroupTile />
    </View>
  );
}
