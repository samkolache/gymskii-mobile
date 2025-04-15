import { Text, View } from "react-native";
import { Link } from "expo-router";


export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="font-bold">Edit app/index.tsx to edit this screen.</Text>
      <Link href="/login">Login</Link>
      <Link href="/sign-up">Sign-up</Link>
    </View>
  );
}
