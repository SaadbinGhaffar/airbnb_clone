import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import { BlurView } from 'expo-blur'
import Animated, { FadeIn, FadeOut, SlideInDown } from 'react-native-reanimated'
import { defaultStyles } from '@/constants/Styles'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import Colors from '@/constants/Colors'
import { places } from '@/assets/data/places'
// @ts-ignore
import DatePicker from 'react-native-modern-datepicker'

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

const guestsGropus = [
  {
    name: 'Adults',
    text: 'Ages 13 or above',
    count: 0,
  },
  {
    name: 'Children',
    text: 'Ages 2-12',
    count: 0,
  },
  {
    name: 'Infants',
    text: 'Under 2',
    count: 0,
  },
  {
    name: 'Pets',
    text: 'Pets allowed',
    count: 0,
  },
];


const Booking = () => {

  const router = useRouter();
  const [selectedPlace, setSelectedPlace] = useState(0);
  const [openCard, setOpenCard] = useState(0)
  const [groups, setGroups] = useState(guestsGropus)
  const today = new Date().toISOString().substring(0, 10)
  const [count, setCount] = useState(0)

  const decrease = () => {
    if (count >= 0) { setCount(count - 1); }
  }
  const increase = () => {
    setCount(count + 1);
  }

  const onClearAll = () => {
    setOpenCard(0)
    setSelectedPlace(0)
    setGroups(guestsGropus)
  }

  const selectPlace = (index: any) => {
    setSelectedPlace(index === selectedPlace ? null : index);
  };



  return (
    <BlurView intensity={100} style={styles.container}>
      {/* {Where} */}
      <View style={styles.card}>
        {openCard != 0 && (
          <AnimatedTouchableOpacity onPress={() => setOpenCard(0)}
            style={styles.cardPreview}
            entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)}
          >
            <Text style={styles.previewText} >Where?</Text>
            <Text style={styles.previewDate} >I am  Fexible</Text>
          </AnimatedTouchableOpacity>
        )}
        {openCard === 0 && (
          <>
            <Animated.Text entering={FadeIn} style={styles.cardHeader}>Where To?</Animated.Text>
            <Animated.View style={styles.cardBody}>
              <View style={styles.searchSection}>
                <Ionicons name='search' size={20} color='#000' style={styles.searchIcon} />
                <TextInput style={styles.inputField} placeholder='Search Destination' placeholderTextColor={Colors.grey} ></TextInput>
              </View>

            </Animated.View>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{ paddingLeft: 10 }} >
              <View>
                <FlatList
                  data={places}
                  keyExtractor={(item) => item.title}
                  horizontal
                  renderItem={({ item, index }) => (
                    <TouchableOpacity key={item.id} onPress={() => selectPlace(index)}>
                      <View style={styles.placeContainer}>
                        <Image
                          source={item.img}
                          style={[styles.placeImage, selectedPlace === index && styles.selectedPlace]}
                        />
                        <Text style={{ fontFamily: 'mon-sb' }}>{item.title}</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </ScrollView>
          </>
        )}
      </View>

      {/* {When} */}
      <View style={styles.card}>
        {openCard != 1 && (
          <AnimatedTouchableOpacity onPress={() => setOpenCard(1)}
            style={styles.cardPreview}
            entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)}
          >
            <Text style={styles.previewText} >When?</Text>
            <Text style={styles.previewDate} >Any Week</Text>
          </AnimatedTouchableOpacity>
        )}
        {openCard === 1 && (
          <>
            <Animated.Text style={styles.cardHeader}>When's your Trip?</Animated.Text>
            <Animated.View style={styles.cardBody}>
              <DatePicker
                current={today}
                selected={today}
                mode={'Calender'}
                options={{
                  headerFont: 'mon-sb',
                  defaultFont: 'mon',
                  borderColor: 'transparent',
                  mainColor: Colors.primary
                }} />
            </Animated.View>
          </>
        )}
      </View>


      {/* {Who} */}
      <View style={styles.card}>
        {openCard != 2 && (
          <AnimatedTouchableOpacity onPress={() => setOpenCard(2)}
            style={styles.cardPreview}
            entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)}
          >
            <Text style={styles.previewText} >Who?</Text>
            <Text style={styles.previewDate} >Add Guests</Text>
          </AnimatedTouchableOpacity>
        )}
        {openCard === 2 && (
          <>
            <Animated.Text style={styles.cardHeader}>Whos's Coming?</Animated.Text>
            <Animated.View style={styles.cardBody}>
              {groups.map((item, index) => (
                <View key={index} style={[styles.guestItems, index + 1 < guestsGropus.length ? styles.itemBorder : null]} >
                  <View>
                    <Text style={{ fontFamily: 'mon-sb', fontSize: 16 }}>{item.name}</Text>
                    <Text style={{ fontFamily: 'mon', fontSize: 14 }}>{item.text}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'center' }} >
                    <TouchableOpacity onPress={() => {
                      const newGroup = [...groups]
                      newGroup[index].count = newGroup[index].count > 0 ? newGroup[index].count - 1 : 0
                      setGroups(newGroup)
                    }}>
                      <Ionicons name='remove-circle-outline' size={18} color={groups[index].count > 0 ? Colors.grey : '#cdcdcd'} />
                    </TouchableOpacity>
                    <Text
                      style={{ fontFamily: 'mon', fontSize: 16, minWidth: 18, textAlign: 'center' }}
                    >{item.count}</Text>
                    <TouchableOpacity onPress={() => {
                      const newGroup = [...groups]
                      newGroup[index].count++
                      setGroups(newGroup)

                    }}>
                      <Ionicons name='add-circle-outline' size={18} color={Colors.grey} />

                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </Animated.View>
          </>
        )}
      </View>

      {/* {Footer Part} */}
      <Animated.View style={defaultStyles.footer} entering={SlideInDown.delay(200)} >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
          <TouchableOpacity onPress={onClearAll} ><Text style={{ fontFamily: 'mon-sb', fontSize: 18, textDecorationLine: 'underline' }} > Clear All</Text></TouchableOpacity>
          {/* <TouchableOpacity style={[{ flexDirection: 'row', alignItems: 'center', }, defaultStyles.btn]}>
            <Ionicons name='search' size={24} />
            <TouchableOpacity
              onPress={() => router.back()}
              style={defaultStyles.btn}
            ><Text>Search</Text></TouchableOpacity>
          </TouchableOpacity> */}

          <TouchableOpacity onPress={() => router.back()}
            style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 50 }]}
          >
            <Ionicons name='search' size={24} color='#fff' style={defaultStyles.btnIcon} />
            <Text style={defaultStyles.btnText} >Search</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </BlurView>
  )
}

export default Booking

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    margin: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    gap: 20
  },
  previewText: {
    fontFamily: 'mon-sb',
    fontSize: 14,
    color: Colors.grey
  },
  previewDate: {
    fontFamily: 'mon-sb',
    fontSize: 14,
    color: Colors.dark
  },
  cardPreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20
  },
  cardHeader: {
    padding: 20,
    fontSize: 20,
    fontFamily: 'mon-sb'
  },
  cardBody: {
    paddingHorizontal: 20,
    paddingBottom: 0
  },
  searchSection: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: '#000',
    marginBottom: 0

  },
  inputField: {
    flex: 1,

  },
  searchIcon: {
    padding: 10
  },
  placeContainer: {
    marginHorizontal: 10,
    alignItems: 'center'
  },
  placeImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  selectedPlace: {
    borderWidth: 1,
    borderColor: '#000', // Change the color as needed
  },
  guestItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16
  },
  itemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.grey
  }
})










