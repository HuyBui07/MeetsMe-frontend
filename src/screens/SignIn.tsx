import { Text, View, TextInput, Button, TouchableOpacity } from "react-native";
import { useState } from "react";
import { SignInScreenProps } from "../types/ScreenTypes";

const SignIn = ({ navigation }: SignInScreenProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signIn = async () => {
    if (!email || !password) {
      setError("Please fill in the missing fields.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/api/user/signin", {
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
        throw new Error(errorData.message || "Failed to sign in");
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
