import RMain from "@/components/example/restaurant/rmain";
import { getRestaurantByIdAPI } from "@/utils/api";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

const ProductPage = () => {
  const { id } = useLocalSearchParams();
  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      const res = await getRestaurantByIdAPI(id as string);
      if (res.data) {
        setRestaurant(res.data);
      } else {
        //error
      }
    };
    fetchRestaurant();
  }, [id]);
  return (
    <View style={{ flex: 1 }}>
      <RMain restaurant={restaurant} />
    </View>
  );
};

export default ProductPage;
