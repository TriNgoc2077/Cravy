import RMain from "@/components/example/restaurant/rmain";
import { getRestaurantByIdAPI } from "@/utils/api";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import ContentLoader, { Rect } from "react-content-loader/native";
import { useCurrentApp } from "@/context/app.context";

const { height: sHeight, width: sWidth } = Dimensions.get("window");

const ProductPage = () => {
  const { id } = useLocalSearchParams();
  const { restaurant, setRestaurant } = useCurrentApp();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurant = async () => {
      setLoading(true);

      const res = await getRestaurantByIdAPI(id as string);
      setLoading(false);
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
      {!loading ? (
        <RMain />
      ) : (
        <ContentLoader
          speed={2}
          width={700}
          height={sHeight}
          // viewBox="0 0 700 150"

          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          style={{ width: "100%" }}>
          <Rect x="0" y="0" rx="3" ry="3" width={sWidth} height="120" />

          <Rect
            x="10"
            y="140"
            rx="10"
            ry="10"
            width={sWidth - 50}
            height="20"
          />

          <Rect
            x="10"
            y="170"
            rx="10"
            ry="10"
            width={sWidth - 150}
            height="20"
          />

          <Rect x="10" y="220" rx="5" ry="5" width={100} height="100" />
          <Rect x="130" y="220" rx="10" ry="10" width={150} height="20" />
          <Rect x="130" y="250" rx="10" ry="10" width={100} height="20" />
          <Rect x="130" y="280" rx="10" ry="10" width={200} height="20" />

          <Rect x="10" y="340" rx="5" ry="5" width={100} height="100" />
          <Rect x="130" y="340" rx="10" ry="10" width={150} height="20" />
          <Rect x="130" y="370" rx="10" ry="10" width={100} height="20" />
          <Rect x="130" y="400" rx="10" ry="10" width={200} height="20" />

          <Rect x="10" y="460" rx="5" ry="5" width={100} height="100" />
          <Rect x="130" y="460" rx="10" ry="10" width={150} height="20" />
          <Rect x="130" y="490" rx="10" ry="10" width={100} height="20" />
          <Rect x="130" y="520" rx="10" ry="10" width={200} height="20" />

          <Rect x="10" y="700" rx="5" ry="5" width={100} height="100" />
          <Rect x="130" y="700" rx="10" ry="10" width={150} height="20" />
          <Rect x="130" y="730" rx="10" ry="10" width={100} height="20" />
          <Rect x="130" y="760" rx="10" ry="10" width={200} height="20" />
        </ContentLoader>
      )}
    </View>
  );
};

export default ProductPage;
