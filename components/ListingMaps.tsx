import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { ListingGeo } from "@/interfaces/listingGeo";
import { useRouter } from "expo-router";
import MapView from 'react-native-map-clustering'
interface Props {
    listing: any;
}

const INITIAL_REGION = {
    latitude: 37.33,
    longitude: -122,
    latitudeDelta: 9,
    longitudeDelta: 9,
};
const ListingMaps = memo(({ listing }: Props) => {
    const router = useRouter();
    const onMarkerSelected = (item: Geolocation) => {
        router.push(`/listing/${item.properties.id}`);
    };

    const renderCluster = (cluster: any) => {
        const { id, geometry, onPress, properties } = cluster;
        const points = properties.point_count;

        return (
            <Marker
                key={`cluster-${id}`}
                coordinate={{
                    longitude: geometry.coordinates[0],
                    latitude: geometry.coordinates[1],
                }}
            >
                <View style={styles.marker}>
                    <Text style={{
                        textAlign: 'center',
                        fontFamily: 'mon-sb',
                        color: '#000'
                    }}>{points}</Text>
                </View>
            </Marker>
        );
    };

    return (
        <View style={styles.container}>
            <MapView

                animationEnabled={false}
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                showsUserLocation
                showsMyLocationButton
                initialRegion={INITIAL_REGION}
                clusterColor="#fff"
                clusterTextColor="#000"
                clusterFontFamily="mon-sb"
            >
                {listing.features.map((item: ListingGeo) => (
                    <Marker
                        onPress={() => onMarkerSelected(item)}
                        key={item.properties.id}
                        coordinate={{
                            latitude: +item.properties.latitude,
                            longitude: +item.properties.longitude,
                        }}
                    >
                        <View style={styles.marker}>
                            <Text style={styles.markerText}>$ {item.properties.price}</Text>
                        </View>
                    </Marker>
                ))}
            </MapView>
        </View>
    );
});

export default ListingMaps;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        height: "100%",
        width: "100%",
        flex: 1
    },
    marker: {
        alignItems: "center",
        justifyContent: "center",

        backgroundColor: "#fff",
        padding: 6,
        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.5,
        shadowRadius: 6,
        shadowOffset: {
            width: 1,
            height: 10,
        },
        borderRadius: 12,
    },
    markerText: {
        fontSize: 14,
        fontFamily: "mon-sb",
    },
});

