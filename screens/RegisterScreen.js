import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    KeyboardAvoidingView,
    TextInput,
    Pressable,
    Alert,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const RegisterScreen = () => {
    // const baseUrl = "https://api-ecom.duthanhduoc.com";
    const baseUrl = "http://10.10.59.200:4000";
    // const baseUrl = "http://172.21.1.25:4000";
    // const baseUrl = "http://localhost:4000";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigation = useNavigation();

    const validateEmail = (email) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        return reg.test(email);
    };

    const handleRegister = () => {
        if (!validateEmail(email)) {
            Alert.alert("Đăng kí thất bại", "Email không hợp lệ.");
        } else if (password.length < 8) {
            Alert.alert(
                "Đăng kí thất bại",
                "Mật khẩu phải có ít nhất 08 kí tự."
            );
        } else if (confirmPassword != password) {
            Alert.alert(
                "Đăng kí thất bại",
                "Mật khẩu xác nhận không trùng khớp."
            );
        } else {
            const user = {
                email: email,
                password: password,
            };

            // call API đăng kí
            axios
                .post(`${baseUrl}/register`, user)
                .then((response) => {
                    console.log("response", response);
                    Alert.alert("Đăng kí thành công", response.data.message);
                    // setEmail("");
                    // setPassword("");
                    // setConfirmPassword("");
                })
                .catch((error) => {
                    Alert.alert(
                        "Đăng kí thất bại",
                        error.response.data.data.email
                    );
                    console.log("Đăng kí thất bại", error);
                });
        }
    };

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
        >
            <View>
                <Image
                    style={{ width: 300, height: 60, marginTop: 50 }}
                    source={require("../assets/logo.png")}
                    //   source={{
                    //     uri: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png",
                    //   }}
                />
            </View>
            <KeyboardAvoidingView>
                <View style={{ alignItems: "center" }}>
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: "bold",
                            color: "#041E42",
                        }}
                    >
                        Đăng kí tài khoản
                    </Text>
                </View>

                <View style={{ marginTop: 10 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 5,
                            backgroundColor: "#D0D0D0",
                            paddingVertical: 5,
                            borderRadius: 5,
                            marginTop: 30,
                        }}
                    >
                        <MaterialIcons
                            style={{ marginLeft: 8 }}
                            name="email"
                            size={24}
                            color="gray"
                        />

                        <TextInput
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            style={{
                                color: "gray",
                                marginVertical: 10,
                                width: 300,
                                fontSize: email ? 16 : 18,
                            }}
                            placeholder="Nhập email của bạn"
                        />
                    </View>
                </View>
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 5,
                            backgroundColor: "#D0D0D0",
                            paddingVertical: 5,
                            borderRadius: 5,
                            marginTop: 10,
                        }}
                    >
                        <AntDesign
                            style={{ marginLeft: 8 }}
                            name="lock1"
                            size={24}
                            color="gray"
                        />

                        <TextInput
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={true}
                            style={{
                                color: "gray",
                                marginVertical: 10,
                                width: 300,
                                fontSize: password ? 16 : 18,
                            }}
                            placeholder="Nhập mật khẩu"
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 5,
                            backgroundColor: "#D0D0D0",
                            paddingVertical: 5,
                            borderRadius: 5,
                            marginTop: 10,
                        }}
                    >
                        <AntDesign
                            style={{ marginLeft: 8 }}
                            name="lock1"
                            size={24}
                            color="gray"
                        />

                        <TextInput
                            value={confirmPassword}
                            onChangeText={(text) => setConfirmPassword(text)}
                            secureTextEntry={true}
                            style={{
                                color: "gray",
                                marginVertical: 10,
                                width: 300,
                                fontSize: confirmPassword ? 16 : 18,
                            }}
                            placeholder="Nhập lại mật khẩu"
                        />
                    </View>
                </View>

                <View style={{ marginTop: 50 }} />

                <Pressable
                    onPress={handleRegister}
                    style={{
                        width: 200,
                        backgroundColor: "#0891B2",
                        borderRadius: 6,
                        marginLeft: "auto",
                        marginRight: "auto",
                        padding: 15,
                    }}
                >
                    <Text
                        style={{
                            textAlign: "center",
                            color: "white",
                            fontSize: 16,
                            fontWeight: "bold",
                        }}
                    >
                        Đăng kí
                    </Text>
                </Pressable>

                <Pressable
                    onPress={() => navigation.goBack()}
                    style={{ marginTop: 20 }}
                >
                    <Text
                        style={{
                            textAlign: "center",
                            color: "gray",
                            fontSize: 16,
                        }}
                    >
                        Bạn đã có tài khoản?
                        <Text
                            style={{
                                fontWeight: "bold",
                                color: "#0891B2",
                                fontSize: 16,
                            }}
                        >
                            Đăng nhập ngay
                        </Text>
                    </Text>
                </Pressable>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
