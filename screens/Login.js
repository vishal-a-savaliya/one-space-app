import { View, Text, TouchableOpacity, Button, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {


    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    GoogleSignin.configure({
        webClientId: '860818350032-qpd1upsn26h24vf49gmdlr5f92dtl1e3.apps.googleusercontent.com',
    });

    async function onGoogleButtonPress() {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        // return auth().signInWithCredential(googleCredential);

        const user_sign_in = auth().signInWithCredential(googleCredential);
        user_sign_in.then((user) => {
            console.log("Login Successfully")
        })
            .catch((error) => {
                console.log(error);
            })

        console.log("login");
    }

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (user) {
        // console.log(user)
        AsyncStorage.setItem(
            'user',
            JSON.stringify(user)
        );
        navigation.navigate('Home');
    } else {
        console.log("No User!")
    }

    const LogOut = () => {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'))
            .catch((error) => console.log(error));
    }

    return (
        <View className="flex h-screen items-center">

            <View className="mt-10 mb-5">
                <Image
                    style={{ resizeMode: 'cover', width: 190, height: 520 }}
                    source={require('../assets/login_1.png')}
                />
            </View>
            {/* <Text className="text-3xl text-black font-bold my-3">1 SPACE</Text> */}

            {
                user ? <TouchableOpacity className="text-green-500 font-medium" onPress={() => LogOut()}>
                    <Text className="font-medium bg-black text-white py-2 px-4 rounded-sm shadow-md">LOGOUT</Text>
                </TouchableOpacity> : <Button
                    title="Sign-In With Google"
                    color="#000"
                    onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
                />
            }


            {/* <Text>{user.displayName}</Text>
            <Text>{user.email}</Text> */}
        </View>
    )
}

export default Login