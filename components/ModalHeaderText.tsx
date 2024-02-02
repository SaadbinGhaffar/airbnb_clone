import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Colors from '@/constants/Colors';

const ModalHeaderText = () => {

    const [active, setActive] = useState(0);

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => setActive(0)} >
                <Text style={{
                    fontFamily: 'mon-sb', fontSize: 18,
                    color: active === 0 ? '#000' : Colors.grey,
                    // textDecorationLine: active === 0 ? '#underline' : 'none',
                    borderBottomColor: active === 0 ? '#000' : '#fff',
                    borderBottomWidth: 1
                }}>Stays</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActive(1)} >
                <Text style={{
                    fontFamily: 'mon-sb', fontSize: 18,
                    // textDecorationLine: active === 1 ? '#underline' : 'none',
                    color: active === 1 ? '#000' : Colors.grey,
                    borderBottomColor: active === 1 ? '#000' : '#fff',
                    borderBottomWidth: 1
                }}>Experiences</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ModalHeaderText

const styles = StyleSheet.create({})