import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React from 'react'

const fullBackground = ({ children, image, borderRadius = 20 }) => {
    return (
        <View style={[styles.wrapper,  borderRadius ]}>
            <ImageBackground
                source={image}
                style={styles.background}
                resizeMode="cover"
            >
                {children}
            </ImageBackground>
        </View>
    );
};


export default fullBackground


const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        overflow: 'hidden', // penting biar borderRadius kepake
        margin: 10,},
    background: {
        flex: 1,
        marginRight: 10,
        borderRadius: "50%",
    },
})