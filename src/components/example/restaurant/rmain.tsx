import React, { useRef, useState } from "react";
import {
	Dimensions,
	Image,
	SectionList,
	Text,
	View,
	StyleSheet,
	StatusBar,
} from "react-native";
import Animated, {
	Extrapolation,
	interpolate,
	interpolateColor,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
} from "react-native-reanimated";

const { height: sHeight, width: sWidth } = Dimensions.get("window");
const HEADER_HEIGHT = 80;
const IMAGE_HEIGHT = 220;
const INFO_HEIGHT = 240;
const SLIDE_MENU_HEIGHT = 50;

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);

const RMain = () => {
	const scrollY = useSharedValue(0);
	const sectionListRef = useRef(null);
	const [activeMenuIndex, setActiveMenuIndex] = useState(0);

	const onScroll = useAnimatedScrollHandler((event) => {
		scrollY.value = event.contentOffset.y;
	});

	const animatedStickyHeaderStyle = useAnimatedStyle(() => {
		const opacity = interpolate(
			scrollY.value,
			[0, 100],
			[0, 1],
			Extrapolation.CLAMP
		);
		return {
			opacity,
			position: "absolute",
			top: 0,
			left: 0,
			right: 0,
			height: HEADER_HEIGHT,
			backgroundColor: "white",
			justifyContent: "center",
			alignItems: "center",
			zIndex: 10,
		};
	});

	const animatedMenuStyle = useAnimatedStyle(() => {
		const range = IMAGE_HEIGHT + INFO_HEIGHT - HEADER_HEIGHT;
		const translateY = interpolate(
			scrollY.value,
			[0, range],
			[0, -range],
			Extrapolation.CLAMP
		);
		return {
			transform: [{ translateY }],
			position: "absolute",
			top: IMAGE_HEIGHT + INFO_HEIGHT,
			zIndex: 2,
			width: "100%",
		};
	});

	const data = [
		{
			title: "Món phổ biến",
			data: [
				{
					id: "1",
					name: "Bún bò Huế (nạm)",
					price: "59.000đ",
					image: require("./bunbo.jpg"),
				},
			],
		},
		{
			title: "Flash Sale",
			data: [
				{
					id: "2",
					name: "Combo bùng nổ",
					price: "89.000đ",
					image: require("./combo.jpg"),
				},
			],
		},
	];

	return (
		<View style={{ flex: 1 }}>
			<StatusBar
				barStyle="dark-content"
				backgroundColor="transparent"
				translucent
			/>

			{/* Header image */}
			<Image
				source={require("./restaurant-cover.jpg")}
				style={{ width: "100%", height: IMAGE_HEIGHT }}
				resizeMode="cover"
			/>

			{/* Info section */}
			<View style={{ height: INFO_HEIGHT, padding: 16 }}>
				<Text style={styles.title}>Bún Bò 1991 - Bún Bò & Cà Phê</Text>
				<Text style={styles.subText}>
					4.9 (500+ bình luận) • 22 phút
				</Text>
				<Text style={styles.note}>Giảm 20% cho đơn từ 250.000đ</Text>
			</View>

			{/* Animated slide menu */}
			<Animated.View style={[animatedMenuStyle, styles.slideMenu]}>
				<Text style={styles.menuText}>Món 1K</Text>
				<Text style={styles.menuText}>Bún bò gia truyền</Text>
			</Animated.View>

			{/* Section list */}
			<AnimatedSectionList
				ref={sectionListRef}
				onScroll={onScroll}
				scrollEventThrottle={16}
				sections={data}
				keyExtractor={(item: any) => item.id}
				renderItem={({ item }: { item: any }) => (
					<View style={styles.itemBox}>
						<Image source={item.image} style={styles.itemImage} />
						<Text>{item.name}</Text>
						<Text style={{ color: "red" }}>{item.price}</Text>
					</View>
				)}
				renderSectionHeader={({ section }: { section: any }) => (
					<Text style={styles.sectionHeader}>{section.title}</Text>
				)}
				contentContainerStyle={{
					paddingTop: IMAGE_HEIGHT + INFO_HEIGHT + SLIDE_MENU_HEIGHT,
				}}
			/>

			{/* Sticky header when scrolling */}
			<Animated.View style={animatedStickyHeaderStyle}>
				<Text style={{ fontWeight: "bold" }}>Bún Bò 1991</Text>
			</Animated.View>
		</View>
	);
};

export default RMain;

const styles = StyleSheet.create({
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	subText: {
		color: "gray",
		marginTop: 4,
	},
	note: {
		color: "green",
		marginTop: 8,
	},
	slideMenu: {
		height: SLIDE_MENU_HEIGHT,
		backgroundColor: "white",
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		borderBottomWidth: 1,
		borderColor: "#eee",
	},
	menuText: {
		fontWeight: "600",
	},
	sectionHeader: {
		fontSize: 18,
		fontWeight: "bold",
		padding: 8,
		backgroundColor: "#f0f0f0",
	},
	itemBox: {
		padding: 12,
		borderBottomWidth: 1,
		borderColor: "#eee",
	},
	itemImage: {
		width: "100%",
		height: 100,
		marginBottom: 8,
	},
});
