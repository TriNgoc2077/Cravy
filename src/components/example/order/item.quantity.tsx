import { useCurrentApp } from "@/context/app.context";
import { APP_COLOR } from "@/utils/constant";
import { AntDesign } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

interface IProps {
  menuItem: IMenuItem;
  restaurant: IRestaurant | null;
}
const ItemQuantity = (props: IProps) => {
  const { menuItem, restaurant } = props;
  const { cart, setCart } = useCurrentApp();
  const handlePressItem = (item: IMenuItem, action: "MINUS" | "PLUS") => {
    if (restaurant?._id) {
      const total = action === "MINUS" ? -1 : 1;

      //doesn't exist
      if (!cart[restaurant._id]) {
        //initial state
        cart[restaurant._id] = {
          sum: 0,
          quantity: 0,
          items: {},
        };
      }

      cart[restaurant._id].sum =
        cart[restaurant._id].sum + total * item.basePrice;
      cart[restaurant._id].quantity = cart[restaurant._id].quantity + total;
      if (!cart[restaurant._id].items[item._id]) {
        cart[restaurant._id].items[item._id] = {
          data: menuItem,
          quantity: 0,
        };
      }
      cart[restaurant._id].items[item._id] = {
        data: menuItem,
        quantity: cart[restaurant._id].items[item._id].quantity + total,
      };
      if (cart[restaurant._id].items[item._id].quantity <= 0) {
        delete cart[restaurant._id].items[item._id];
      }
      setCart((prevState: any) => ({ ...prevState, cart }));
    }
  };
  let showMinus = false;
  let quantity = 0;
  if (restaurant?._id) {
    const store = cart[restaurant?._id];
    if (store?.items && store.items[menuItem._id]) {
      showMinus = true;
      quantity = store.items[menuItem._id].quantity;
    }
  }
  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        gap: 3,
      }}>
      {showMinus && (
        <>
          <Pressable
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.5 : 1,
                alignSelf: "flex-start",
              },
            ]}
            onPress={() => handlePressItem(menuItem, "MINUS")}>
            <AntDesign name="minussquareo" size={24} color={APP_COLOR.ORANGE} />
          </Pressable>
          <Text
            style={{
              minWidth: 25,
              textAlign: "center",
            }}>
            {quantity}
          </Text>
        </>
      )}
      <Pressable
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.5 : 1,
            alignSelf: "flex-start",
          },
        ]}
        onPress={() => handlePressItem(menuItem, "PLUS")}>
        <AntDesign name="plussquare" size={24} color={APP_COLOR.ORANGE} />
      </Pressable>
    </View>
  );
};

export default ItemQuantity;
