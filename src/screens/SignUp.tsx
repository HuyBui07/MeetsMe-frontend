import { Text, View, TextInput, Button, TouchableOpacity } from "react-native";
import { useState } from "react";
import { SignUpScreenProps } from "../types/ScreenTypes";

const SignUp = ({ navigation }: SignUpScreenProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const signUp = async () => {
    if (!email || !password || !confirmPassword) {
      setError("Please fill in the missing fields.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
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
    } catch (error: any) {
      setError(error.message);
    } finally {
      navigation.navigate("Home");
    }
  };

  return (
    <View className="flex-1 items-center justify-center">
      <Text>SignIn</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        className="border border-gray-300 rounded p-2 w-64"
      />

      <Text>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        className="border border-gray-300 rounded p-2 w-64"
      />

      <Text>Confirm Password</Text>
      <TextInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm Password"
        className="border border-gray-300 rounded p-2 w-64"
      />

      {error && <Text className="text-red-500">{error}</Text>}

      <Button title="Sign in" onPress={signUp} />

      <TouchableOpacity onPress={signUp}>
        <Text>Click here to sign in</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
