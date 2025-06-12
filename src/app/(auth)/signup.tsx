import ShareButton from "@/components/button/share.button";
import SocialButton from "@/components/button/social.button";
import ShareInput from "@/components/input/share.input";
import { APP_COLOR } from "@/utils/constant";
import { Link } from "expo-router";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
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

const SignUpPage = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View>
          <Text style={{ fontSize: 25, fontWeight: 600, marginVertical: 20 }}>
            Sign Up
          </Text>
        </View>
        <ShareInput title="FullName:" />
        <ShareInput title="Email:" keyboardType="email-address" />
        <ShareInput title="Password:" />
        <View style={{ marginVertical: 5 }}></View>
        <View>
          <ShareButton
            title="Sign Up"
            onPress={() => alert("me")}
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
          <Text style={{ color: "black" }}>Already have an account ?</Text>

          <Link href={"/(auth)/signup"}>
            <Text
              style={{
                color: "black",
                textDecorationLine: "underline",
              }}>
              Login.
            </Text>
          </Link>
        </View>
        <SocialButton></SocialButton>
      </View>
    </SafeAreaView>
  );
};

export default SignUpPage;
