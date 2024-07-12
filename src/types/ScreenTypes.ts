import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Home: undefined;
  GroupDetails: { groupId: number; groupName: string };
  MeetDetails: { meetId: number; groupId: number; meetName: string };
};

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Home"
>;

export type GroupDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "GroupDetails"
>;

export type MeetDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "MeetDetails"
>;

export type SignInScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "SignIn"
>;

export type SignUpScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "SignUp"
>;
