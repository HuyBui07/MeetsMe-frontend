import { useState } from "react";
import { SignInScreenProps } from "../types/ScreenTypes";

// Store
import { useDispatch } from "react-redux";
import { setUser } from "../store/userDataSlice";

// Components
import { View, TextInput, TouchableOpacity } from "react-native";
import CustomText from "../components/CustomText";
import CustomButton from "../components/CustomButton";

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
    <View className="flex-1 items-center justify-center px-12">
      <View className="w-full mb-5">
        <CustomText className="text-2xl">Sign In</CustomText>
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
        className="border border-gray-300 rounded p-2 w-full mb-5"
        style={{ fontFamily: "Comic-Sans" }}
      />

      {error && (
        <View className="w-full mb-5">
          <CustomText className="text-red-500">{error}</CustomText>
        </View>
      )}
      <CustomButton title="Sign in" onPress={signIn} />

      <TouchableOpacity
        onPress={() => navigation.navigate("SignUp")}
        className="mt-20"
      >
        <CustomText>Click here to sign up</CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;
