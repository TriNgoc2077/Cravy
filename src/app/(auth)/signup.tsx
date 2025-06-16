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
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const handleSignUp = async () => {
		try {
			const res = await registerAPI(email, password, name);
			if (res.data) {
				router.replace({
					pathname: "/(auth)/verify",
					params: { email },
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
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.container}>
				<View>
					<Text
						style={{
							fontSize: 25,
							fontWeight: 600,
							marginVertical: 20,
						}}
					>
						Sign Up
					</Text>
				</View>
				<ShareInput title="FullName:" value={name} setValue={setName} />
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
						title="Sign Up"
						onPress={handleSignUp}
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
						}}
					></ShareButton>
				</View>
				<View
					style={{
						flexDirection: "row",
						gap: 10,
						justifyContent: "center",
						marginVertical: 15,
					}}
				>
					<Text style={{ color: "black" }}>
						Already have an account ?
					</Text>

					<Link href={"/(auth)/signup"}>
						<Text
							style={{
								color: "black",
								textDecorationLine: "underline",
							}}
						>
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
