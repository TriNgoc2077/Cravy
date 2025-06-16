import { Image, StyleSheet, View } from "react-native";
import ShareButton from "./share.button";
import fbLogo from "@/assets/auth/Facebook.png";
import ggLogo from "@/assets/auth/Google.png";
import TextBetweenLine from "../text.between.line";
const styles = StyleSheet.create({
	welcomeBtn: {
		flex: 1,
		gap: 30,
	},
});
const SocialButton = () => {
	return (
		<View style={styles.welcomeBtn}>
			<TextBetweenLine
				title="Login with"
				textColor="black"
			></TextBetweenLine>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "center",
					gap: 30,
				}}
			>
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
		</View>
	);
};

export default SocialButton;
