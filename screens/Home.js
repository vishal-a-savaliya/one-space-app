import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal } from 'react-native';
import { collections } from '../data/data';
import AddCollection from '../components/AddCollection';
import { colors } from '../data/data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../config/firebaseConfig';
import database from '@react-native-firebase/database';

export default function Home({ navigation }) {

    const [OpenModal, setOpenModal] = useState(false);
    const [user, setUser] = useState({});

    const AddCollections = (Collection) => {
        collections.push(
            Collection
        );
    }

    const setUserData = () => {

        // set(ref(db, 'users/' + user.uid), {
        //     "title": "My Notes",
        //     "description": "My first collection!",
        //     "tags": ["Quick share", "My Notes"],
        //     "Notes": [
        //         {
        //             "title": "Documentation",
        //             "URL": "https://onespace.com",
        //             "tags": ["Docs", "How To Use"],
        //         }
        //     ]
        // }).catch(error => console.log(error));

        database()
            .ref('/users/' + user.uid)
            .set({
                "title": "My Notes",
                "description": "My first collection!",
                "tags": ["Quick share", "My Notes"],
                "Notes": [
                    {
                        "title": "Documentation",
                        "URL": "https://onespace.com",
                        "tags": ["Docs", "How To Use"],
                    }
                ]
            })
            .then(() => console.log('Data set.'))
            .catch(error => console.log(error));

        console.log("clicked")
    }

    useEffect(() => {
        GetUserData();
    }, [])


    const GetUserData = async () => {

        const userData = await AsyncStorage.getItem('user');

        let data = JSON.parse(userData);
        setUser(data);

        console.log(data);

    }

    // console.log("home " + AsyncStorage.getItem('user'));

    return (

        <View className="flex flex-col bg-white h-screen">

            <View className="flex flex-row justify-between items-center px-3  border-black mb-3 mt-5 mx-2">
                <Text className="text-lg font-medium">{user.displayName}</Text>
                <TouchableOpacity onPress={() =>
                    //setOpenModal(true)
                    setUserData()
                }>
                    <Text className="px-3 py-2 rounded-md bg-black text-white">+</Text>
                </TouchableOpacity>
            </View>

            <Modal visible={OpenModal}>
                <View className="flex flex-col px-3 mt-10 h-screen">
                    <View className="flex flex-row justify-between items-center mx-2">
                        <Text className="text-black text-lg font-medium">Add Collection to My Space</Text>
                        <TouchableOpacity onPress={() => setOpenModal(false)}>
                            <Text className="bg-black text-white inline-block px-3 py-2 rounded-md shadow-md">X</Text>
                        </TouchableOpacity>
                    </View>
                    <AddCollection AddCollection={AddCollections} setOpenModal={setOpenModal} />
                </View>
            </Modal>



            <FlatList className="mt-3" data={collections} renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigation.navigate('collection', item)}>
                    <View className="flex mx-3 my-2 px-4 py-2 bg-secondary rounded-md shadow-md">
                        <Text className="text-black font-medium py-1">{item.title}</Text>
                        <Text className="text-sky-500 pb-1 font-medium">{item.description}</Text>
                        <View className="flex justify-start flex-row my-2 bg-secondary">
                            {
                                item.tags.map((tag, i) => {
                                    {/* console.log(colors[i % Object.keys(colors).length]); */ }
                                    return (
                                        <Text key={i} className={`bg-gray-200 text-gray-500 rounded-sm shadow-md inline-block px-2 py-1 mr-2`} > {tag}</Text>
                                    )
                                })
                            }
                        </View>
                    </View>
                </TouchableOpacity>
            )
            } />
        </View >
    );
}



