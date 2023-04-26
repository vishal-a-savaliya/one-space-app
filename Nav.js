import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import Login from './screens/Login';
import Home from './screens/Home'
import Collection from './screens/Collection'
import Article from './screens/Article';

const Stack = createNativeStackNavigator();

const Nav = () => {
    return (
        <Stack.Navigator
        // screenOptions={{
        //     headerShown: false,
        // }}
        >

            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="collection" component={Collection} />
            <Stack.Screen name="Article" component={Article} />

        </Stack.Navigator>
    )
}

export default Nav