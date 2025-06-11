import bg from "@/assets/auth/background.jpg";
import fbLogo from "@/assets/auth/Facebook.png";
import ggLogo from "@/assets/auth/Google.png";
import ShareButton from "@/components/button/share.button";
import TextBetweenLine from "@/components/text.between.line";
import { APP_COLOR } from "@/utils/constant";
import { LinearGradient } from "expo-linear-gradient";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  welcomeText: {
    flex: 0.6,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 20,
  },
  welcomeBtn: {
    flex: 0.4,
    gap: 30,
  },
  heading: {
    fontSize: 40,
    fontWeight: "600",
  },
  name: {
    fontSize: 30,
    color: APP_COLOR.ORANGE,
    marginVertical: 10,
  },
  slogan: {},
});

const WelcomePage = () => {
  return (
    <ImageBackground style={{ flex: 1 }} source={bg}>
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.4)"]}
        style={{ flex: 1 }}
        locations={[0.5, 0.7]}>
        <View style={styles.container}>
          <View style={styles.welcomeText}>
            <Text style={styles.heading}>Welcome to</Text>
            <Text style={styles.name}>Cravy</Text>
            <Text style={styles.slogan}>Enjoy your tasty food!</Text>
          </View>
          <View style={styles.welcomeBtn}>
            <TextBetweenLine title="Login with"></TextBetweenLine>
            <View style={{ gap: 15 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 30,
                }}>
                <ShareButton
                  title="Facebook"
                  onPress={() => alert("me")}
                  textStyle={{ textTransform: "none" }}
                  pressStyle={{ alignSelf: "flex-start" }}
                  btnStyle={{
                    backgroundColor: "#fff",
                    justifyContent: "center",
                    borderRadius: 40,
                  }}
                  icon={<Image source={fbLogo} />}
                />
                <ShareButton
                  title="Google"
                  onPress={() => alert("me")}
                  textStyle={{ textTransform: "none" }}
                  pressStyle={{ alignSelf: "flex-end" }}
                  btnStyle={{
                    backgroundColor: "#fff",
                    justifyContent: "center",
                    paddingHorizontal: 20,
                    borderRadius: 40,
                  }}
                  icon={<Image source={ggLogo} />}
                />
              </View>
              <View>
                <ShareButton
                  title="Start with your email"
                  onPress={() => alert("me")}
                  textStyle={{ color: "#fff", paddingVertical: 5 }}
                  btnStyle={{
                    justifyContent: "center",
                    borderRadius: 30,
                    marginHorizontal: 50,
                    paddingVertical: 10,
                    backgroundColor: "#2c2c2c",
                    borderColor: "#505050",
                    borderWidth: 1,
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
                }}>
                <Text style={{ color: "white" }}>Don't have an account ?</Text>
                <Text
                  style={{
                    color: "white",
                    textDecorationLine: "underline",
                  }}>
                  Sign up.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default WelcomePage;
