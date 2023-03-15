import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import Home from './screens/Home'
import Collection from './screens/Collection'

const Stack = createNativeStackNavigator();

const Nav = () => {
    return (
        <Stack.Navigator
        // screenOptions={{
        //     headerShown: false,
        // }}
        >

            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="collection" component={Collection} />

        </Stack.Navigator>
    )
}

export default Nav