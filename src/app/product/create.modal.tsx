import ItemQuantity from "@/components/example/order/item.quantity";
import ItemSingle from "@/components/example/order/item.single";
import { useCurrentApp } from "@/context/app.context";
import { currencyFormatter } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { AntDesign, Feather } from "@expo/vector-icons";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";

const CreateModalPage = () => {
  const { restaurant, cart, setCart } = useCurrentApp();
  const { menuItemId } = useLocalSearchParams();
  const [menuItem, setMenuItem] = useState<IMenuItem | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useEffect(() => {
    if (restaurant && menuItemId) {
      for (let i = 0; i <= restaurant.menu.length; i++) {
        const menu = restaurant.menu[i];

        let check = false;
        for (let j = 0; j <= menu.menuItem.length; j++) {
          if (menu.menuItem[j]._id === menuItemId) {
            check = true;
            setMenuItem(menu.menuItem[j]);
            break;
          }
        }
      }
    }
  }, [restaurant, menuItemId]);
  const handlePressItem = (item: IMenuItem, action: "MINUS" | "PLUS") => {
    if (action === "MINUS" && quantity === 1) return;
    const total = action === "MINUS" ? -1 : 1;
    setQuantity((prevState) => prevState + total);
  };

  const handleAddCart = () => {
    if (restaurant?._id && menuItem) {
      const total = quantity;
      const item = menuItem!;
      const option = menuItem.options[selectedIndex];
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
        cart[restaurant._id].sum +
        total * (item.basePrice + option.additionalPrice);
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
      router.back();
    }
  };
  return (
    <Animated.View
      entering={FadeIn}
      style={{
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "#00000040",
      }}>
      {/* Dismiss modal when pressing outside */}
      <Pressable
        onPress={() => {
          router.back();
        }}
        style={StyleSheet.absoluteFill}
      />
      <Animated.View
        entering={SlideInDown}
        style={{
          height: "80%",
          width: "100%",
          backgroundColor: "white",
        }}>
        <View
          style={{
            borderBottomColor: "#eee",
            borderBottomWidth: 1,
            flexDirection: "row",
            gap: 10,
            padding: 10,
            alignItems: "center",
          }}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                textAlign: "center",
                fontWeight: 600,
                fontSize: 16,
              }}>
              Add new
            </Text>
          </View>
          <AntDesign
            onPress={() => router.back()}
            name="close"
            size={24}
            color="grey"
          />
        </View>

        <View
          style={{
            borderBottomColor: "#eee",
            borderBottomWidth: 1,
          }}>
          {menuItem && (
            <ItemSingle
              handlePressItem={handlePressItem}
              menuItem={menuItem}
              showMinus={true}
              quantity={1}
            />
          )}
        </View>

        <View
          style={{
            backgroundColor: "#eee",
            paddingVertical: 5,
            paddingHorizontal: 10,
          }}>
          <Text>Choose one</Text>
        </View>

        <ScrollView
          style={{
            flex: 1,
            borderBottomColor: "#eee",
            borderBottomWidth: 1,
          }}>
          {menuItem?.options.map((item, index) => {
            return (
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                  borderBottomWidth: 1,
                  borderBottomColor: "#eee",
                  flexDirection: "row",
                }}
                key={index}>
                <View
                  style={{
                    gap: 5,
                    flex: 1,
                  }}>
                  <Text>
                    {item.title} - {item.description}
                  </Text>
                  <Text style={{ color: APP_COLOR.ORANGE }}>
                    {currencyFormatter(item.additionalPrice)}
                  </Text>
                </View>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}>
                  <Pressable
                    onPress={() => setSelectedIndex(index)}
                    style={({ pressed }) => ({
                      opacity: pressed === true ? 0.5 : 1,
                      alignSelf: "flex-start",
                      padding: 2,
                      backgroundColor:
                        index === selectedIndex ? APP_COLOR.ORANGE : "white",
                      borderColor:
                        index === selectedIndex ? APP_COLOR.ORANGE : "grey",
                      borderWidth: 1,
                      borderRadius: 2,
                    })}>
                    <Feather name="check" size={15} color={"white"} />
                  </Pressable>
                </View>
              </View>
            );
          })}
        </ScrollView>
        <View
          style={{
            marginBottom: 20,
            marginTop: 10,
            marginHorizontal: 10,
            justifyContent: "flex-end",
          }}>
          <Pressable
            onPress={handleAddCart}
            style={({ pressed }) => ({
              opacity: pressed === true ? 0.5 : 1,
              padding: 10,
              backgroundColor: APP_COLOR.ORANGE,
              borderRadius: 3,
            })}>
            <Text style={{ textAlign: "center", color: "white" }}>
              Add to cart
            </Text>
          </Pressable>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

export default CreateModalPage;
