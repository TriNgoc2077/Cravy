import CustomFlatList from "@/components/customFlatList/custom.flat.list";
import CollectionHome from "@/components/home/collection.home";
import HeaderHome from "@/components/home/header.home";
import SearchHome from "@/components/home/search.home";
import TopListHome from "@/components/home/top.list.home";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ecf0f1",
    flex: 1,
    justifyContent: "center",
    overflow: "hidden",
  },
  header: {
    borderColor: "red",
    borderWidth: 5,
    height: 100,
    marginBottom: 6,
    width: "100%",
  },
  list: {
    overflow: "hidden",
  },
  item: {
    borderColor: "green",
    borderWidth: 1,
    height: 250,
    marginBottom: 10,
    width: "100%",
  },
  sticky: {
    backgroundColor: "#2555FF50",
    borderColor: "blue",
    borderWidth: 5,
    height: 100,
    marginBottom: 6,
    width: "100%",
  },
});
const HomeTab = () => {
  const data = [
    {
      key: 1,
      name: "Top Restaurant Rating 5* this week",
      description: "Beyond your cuisine experience",
      refAPI: "top-rating",
    },
    {
      key: 2,
      name: "New Restaurant",
      description: "May be it's just a description :)",
      refAPI: "newcomer",
    },
    {
      key: 3,
      name: "Regale, Freeship 0VND",
      description: "Super taste restaurant",
      refAPI: "top-freeship",
    },
  ];
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomFlatList
        data={data}
        style={styles.list}
        renderItem={({ item }) => (
          <CollectionHome
            name={item.name}
            description={item.description}
            refAPI={item.refAPI}
          />
        )}
        HeaderComponent={<HeaderHome />}
        StickyElementComponent={<SearchHome />}
        TopListElementComponent={<TopListHome />}
      />
    </SafeAreaView>
  );
};

export default HomeTab;
