import { APP_COLOR } from "@/utils/constant";
import { useState } from "react";
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import SocialButton from "../button/social.button";
const styles = StyleSheet.create({
  inputGroup: {
    padding: 5,
    gap: 10,
  },
  text: {
    fontSize: 16,
  },
  input: {
    borderColor: APP_COLOR.GREY,
    borderWidth: 1,
    paddingHorizontal: 7,
    paddingVertical: 10,
    borderRadius: 10,
  },
});
interface IProps {
  title?: string;
  keyboardType?: KeyboardTypeOptions;
}
const ShareInput = (props: IProps) => {
  const { title, keyboardType } = props;
  const [isFocus, setIsFocus] = useState<boolean>(false);
  return (
    <View style={styles.inputGroup}>
      {title && <Text style={styles.text}>{title}</Text>}
      <TextInput
        onFocus={() => {
          setIsFocus(true);
        }}
        onBlur={() => {
          setIsFocus(false);
        }}
        keyboardType={keyboardType}
        style={[
          styles.input,
          { borderColor: isFocus ? APP_COLOR.ORANGE : APP_COLOR.GREY },
        ]}></TextInput>
    </View>
  );
};

export default ShareInput;
