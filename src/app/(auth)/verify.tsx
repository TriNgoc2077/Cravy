import LoadingOverlay from "@/components/loading/overlay";
import { resendCodeAPI, verifyCodeAPI } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Keyboard, StyleSheet, Text, View } from "react-native";
import OTPTextView from "react-native-otp-textinput";
import Toast from "react-native-root-toast";

const styles = StyleSheet.create({
	container: {
		paddingVertical: 30,
		paddingHorizontal: 20,
	},
	heading: {
		fontSize: 25,
		fontWeight: "600",
		marginVertical: 20,
	},
});
const VerifyPage = () => {
	const { email } = useLocalSearchParams();
	const [isSubmit, setIsSubmit] = useState<boolean>(false);
	const otpRef = useRef<OTPTextView>(null);
	const [code, setCode] = useState<string>("");
	const verifyCode = async () => {
		//call api
		setIsSubmit(true);
		const res = await verifyCodeAPI(email as string, code);
		setIsSubmit(false);
		if (res.data) {
			otpRef.current?.clear();
			Toast.show("Registered successfully !", {
				duration: Toast.durations.LONG,
				textColor: "white",
				backgroundColor: APP_COLOR.GREEN,
				opacity: 1,
			});
			router.replace("/(auth)/login");
		} else {
			Toast.show(res.message, {
				duration: Toast.durations.LONG,
				textColor: "white",
				backgroundColor: APP_COLOR.ORANGE,
				opacity: 1,
			});
		}
		Keyboard.dismiss();
	};
	useEffect(() => {
		if (code && code.length === 6) {
			verifyCode();
		}
	}, [code]);

	const handleResendCode = async () => {
		otpRef.current?.clear();
		//call api
		const res = await resendCodeAPI(email as string);
		const m = res.data ? "Resend code successfully !" : res.message;
		Toast.show(m as string, {
			duration: Toast.durations.LONG,
			textColor: "white",
			backgroundColor: res.data ? APP_COLOR.GREEN : APP_COLOR.ORANGE,
			opacity: 1,
		});
	};
	return (
		<>
			<View style={styles.container}>
				<Text style={styles.heading}>Verify account</Text>
				<Text style={{ marginVertical: 10 }}>
					Please enter the confirmation code
				</Text>
				<View style={{ marginVertical: 20 }}>
					<Text>Verify page</Text>
					<OTPTextView
						ref={otpRef}
						handleTextChange={setCode}
						autoFocus
						inputCount={6}
						inputCellLength={1}
						tintColor={APP_COLOR.ORANGE}
						textInputStyle={{
							borderWidth: 1,
							borderColor: APP_COLOR.GREY,
							borderBottomWidth: 1,
							borderRadius: 5,
							//@ts-ignore:next-line
							color: APP_COLOR.ORANGE,
						}}
					/>
				</View>
				<View style={{ flexDirection: "row", marginVertical: 10 }}>
					<Text>Didn't receive the confirmation code?</Text>
					<Text
						style={{
							textDecorationLine: "none",
							color: APP_COLOR.ORANGE,
						}}
						onPress={handleResendCode}
					>
						{" "}
						Resend
					</Text>
				</View>
			</View>
			{isSubmit && <LoadingOverlay />}
		</>
	);
};

export default VerifyPage;
