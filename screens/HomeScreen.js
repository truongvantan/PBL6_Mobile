import {
    StyleSheet,
    Text,
    View,
    Image,
    SafeAreaView,
    Platform,
    ScrollView,
    Pressable,
    TextInput,
    Alert,
    Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import ProductItem from "../components/ProductItem";
import { SelectList } from "react-native-dropdown-select-list";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
    // const baseUrl = "https://api-ecom.duthanhduoc.com";
    const baseUrl = "http://10.10.59.200:4000";
    // const baseUrl = "http://172.21.1.25:4000";
    // const baseUrl = "http://localhost:4000";

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(false);

    const [page, setPage] = useState(1);
    const [limit] = useState(10);

    const [searchText, setSearchText] = useState("");

    const [sortType, setSortType] = useState(null);
    const itemsSort = [
        { label: "Sắp xếp", value: null },
        {
            label: "Giá thấp đến cao",
            value: "price_low",
        },
        {
            label: "Giá cao đến thấp",
            value: "price_high",
        },
        { label: "Tên A-Z", value: "name_low" },
        { label: "Tên Z-A", value: "name_high" },
    ];
    const [isOpen, setIsOpen] = useState(false);
    const [currentValue, setCurrentValue] = useState();

    const navigation = useNavigation();

    useEffect(() => {
        // Gọi API khi component được tạo
        fetchData();
    }, [page]);

    const fetchData = async () => {
        try {
            const [categoriesResponse, productsResponse] = await Promise.all([
                axios.get(`${baseUrl}/categories`),
                axios.get(`${baseUrl}/products?page=${page}&limit=${limit}`),
            ]);
            // Lấy giá trị của 'data' từ response
            const categoriesData = categoriesResponse.data.data;
            const productsData = productsResponse.data.data.products;
            setProducts((prevProducts) =>
                page === 1 ? productsData : [...prevProducts, ...productsData]
            );
            // Cập nhật state với giá trị của 'data' từ cả hai response
            setCategories(categoriesData);
            // setProducts(productsData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const loadMore = () => {
        // Tăng giá trị của page khi người dùng muốn xem thêm sản phẩm
        setPage((prevPage) => prevPage + 1);
    };

    const cart = useSelector((state) => state.cart.cart);

    const logout = () => {
        clearAuthToken();
    };
    const clearAuthToken = async () => {
        await AsyncStorage.removeItem("authToken");
        console.log("auth token cleared");
        navigation.replace("Login");
    };

    return (
        <SafeAreaView
            style={{
                paddingTop: Platform.OS === "android" ? 40 : 0,
                flex: 1,
                backgroundColor: "white",
            }}
        >
            <ScrollView>
                <View
                    style={{
                        backgroundColor: "#0891B2",
                        padding: 10,
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Pressable
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginHorizontal: 7,
                            gap: 10,
                            backgroundColor: "white",
                            borderRadius: 3,
                            height: 38,
                            flex: 1,
                        }}
                    >
                        <AntDesign
                            style={{ marginLeft: 5 }}
                            name="search1"
                            size={24}
                            color="#0891B2"
                        />
                        <TextInput
                            placeholder="Tìm kiếm sản phẩm"
                            value={searchText}
                            onChangeText={(text) => setSearchText(text)}
                        />
                    </Pressable>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                        padding: 10,
                        backgroundColor: "#A5F3FC",
                    }}
                >
                    <Ionicons name="location-outline" size={24} color="black" />
                    <Pressable>
                        <Text>54 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng</Text>
                    </Pressable>

                    <MaterialIcons
                        name="keyboard-arrow-down"
                        size={24}
                        color="black"
                    />
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginHorizontal: 10,
                        marginTop: 10,
                        width: "45%",
                    }}
                >
                    <SelectList
                        placeholder="Chọn hãng"
                        data={categories.map((item) => {
                            return { key: item._id, value: item.name };
                        })}
                        setSelected={setSelectedCategory}
                        dropdownItemStyles={{ backgroundColor: "#F5F5F5" }}
                    />
                    {/* <View>
                        <DropDownPicker
                            items={itemsSort}
                            placeholder="Sắp xếp"
                            open={isOpen}
                            setOpen={() => setIsOpen(!isOpen)}
                            value={currentValue}
                            setValue={(val) => setCurrentValue(val)}
                            containerStyle={{ height: 30 }}
                            style={{
                                backgroundColor: "#fafafa",
                                width: 200,
                                height: 20,
                            }}
                            itemStyle={{
                                justifyContent: "flex-start",
                            }}
                            dropDownStyle={{ backgroundColor: "#fafafa" }}
                            onChangeItem={(item) => setSortType(item.value)}
                        />
                    </View> */}
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        flexWrap: "wrap",
                    }}
                >
                    {products
                        ?.filter(
                            (item) =>
                                item.category._id === selectedCategory ||
                                (item.name
                                    .toLowerCase()
                                    .includes(searchText.toLowerCase()) &&
                                    searchText.toLowerCase() != "")
                        )
                        .map((item, index) => (
                            <Pressable
                                key={item._id}
                                onPress={() =>
                                    navigation.navigate("Info", {
                                        _id: item._id,
                                        name: item.name,
                                        image: item.image,
                                        images: item.images,
                                        price: item.price,
                                        rating: item.rating,
                                        price_before_discount:
                                            item.price_before_discount,
                                        quantity: item.quantity,
                                        sold: item.sold,
                                        item: item,
                                    })
                                }
                            >
                                <ProductItem item={item} key={index} />
                            </Pressable>
                        ))}
                </View>
                <View
                    style={{ flexDirection: "row", justifyContent: "center" }}
                >
                    <Pressable
                        onPress={loadMore}
                        style={{
                            backgroundColor: "#F5F5F5",
                            padding: 2,
                            borderRadius: 20,
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 15,
                        }}
                    >
                        <Text style={{ fontWeight: "bold" }}>
                            <AntDesign name="plus" size={30} color="black" />
                        </Text>
                    </Pressable>
                    {/* <Pressable
                        onPress={logout}
                        style={{
                            padding: 10,
                            backgroundColor: "#E0E0E0",
                            borderRadius: 25,
                            flex: 1,
                        }}
                    >
                        <Text style={{ textAlign: "center" }}>Logout</Text>
                    </Pressable> */}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({});
