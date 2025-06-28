import { useCurrentApp } from "@/context/app.context";
import { currencyFormatter } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { FontAwesome5 } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
interface IProps {
  restaurant: IRestaurant | null;
}
const StickyFooter = (props: IProps) => {
  const { restaurant } = props;
  const { cart, setCart } = useCurrentApp();
  const getSum = () => {
    if (restaurant && cart[restaurant._id]) {
      return cart[restaurant._id].sum;
    }
    return 0;
  };

  return (
    <>
      {getSum() === 0 ? (
        <></>
      ) : (
        <View
          style={{
            width: "100%",
            backgroundColor: "white",
            zIndex: 11,
            position: "absolute",
            bottom: 0,
            flexDirection: "row",
          }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              flex: 1,
              borderTopWidth: 1,
              borderTopColor: APP_COLOR.GREY,
            }}>
            <View style={{ padding: 10 }}>
              <View
                style={{
                  position: "absolute",
                  left: 40,
                  top: 5,
                  width: 16,
                  height: 16,
                  borderRadius: 16 / 2,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: APP_COLOR.ORANGE,
                }}>
                <Text style={{ color: "white", fontSize: 9 }}>
                  {cart &&
                    restaurant &&
                    cart[restaurant?._id] &&
                    cart[restaurant?._id!]["quantity"] && (
                      <Text>{cart[restaurant?._id!]["quantity"]}</Text>
                    )}
                </Text>
              </View>
              <Pressable onPress={() => alert("cart")}>
                <FontAwesome5
                  name="shopping-basket"
                  size={30}
                  color={APP_COLOR.ORANGE}
                />
              </Pressable>
            </View>
            <View style={{ padding: 10 }}>
              <Text style={{ color: APP_COLOR.ORANGE, fontSize: 18 }}>
                {currencyFormatter(125000)}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: 100,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: APP_COLOR.ORANGE,
            }}>
            <Text
              style={{
                color: "white",
              }}
              onPress={() => alert("Deliver")}>
              Order
            </Text>
          </View>
        </View>
      )}
    </>
  );
};

export default StickyFooter;
