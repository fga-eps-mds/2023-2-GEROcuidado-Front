import React, { useRef, useState } from "react";
import { Text, TouchableOpacity, View, Image, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinkButton } from "../../../components/LinkButton";
import Swiper from "react-native-swiper";
import { Link } from "expo-router";
import { NextButton } from "../../../components/NextButton";

export default function Carousel() {

    /* const [currentIndex, setCurrentIndex] = useState(0);
    const swiperRef = useRef(null) as any;
  
    const handleNextButtonPress = () => {
      if (currentIndex < 2) {
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        swiperRef.current.scrollBy(1, true); 
      } else {
        
      }
    }; */

    return (
        <View>
            <Swiper showsButtons={true}>
                <View>
                    <View>
                        <Link href="/" asChild>
                            <TouchableOpacity >
                                <Text style={styles.skip}>Pular</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                    <View>
                        <Image
                            style={styles.image}
                            source={require("../../../../assets/img_tutor1.png")}
                        />
                        <Text style={styles.text}>
                            Gerencie as <Text style={styles.word}>rotinas</Text>
                        </Text>
                        <Text style={styles.text}>do seu idoso</Text>
                        <View style={styles.linkButton}>
                            <LinkButton
                                title="Prosseguir"
                                href="/pages/auth/carousel"
                            ></LinkButton>
                        </View>
                    </View>
                </View>
                <View>
                    <View>
                        <Link href="/" asChild>
                            <TouchableOpacity>
                                <Text style={styles.skip}>Pular</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                    <View>
                        <Image
                            style={styles.image}
                            source={require("../../../../assets/img_tutor2.png")}
                        />
                        <Text style={styles.text}>Colete os dados da</Text>
                        <Text style={styles.text}>
                            <Text style={styles.word}>saúde</Text> do idoso
                        </Text>
                        <View style={styles.linkButton}>
                            <LinkButton
                                title="Prosseguir"
                                href="/pages/auth/tutorial3"
                            ></LinkButton>
                        </View>
                    </View>
                </View>
                <View>
                    <View>
                        <Link href="/" asChild>
                            <TouchableOpacity>
                                <Text style={styles.skip}>Pular</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                    <View>
                        <Image
                            style={styles.image}
                            source={require("../../../../assets/img_tutor3.png")}
                        />
                        <Text style={styles.text}>Obtenha ajuda no</Text>
                        <Text style={[styles.text, styles.word]}>portal</Text>
                        <View style={styles.linkButton}>
                            <LinkButton
                                title="Prosseguir"
                                href="/pages/auth/tutorial1"
                            ></LinkButton>
                        </View>
                    </View>
                </View>
            </Swiper>
       </View>
    );
}


const styles = StyleSheet.create({
    skip: {
        textAlign: "right",
        marginTop: 10,
        marginBottom: 10,
        marginRight: 10,
        fontWeight: "bold",
        color: "gray",
    },
    image: {
        alignSelf: "center",
        marginBottom: 28,
        marginTop: 32,
    },
    text: {
        fontSize: 32,
        textAlign: "center",
        fontWeight: "bold",
        color: "gray",
    },
    word: {
        color: "#B4026D",
    },
    row: {
        marginTop: 40,
        flexDirection: "row",
        alignSelf: "center",
    },
    circle: {
        color: "#9E9696",
        paddingLeft: 10,
        paddingRight: 10,
    },
    notSelectedCircle: {
        opacity: 0.4,
    },
    linkButton: {
        alignItems: "center",
        marginTop: 27,
    },
});