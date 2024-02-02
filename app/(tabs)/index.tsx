import { View, Text } from "react-native";
import React, { useMemo, useState } from "react";
import { Link, Stack } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import listing from "@/components/Listing";
import listingData from '@/assets/data/airbnb-listings.json'
import listingGeoData from '@/assets/data/airbnb-listings-geodata.geo.json'
import ListingMaps from "@/components/ListingMaps";
import ListingBottomSheet from "@/components/ListingBottomSheet";
import Listing from "@/components/Listing";





const Index = () => {
  const [category, setCategory] = useState('Luxury Villa')
  const items = useMemo(() => listingData as any, [])

  const onDataChanged = (category: string) => {
    console.log('Changed _', category)
    setCategory(category)
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{
        header: () => <ExploreHeader onCategoryChange={onDataChanged} />
      }} />
      <Listing listing={items} category={category} />
      <ListingMaps listing={listingGeoData} />
      {/* <ListingBottomSheet listings={items} category={category} /> */}
    </View>
  );
};

export default Index;
