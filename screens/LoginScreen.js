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
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();

    // const baseUrl = "https://api-ecom.duthanhduoc.com";
    const baseUrl = "http://10.10.59.200:4000";
    // const baseUrl = "http://localhost:4000";

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem("authToken");

                if (token) {
                    navigation.replace("Main");
                }
            } catch (error) {
                console.log("error message:", error);
            }
        };
        checkLoginStatus();
    }, []);

    const handleLogin = () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert("Thông báo", "Email và mật khẩu không được trống");
        } else {
            const user = {
                email: email,
                password: password,
            };

            // call API đăng nhập
            axios
                .post(`${baseUrl}/login`, user)
                .then((response) => {
                    console.log(response);
                    // const token = response.data.data.access_token;
                    // AsyncStorage.setItem("authToken", token);

                    navigation.replace("Main");
                })
                .catch((error) => {
                    Alert.alert(
                        "Đăng nhập thất bại",
                        "Hãy kiểm tra lại email và mật khẩu"
                    );
                    console.log(error);
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
                />
            </View>
            <KeyboardAvoidingView>
                <View style={{ alignItems: "center" }}>
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: "bold",
                            marginTop: 30,
                            color: "#041E42",
                        }}
                    >
                        Đăng nhập vào tài khoản của bạn
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
                </View>

                <View style={{ marginTop: 50 }} />

                <Pressable
                    onPress={handleLogin}
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
                        Đăng nhập
                    </Text>
                </Pressable>

                <Pressable
                    onPress={() => navigation.navigate("Register")}
                    style={{ marginTop: 20 }}
                >
                    <Text
                        style={{
                            textAlign: "center",
                            color: "gray",
                            fontSize: 16,
                        }}
                    >
                        Bạn chưa có tài khoản?
                        <Text
                            style={{
                                fontWeight: "bold",
                                color: "#0891B2",
                                fontSize: 16,
                            }}
                        >
                            Đăng kí ngay
                        </Text>
                    </Text>
                </Pressable>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({});
