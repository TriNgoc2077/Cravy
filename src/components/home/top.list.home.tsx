import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import BannerHome from "./banner.home";
const styles = StyleSheet.create({});
const TopListHome = () => {
  const data1 = [
    {
      key: 1,
      name: "Hot Deal",
      source: require("@/assets/icons/flash-deals.png"),
    },

    {
      key: 2,
      name: "Quán Ngon",
      source: require("@/assets/icons/nice-shop.png"),
    },

    { key: 3, name: "Tích Điểm", source: require("@/assets/icons/points.png") },

    { key: 4, name: "Ngọt Xỉu", source: require("@/assets/icons/rice.png") },

    {
      key: 5,
      name: "Quán Tiền Bối",
      source: require("@/assets/icons/noodles.png"),
    },

    {
      key: 6,
      name: "Bún, Mì, Phở",
      source: require("@/assets/icons/bun-pho.png"),
    },

    { key: 7, name: "BBQ", source: require("@/assets/icons/bbq.png") },

    {
      key: 8,
      name: "Fast Food",
      source: require("@/assets/icons/fastfood.png"),
    },

    { key: 9, name: "Pizza", source: require("@/assets/icons/Pizza.png") },

    { key: 10, name: "Burger", source: require("@/assets/icons/burger.png") },

    {
      key: 11,
      name: "Sống Khỏe",
      source: require("@/assets/icons/egg-cucmber.png"),
    },

    {
      key: 12,
      name: "Giảm 50k",
      source: require("@/assets/icons/moi-moi.png"),
    },
    {
      key: 13,
      name: "99k Off",
      source: require("@/assets/icons/fried-chicken.png"),
    },

    {
      key: 14,
      name: "No Bung",
      source: require("@/assets/icons/korean-food.png"),
    },

    { key: 15, name: "Freeship", source: require("@/assets/icons/Steak.png") },

    { key: 16, name: "Deal OD", source: require("@/assets/icons/tomato.png") },

    { key: 17, name: "Món 1Ð", source: require("@/assets/icons/elipse.png") },

    {
      key: 18,
      name: "Ăn chiều",
      source: require("@/assets/icons/chowmein.png"),
    },

    {
      key: 19,
      name: "Combo 199k",
      source: require("@/assets/icons/Notif.png"),
    },

    { key: 20, name: "Milk Tea", source: require("@/assets/icons/salad.png") },
  ];

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        directionalLockEnabled={true}
        alwaysBounceVertical={false}
        style={{ marginVertical: 15 }}>
        <BannerHome></BannerHome>
        <FlatList
          contentContainerStyle={{ alignSelf: "flex-start" }}
          numColumns={Math.ceil(data1.length / 2)}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={data1}
          renderItem={({ item, index }) => {
            return (
              <View style={{ padding: 5, width: 100, alignItems: "center" }}>
                <Image
                  source={item.source}
                  style={{
                    height: 35,
                    width: 35,
                  }}></Image>
                <Text style={{ textAlign: "center" }}>{item.name}</Text>
              </View>
            );
          }}></FlatList>
      </ScrollView>
    </View>
  );
};
export default TopListHome;
