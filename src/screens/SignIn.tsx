import { Text, View, TextInput, Button, TouchableOpacity } from "react-native";
import { useState } from "react";
import { SignInScreenProps } from "../types/ScreenTypes";

// Store
import { useDispatch } from "react-redux";
import { setUser } from "../store/userDataSlice";

const SignIn = ({ navigation }: SignInScreenProps) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signIn = async () => {
    setError("");
    if (!username || !password) {
      setError("Please fill in the missing fields.");
      return;
    }

    try {
      const response = await fetch("http://10.0.2.2:5000/api/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.status === 401) {
        const errorData = await response.json();
        setError(errorData.message);
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to sign in");
      }

      const responseData = await response.json();
      const token = responseData.accessToken;

      dispatch(setUser({ username: username, accessToken: token }));
      navigation.replace("Home");
    } catch (error: any) {
      setError(error.message);
      console.log(error.message);
    }
  };

  return (
    <View className="flex-1 items-center justify-center">
      <Text>SignIn</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Email"
        className="border border-gray-300 rounded p-2 w-64"
      />

      <Text>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true}
        className="border border-gray-300 rounded p-2 w-64"
      />

      {error && <Text className="text-red-500">{error}</Text>}

      <Button title="Sign in" onPress={signIn} />

      <TouchableOpacity onPress={signIn}>
        <Text>Click here to sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;
