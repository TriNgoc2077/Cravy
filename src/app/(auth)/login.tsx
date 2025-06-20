import ShareButton from "@/components/button/share.button";
import SocialButton from "@/components/button/social.button";
import ShareInput from "@/components/input/share.input";
import { loginAPI } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { Link, router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Toast from "react-native-root-toast";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 60,
    gap: 10,
  },
  inputGroup: {
    padding: 5,
    gap: 10,
  },
  text: {
    fontSize: 16,
  },
  input: {
    borderColor: "#d0d0d0",
    borderWidth: 1,
    paddingHorizontal: 7,
    paddingVertical: 10,
    borderRadius: 7,
  },
});

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleLogin = async () => {
    const res = await loginAPI(email, password);
    try {
      if (res.data) {
        router.replace("/(tabs)");
      } else {
        Toast.show(Array.isArray(res.message) ? res.message[0] : res.message, {
          duration: Toast.durations.LONG,
          textColor: "white",
          backgroundColor: APP_COLOR.ORANGE,
          opacity: 1,
        });
        if (res.statusCode === 400) {
          router.replace({
            pathname: "/(auth)/verify",
            params: { email, isLogin: 1 },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 600,
            marginVertical: 20,
          }}>
          Login
        </Text>
      </View>
      <ShareInput
        title="Email:"
        keyboardType="email-address"
        value={email}
        setValue={setEmail}
      />
      <ShareInput
        title="Password:"
        secureTextEntry={true}
        value={password}
        setValue={setPassword}
      />
      <View style={{ marginVertical: 5 }}></View>
      <View>
        <ShareButton
          title="Login"
          onPress={handleLogin}
          textStyle={{ color: "#fff", paddingVertical: 5 }}
          btnStyle={{
            justifyContent: "center",
            borderRadius: 30,
            marginHorizontal: 50,
            paddingVertical: 10,
            backgroundColor: APP_COLOR.ORANGE,
          }}
          pressStyle={{
            alignSelf: "stretch",
          }}></ShareButton>
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          justifyContent: "center",
          marginVertical: 15,
        }}>
        <Text style={{ color: "black" }}>Don't have an account ?</Text>

        <Link href={"/(auth)/signup"}>
          <Text
            style={{
              color: "black",
              textDecorationLine: "underline",
            }}>
            Sign up.
          </Text>
        </Link>
      </View>
      <SocialButton></SocialButton>
    </View>
  );
};

export default LoginPage;
