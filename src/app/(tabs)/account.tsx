import { useCurrentTheme } from "@/context/app.context";
import { Text, View } from "react-native";

const AccountPage = () => {
  const { theme } = useCurrentTheme();
  return (
    <View>
      <Text> Account Page</Text>
      <Text>theme= {theme}</Text>
    </View>
  );
};

export default AccountPage;
