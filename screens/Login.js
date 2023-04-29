import { View, Text, TouchableOpacity, Button, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';

const Login = ({ navigation }) => {


    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [userExist, setUserExist] = useState(false);

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
            console.log(user);
            setData(user)

        })
            .catch((error) => {
                console.log(error);
            })

        // console.log("login");
    }

    const setData = async (user) => {

        await database()
            .ref('/users/' + user.user.uid)
            .once("value", snapshot => {
                if (snapshot.exists()) {
                    console.log("exists!");
                    setUserExist(true);
                } else {
                    setUserExist(false);
                    database()
                        .ref('/users/' + user.user.uid)
                        .set([{
                            "title": user.user.displayName + "'s Notes",
                            "description": "My first collection!",
                            "tags": ["Quick share", "My Notes"],
                            "Notes": [
                                {
                                    "title": "Documentation",
                                    "url": "https://onespace.com",
                                    "tags": ["Docs", "How To Use"],
                                }
                            ]
                        }])
                        .then(() => console.log('Data set.'))
                        .catch(error => console.log(error));
                }
            })
            .then(() => console.log('USER AVAILABLE CHECK'))
            .catch(error => console.log(error));

        // if (!userExist) {

        // }

        if (user.user) {
            // console.log(user)
            AsyncStorage.setItem(
                'user',
                JSON.stringify(user.user)
            );
            navigation.navigate('Home');
        } else {
            console.log("No User!")
        }
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



    const LogOut = () => {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'))
            .catch((error) => console.log(error));
    }

    return (
        <View className="flex h-screen items-center">


            {/* <Text className="text-3xl text-black font-bold my-3">1 SPACE</Text> */}

            {
                user ? <View className="flex w-full h-screen items-center pt-20">

                    <View className="mb-5">
                        <Image
                            style={{ resizeMode: 'cover', width: 110, height: 300 }}
                            source={require('../assets/login_1.png')}
                        />
                    </View>

                    <Text className="py-2 text-xl font-semibold">Hello {user.displayName} ! 😎</Text>
                    <Text className="pb-2 mb-4 text-lg font-semibold">How it's Going...</Text>

                    <View className="flex flex-row">
                        <TouchableOpacity className="mr-4" onPress={() => navigation.navigate('Home')}>

                            <Text className="font-medium bg-black text-white py-2 px-4 rounded-md shadow-md">HOME</Text>

                        </TouchableOpacity>
                        <TouchableOpacity className="text-green-500 font-medium" onPress={() => LogOut()}>

                            <Text className="font-medium bg-black text-white py-2 px-4 rounded-md shadow-md">LOGOUT</Text>

                        </TouchableOpacity>
                    </View>



                </View>
                    : <View>

                        <View className="mt-10 mb-5">
                            <Image
                                style={{ resizeMode: 'cover', width: 190, height: 520 }}
                                source={require('../assets/login_1.png')}
                            />
                        </View>

                        <Button
                            title="Sign-In With Google"
                            color="#000"
                            onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
                        />
                    </View>
            }


            {/* <Text>{user.displayName}</Text>
            <Text>{user.email}</Text> */}
        </View>
    )
}

export default Login