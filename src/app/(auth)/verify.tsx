import LoadingOverlay from "@/components/loading/overlay";
import { verifyCodeAPI } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { useState } from "react";
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
	const [isSubmit, setIsSubmit] = useState<boolean>(false);
	const handleCellTextChange = async (text: string, i: number) => {
		if (i === 5 && text) {
			//call api
			setIsSubmit(true);
			const res = await verifyCodeAPI("admin@gmail.com", "124562");
			setIsSubmit(false);
			if (res.data) {
				alert("success");
			} else {
				Toast.show(res.message, {
					duration: Toast.durations.LONG,
					textColor: "white",
					backgroundColor: APP_COLOR.ORANGE,
					opacity: 1,
				});
			}
			Keyboard.dismiss();
		}
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
