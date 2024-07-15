import { useState } from "react";
import { SignUpScreenProps } from "../types/ScreenTypes";

// Components
import { View, TextInput, Button, TouchableOpacity } from "react-native";
import CustomText from "../components/CustomText";
import CustomButton from "../components/CustomButton";

const SignUp = ({ navigation }: SignUpScreenProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const signUp = async () => {
    if (!username || !password || !confirmPassword) {
      setError("Please fill in the missing fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://10.0.2.2:5000/api/user/signup", {
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
        throw new Error(errorData.message || "Failed to sign up");
      }

      navigation.replace("Home");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <View className="flex-1 items-center justify-center px-12">
      <View className="w-full mb-10">
        <CustomText className="text-2xl">Sign Up</CustomText>
      </View>

      <View className="w-full mb-2">
        <CustomText>Username</CustomText>
      </View>
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        className="border border-gray-300 rounded p-2 w-full mb-4"
        style={{ fontFamily: "Comic-Sans" }}
      />

      <View className="w-full mb-2">
        <CustomText>Password</CustomText>
      </View>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true}
        className="border border-gray-300 rounded p-2 w-full mb-4"
        style={{ fontFamily: "Comic-Sans" }}
      />

      <View className="w-full mb-2">
        <CustomText>Confirm Password</CustomText>
      </View>
      <TextInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm Password"
        secureTextEntry={true}
        className="border border-gray-300 rounded p-2 w-full mb-5"
        style={{ fontFamily: "Comic-Sans" }}
      />

      {error && (
        <View className="w-full mb-5">
          <CustomText className="text-red-500">{error}</CustomText>
        </View>
      )}

      <CustomButton title="Sign Up" onPress={signUp}/>

      <TouchableOpacity
        onPress={() => navigation.navigate("SignIn")}
        className="mt-20"
      >
        <CustomText>Click here to sign in</CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
