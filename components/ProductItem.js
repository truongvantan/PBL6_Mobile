import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const ProductItem = ({ item }) => {
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });

    const kFormatter = (num) => {
        return Math.abs(num) > 999
            ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
            : Math.sign(num) * Math.abs(num);
    };

    return (
        <Pressable style={{ marginHorizontal: 15, marginVertical: 10 }}>
            <Image
                style={{ width: 150, height: 150, resizeMode: "contain" }}
                source={{ uri: item?.image }}
            />

            <Text
                numberOfLines={1}
                style={{
                    width: 150,
                    marginTop: 10,
                    fontWeight: "bold",
                }}
            >
                {item?.name}
            </Text>

            <View
                style={{
                    marginTop: 5,
                }}
            >
                <Text
                    style={{
                        textDecorationLine: "line-through",
                        fontWeight: "300",
                    }}
                >
                    {VND.format(item?.price_before_discount)}
                </Text>
                <Text
                    style={{
                        color: "red",
                        fontWeight: "bold",
                        textAlign: "right",
                    }}
                >
                    {VND.format(item?.price)}
                </Text>
            </View>
            <View
                style={{
                    marginTop: 5,
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <Text>{kFormatter(item?.sold)} đã bán</Text>
                <Text>
                    {item?.rating}
                    <AntDesign name="star" size={15} color="#FDE047" />
                </Text>
            </View>
            <View style={{flexDirection: "row", justifyContent: "center", marginTop: 5}}>
                <Pressable
                    style={{
                        backgroundColor: "#0891B2",
                        padding: 7,
                        borderRadius: 20,
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 10,
                        width: 100,
                    }}
                >
                    <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>
                        Thêm vào <Ionicons name="cart-outline" size={18} />
                    </Text>
                </Pressable>
            </View>
        </Pressable>
    );
};

export default ProductItem;

const styles = StyleSheet.create({});
