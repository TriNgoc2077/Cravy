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
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

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
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  eye: {
    position: "absolute",
    right: 12,
    top: 14,
  },
});
interface IProps {
  title?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  value: any;
  setValue?: (v: any) => void;
  onChangeText?: any;
  onBlur?: any;
  error?: any;
}
const ShareInput = (props: IProps) => {
  const {
    title,
    keyboardType,
    secureTextEntry = false,
    value,
    setValue,
    onChangeText,
    onBlur,
    error,
  } = props;
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  return (
    <View style={styles.inputGroup}>
      {title && <Text style={styles.text}>{title}</Text>}
      <View>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onFocus={() => {
            setIsFocus(true);
          }}
          onBlur={(e) => {
            if (onBlur) onBlur(e);
            setIsFocus(false);
          }}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry && !isShowPassword}
          style={[
            styles.input,
            { borderColor: isFocus ? APP_COLOR.ORANGE : APP_COLOR.GREY },
          ]}></TextInput>
        {error && <Text style={{ color: "red", marginTop: 3 }}>{error}</Text>}
        {secureTextEntry && (
          <FontAwesome5
            name={isShowPassword ? "eye" : "eye-slash"}
            size={15}
            color="black"
            style={styles.eye}
            onPress={() => setIsShowPassword(!isShowPassword)}
          />
        )}
      </View>
    </View>
  );
};

export default ShareInput;
