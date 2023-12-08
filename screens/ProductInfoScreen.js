import {
    StyleSheet,
    TextInput,
    View,
    ScrollView,
    Pressable,
    ImageBackground,
    Dimensions,
    Text,
    Image
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {useDispatch} from "react-redux";
import { useSelector } from "react-redux";

const ProductInfoScreen = () => {
    const route = useRoute();
    const { width } = Dimensions.get("window");
    const navigation = useNavigation();
    const height = (width * 100) / 100;

    const [addedToCart, setAddedToCart] = useState(false);

    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });

    const kFormatter = (num) => {
        return Math.abs(num) > 999
            ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
            : Math.sign(num) * Math.abs(num);
    };

    const dispatch = useDispatch();

    const addItemToCart = (item) => {
        setAddedToCart(true);
        dispatch(addItemToCart());
        setTimeout(() => {
            setAddedToCart(false);
        }, 6000)
    }

    const cart = useSelector((state) => state.cart.cart);
    console.log(cart);

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginTop: 50, backgroundColor: "white" }}
        >
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Image
                    style={{ width: 300, height: 60, marginTop: 20 }}
                    source={require("../assets/logo.png")}
                />
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {route.params.images.map((item, index) => (
                    <ImageBackground
                        style={{
                            width,
                            height,
                            marginTop: 25,
                            resizeMode: "contain",
                        }}
                        source={{ uri: item }}
                        key={index}
                    ></ImageBackground>
                ))}
            </ScrollView>

            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    {route?.params?.name}
                </Text>
            </View>

            <View
                style={{
                    padding: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <Text
                    style={{
                        fontSize: 20,
                        textDecorationLine: "line-through",
                    }}
                >
                    {VND.format(route?.params?.price_before_discount)}
                </Text>
                <Text
                    style={{
                        fontSize: 20,
                        color: "red",
                        fontWeight: "bold",
                    }}
                >
                    {VND.format(route?.params?.price)}
                </Text>
            </View>

            <View
                style={{
                    padding: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <Text
                    style={{
                        fontSize: 20,
                    }}
                >
                    {kFormatter(route?.params?.sold)} đã bán
                </Text>
                <Text
                    style={{
                        fontSize: 20,
                    }}
                >
                    Đánh giá:{" "}
                    <Text style={{ fontWeight: "bold" }}>
                        {route?.params?.rating}
                        <AntDesign name="star" size={20} color="#FDE047" />
                    </Text>
                </Text>
            </View>

            <View>
                <Text
                    style={{
                        textAlign: "center",
                        fontSize: 25,
                        fontWeight: "bold",
                    }}
                >
                    Số lượng: {route?.params?.quantity}
                </Text>
            </View>

            <View style={{ padding: 10 }}>
                <Pressable
                    onPress={() => addItemToCart(route?.params?.item)}
                    style={{
                        backgroundColor: "#0891B2",
                        padding: 7,
                        borderRadius: 20,
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 10,
                    }}
                >
                    {addItemToCart ? (
                        <View>
                            <Text>Đã thêm vào giỏ hàng</Text>
                        </View>
                    ) : (
                        <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>
                            Thêm vào giỏ hàng
                        </Text>
                    )}
                </Pressable>

                <Pressable
                    style={{
                        backgroundColor: "#0891B2",
                        padding: 7,
                        borderRadius: 20,
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 10,
                    }}
                >
                    <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>
                        Mua ngay
                    </Text>
                </Pressable>
            </View>
        </ScrollView>
    );
};

export default ProductInfoScreen;

const styles = StyleSheet.create({});
