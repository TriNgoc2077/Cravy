import { APP_COLOR } from "@/utils/constant";
import Entypo from "@expo/vector-icons/Entypo";
import { StyleSheet, Text, View } from "react-native";
const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    gap: 3,
  },
  location: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
});

const HeaderHome = () => {
  return (
    <View style={styles.container}>
      <Text style={{ paddingLeft: 5 }}>Delivery arrive:</Text>
      <View style={styles.location}>
        <Entypo name="location-pin" size={20} color={APP_COLOR.GREY} />
        <Text>02 Vo Oanh, 25 Ward, Binh Thanh District, Ho Chi Minh City</Text>
      </View>
    </View>
  );
};

export default HeaderHome;
