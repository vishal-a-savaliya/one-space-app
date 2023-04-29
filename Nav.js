import React from 'react'
import { Text, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

//screens
import Login from './screens/Login';
import Home from './screens/Home'
import Collection from './screens/Collection'
import Article from './screens/Article';

const Stack = createNativeStackNavigator();

const Nav = () => {

    const navigation = useNavigation();

    return (
        <Stack.Navigator
        // screenOptions={{
        //     headerShown: false,
        // }}
        >

            <Stack.Screen name="ONE SPACE" component={Login} />
            <Stack.Screen name="Home" component={Home} options={{
                headerBackVisible: false,
                headerRight: () => (
                    <TouchableOpacity onPress={() => navigation.navigate('ONE SPACE')}>
                        <Text
                            className="font-extrabold text-green-500"
                        >Profile</Text>
                    </TouchableOpacity>

                ),
            }} />
            <Stack.Screen name="collection" component={Collection} />
            <Stack.Screen name="Article" component={Article} />

        </Stack.Navigator>
    )
}

export default Nav