import React, { useRef, useState } from "react";
import { Text, TouchableOpacity, View, Image, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinkButton } from "../../../components/LinkButton";
import Swiper from "react-native-swiper";
import { Link } from "expo-router";
import { NextButton } from "../../../components/NextButton";
import Tutorial1 from "./tutorial1";
import Tutorial2 from "./tutorial2";
import Tutorial3 from "./tutorial3";

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
        <View style={styles.carousel} >
            <Swiper  dotColor="#D9D9D9" activeDotColor="#9E9696" showsButtons={true} loop={false}>
                <View>
                     <Tutorial1></Tutorial1>
                </View>
                <View>
                    <Tutorial2></Tutorial2>
                </View>
                <View>
                    <Tutorial3></Tutorial3>
                </View>
            </Swiper>
            <View style={styles.linkButton}>
                <LinkButton
                    title="Prosseguir"
                    href="/"
                ></LinkButton>
             </View>
       </View>
    );
}


const styles = StyleSheet.create({
    linkButton: {
        alignItems: "center",
        marginTop: 27,
    },
    carousel:{
        height:"100%",
    },
});