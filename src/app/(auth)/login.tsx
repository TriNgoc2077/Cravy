import ShareButton from "@/components/button/share.button";
import SocialButton from "@/components/button/social.button";
import ShareInput from "@/components/input/share.input";
import { loginAPI } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { Link, router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Toast from "react-native-root-toast";
import { Formik } from "formik";
import { LoginSchema } from "@/utils/validate.schema";

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
  const [loading, setLoading] = useState<boolean>(false);
  const handleLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      const res = await loginAPI(email, password);
      if (res.data) {
        router.replace("/(tabs)");
      } else {
        if (res.statusCode === 400) {
          router.replace({
            pathname: "/(auth)/verify",
            params: { email, isLogin: 1 },
          });
        } else {
          Toast.show(
            Array.isArray(res.message) ? res.message[0] : res.message,
            {
              duration: Toast.durations.LONG,
              textColor: "white",
              backgroundColor: APP_COLOR.ORANGE,
              opacity: 1,
            }
          );
        }
      }
    } catch (error) {
      console.log(error);
      Toast.show("Some error occurred, please try again later!", {
        duration: Toast.durations.LONG,
        textColor: "white",
        backgroundColor: "red",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Formik
      validationSchema={LoginSchema}
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => handleLogin(values.email, values.password)}>
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
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
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
            error={errors.email}
          />
          <ShareInput
            title="Password:"
            secureTextEntry={true}
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
            error={errors.password}
          />
          <View style={{ marginVertical: 5 }}></View>
          <View>
            <ShareButton
              loading={loading}
              title="Login"
              onPress={handleSubmit}
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
      )}
    </Formik>
  );
};

export default LoginPage;
