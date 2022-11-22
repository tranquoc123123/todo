import React from "react";
import {
    Animated,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    useWindowDimensions
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import {
    TabView,
    SceneMap
} from 'react-native-tab-view';

const FirstRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
);

const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
});

export default function TabListView() {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Priority' },
        { key: 'second', title: 'Weekly Task' },
    ]);
    return (
        <SafeAreaView style={{
            flexDirection: 'row',


        }}>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}

            />

        </SafeAreaView>
    )
};