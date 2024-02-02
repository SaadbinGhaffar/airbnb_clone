import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { Link } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import * as Haptics from 'expo-haptics'

const Categories = [
  { name: "Luxury Villa", icon: "villa" },
  { name: "Cozy Cabin", icon: "cottage" },
  { name: "Modern Apartment", icon: "apartment" },
  { name: "Beach House", icon: "beach-access" },
  { name: "Mountain Retreat", icon: "terrain" },
  { name: "City Loft", icon: "location-city" },
];

interface Prop{
    onCategoryChange:(category:string)=>void
}

const ExploreHeader = ({onCategoryChange}:Prop) => {
    const scrollRef=useRef<ScrollView>(null);
  const itemRef = useRef<Array<TouchableOpacity | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);


  const selectCategory = (index: number) => {

    const selected=itemRef.current[index]
    setActiveIndex(index);

    selected?.measure((x)=>{
        scrollRef.current?.scrollTo({x:0,y:0,animated:true})
    })

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    onCategoryChange(Categories[index].name)
  };

  return (
    <SafeAreaView style={{ paddingTop: 30 }}>
      <View style={styles.container}>
        <View style={styles.actionRow}>
          {/* {if we want to wrap smthing in link we use asChild} */}
          <Link href={"/(modals)/booking"} asChild>
            <TouchableOpacity style={styles.searchBtn}>
              <Ionicons name="search" size={24} />
              <View>
                <Text style={{ fontFamily: "mon-sb" }}>Where To?</Text>
                <Text style={{ fontFamily: "mon", color: Colors.grey }}>
                  AnyWhere ● Any Week ●{" "}
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons name="filter-circle-outline" size={40} />
          </TouchableOpacity>
        </View>
        <ScrollView
        ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: 30,
            paddingHorizontal: 16,
          }}
        >
          {Categories.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                selectCategory(index);
              }}
              ref={(el) => (itemRef.current[index] = el)}
              style={
                activeIndex === index
                  ? styles.categoriesBtnActive
                  : styles.categoriesBtn
              }
            >
              <MaterialIcons
                size={24}
                name={item.icon as any}
                color={activeIndex === index ? "#000" : Colors.grey}
              />
              <Text
                style={
                  activeIndex === index
                    ? styles.categoryTextActive
                    : styles.categoryText
                }
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ExploreHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: 140,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingBottom: 16,
    gap: 10,
  },
  filterBtn: {},
  searchBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderColor: "#c2c2c2",
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    padding: 14,
    borderRadius: 30,
    backgroundColor: "#fff",

    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  categoryText: {
    fontSize: 14,
    fontFamily: "mon-sb",
    color: Colors.grey,
  },
  categoryTextActive: {
    fontSize: 14,
    fontFamily: "mon-sb",
    color: "#000",
  },
  categoriesBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 8,
  },
  categoriesBtnActive: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#000",
    borderBottomWidth: 2,
    paddingBottom: 8,
  },
});
