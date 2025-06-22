import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import BannerHome from "./banner.home";
const data1 = Array(10).fill(1);
const styles = StyleSheet.create({
  topList: {
    borderColor: "orange",
    borderWidth: 5,
    minHeight: 100,
    marginBottom: 6,
    width: "100%",
  },
});
const TopListHome = () => {
  return (
    <View style={styles.topList}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        directionalLockEnabled={true}
        alwaysBounceVertical={false}>
        <BannerHome></BannerHome>
        <FlatList
          contentContainerStyle={{ alignSelf: "flex-start" }}
          numColumns={Math.ceil(data1.length / 2)}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={data1}
          renderItem={({ item, index }) => {
            return (
              <View style={{ padding: 10, margin: 5, borderWidth: 1 }}>
                <Text>{index + 1}</Text>
              </View>
            );
          }}></FlatList>
      </ScrollView>
    </View>
  );
};
export default TopListHome;
