import ShareButton from "@/components/button/share.button";
import SocialButton from "@/components/button/social.button";
import ShareInput from "@/components/input/share.input";
import { registerAPI } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import axios from "axios";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-root-toast";
import { Formik } from "formik";
import { SignupSchema } from "@/utils/validate.schema";

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
  const handleSignUp = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      const res = await registerAPI(email, password, name);
      if (res.data) {
        router.replace({
          pathname: "/(auth)/verify",
          params: { email },
        });
      } else {
        Toast.show(Array.isArray(res.message) ? res.message[0] : res.message, {
          duration: Toast.durations.LONG,
          textColor: "white",
          backgroundColor: APP_COLOR.ORANGE,
          opacity: 1,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Formik
      validationSchema={SignupSchema}
      initialValues={{ fullname: "", email: "", password: "" }}
      onSubmit={(values) =>
        handleSignUp(values.fullname, values.email, values.password)
      }>
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <View style={styles.container}>
          <View>
            <Text
              style={{
                fontSize: 25,
                fontWeight: 600,
                marginVertical: 20,
              }}>
              Sign Up
            </Text>
          </View>
          <ShareInput
            title="FullName:"
            onChangeText={handleChange("fullname")}
            onBlur={handleBlur("fullname")}
            value={values.fullname}
            error={errors.fullname}
          />
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
              title="Sign Up"
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
            <Text style={{ color: "black" }}>Already have an account ?</Text>

            <Link href={"/(auth)/login"}>
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
      )}
    </Formik>
  );
};

export default SignUpPage;
