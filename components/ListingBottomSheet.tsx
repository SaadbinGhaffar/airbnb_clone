import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useMemo, useRef } from 'react'
import { listing } from '@/interfaces/listing'
import BottomSheet from '@gorhom/bottom-sheet'
import Listing from "@/components/Listing";
import { Ionicons } from "@expo/vector-icons";

interface Props {
    listings: any[],
    category: string
}

const ListingBottomSheet = ({ listings, category }: Props) => {

    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['10%', '100%'], [])

    const showMap = () => {

    }
    return (

        <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints} index={1}>
            <View style={{ flex: 1 }}>
                <Listing listing={listings} category={category} />

            </View>
        </BottomSheet>

    )
}

export default ListingBottomSheet

const styles = StyleSheet.create({
    absoluteBtn: {
        position: 'absolute',
        bottom: 30,
        width: '100%',
        alignItems: "center"
    },
    btn: {
        backgroundColor: '#000'

    }
})



// import React, { useMemo, useRef } from 'react';
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import BottomSheet from '@gorhom/bottom-sheet';
// import { Ionicons } from "@expo/vector-icons";
// import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
// import Listing from "@/components/Listing";
// import { listing } from '@/interfaces/listing';

// interface Props {
//     listings: listing[],
//     category: string
// }

// const ListingBottomSheet = ({ listings, category }: Props) => {
//     const bottomSheetRef = useRef<BottomSheet>(null);
//     const snapPoints = useMemo(() => ['10%', '100%'], []);

//     const showMap = () => {
//         // Your map logic here
//     };

//     return (
//         <BottomSheetModalProvider>
//             <View style={{ flex: 1 }}>
//                 <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints}
//                 enablePanDownToClose={false}

//                 >
//                     <View style={{ flex: 1 }}>
//                         <Listing listing={listings} category={category} />
//                         <View style={styles.absoluteBtn}>
//                             <TouchableOpacity onPress={showMap} style={styles.btn}>
//                                 <Text>Map</Text>
//                                 <Ionicons name='map' size={20} color='#fff' />
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 </BottomSheet>
//             </View>
//         </BottomSheetModalProvider>
//     );
// };

// const styles = StyleSheet.create({
//     absoluteBtn: {
//         position: 'absolute',
//         bottom: 30,
//         width: '100%',
//         alignItems: "center"
//     },
//     btn: {
//         backgroundColor: '#000'
//     }
// });

// export default ListingBottomSheet;




