import { useCurrentApp } from "@/context/app.context";
import { APP_COLOR } from "@/utils/constant";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import ItemSingle from "./item.single";

interface IProps {
  menuItem: IMenuItem;
  restaurant: IRestaurant | null;
  isModal: boolean;
}
const ItemQuantity = (props: IProps) => {
  const { menuItem, restaurant, isModal } = props;
  const { cart, setCart } = useCurrentApp();
  const handlePressItem = (item: IMenuItem, action: "MINUS" | "PLUS") => {
    if (item.options.length && !isModal) {
      router.navigate({
        pathname: "/product/create.modal",
        params: { menuItemId: menuItem._id },
      });
    }
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
    <ItemSingle
      menuItem={menuItem}
      handlePressItem={handlePressItem}
      showMinus={showMinus}
      quantity={quantity}
    />
  );
};

export default ItemQuantity;
