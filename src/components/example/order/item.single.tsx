import { useCurrentApp } from "@/context/app.context";
import { APP_COLOR } from "@/utils/constant";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
interface IProps {
  menuItem: IMenuItem | null;
  handlePressItem: any;
  showMinus: boolean;
  quantity: number;
}
const ItemSingle = (props: IProps) => {
  const { menuItem, handlePressItem, showMinus, quantity } = props;
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
export default ItemSingle;
