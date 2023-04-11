import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, Image } from 'react-native';
// import { collections } from '../data/data';
import AddCollection from '../components/AddCollection';
import { colors, bgColors } from '../data/data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';
import EditCollection from '../components/EditCollection';




export default function Home({ navigation }) {

    const [OpenModal, setOpenModal] = useState(false);
    const [OpenEditModal, setOpenEditModal] = useState(false);
    const [user, setUser] = useState({});
    const [collections, setCollections] = useState([]);
    const [CollectionId, setCollectionId] = useState(0)

    const AddCollections = (Collection) => {

        let PreData = [...collections];
        PreData.push(Collection);
        database()
            .ref('/users/' + user.uid)
            .set(PreData)
            .then(() => console.log('Added new Collection.'))
            .catch(error => console.log(error));

    }

    const EditCollections = (Collection, index) => {

        let PreData = [...collections];

        PreData[index].title = Collection.title,
            PreData[index].description = Collection.description,
            PreData[index].tags = [...Collection.tags],
            PreData[index].Notes = [...Collection.Notes]

        database()
            .ref('/users/' + user.uid)
            .set(PreData)
            .then(() => console.log('Edit Collection.'))
            .catch(error => console.log(error));

    }

    const deleteCollection = (i) => {

        let PreData = [...collections];
        PreData.splice(i, 1);
        database()
            .ref('/users/' + user.uid)
            .set(PreData)
            .then(() => console.log('collection deleted Successfully.'))
            .catch(error => console.log(error));

    }

    const setUserData = () => {

        database()
            .ref('/users/' + user.email)
            .set([{
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
            }])
            .then(() => console.log('Data set.'))
            .catch(error => console.log(error));



        // console.log("clicked")
    }



    useEffect(() => {
        GetUserData();
    }, [])


    const GetUserData = async () => {

        const userData = await AsyncStorage.getItem('user');

        let data = await JSON.parse(userData);
        setUser(data);

        database()
            .ref('/users/' + data.uid)
            .on('value', snapshot => {
                setCollections(snapshot.val());
                // console.log('User data: ', snapshot.val());
            })
            .then(() => console.log('fetch the data.'))
            .catch(error => console.log(error));

        // console.log("function is called");
    }

    // console.log("home " + AsyncStorage.getItem('user'));

    return (

        <View className="flex flex-col bg-white h-screen">




            {/* Model for add Collection */}


            <View className="flex flex-row justify-between items-center px-3  border-black mb-3 mt-5 mx-2">
                <Text className="text-lg font-medium">{user.displayName}</Text>
                <TouchableOpacity onPress={() =>
                    setOpenModal(true)
                    // setUserData()
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

            <Modal visible={OpenEditModal}>
                <View className="flex flex-col px-3 mt-10 h-screen">
                    <View className="flex flex-row justify-between items-center mx-2">
                        <Text className="text-black text-lg font-medium">Edit Collection!</Text>
                        <TouchableOpacity onPress={() => setOpenEditModal(false)}>
                            <Text className="bg-black text-white inline-block px-3 py-2 rounded-md shadow-md">X</Text>
                        </TouchableOpacity>
                    </View>
                    <EditCollection EditCollection={EditCollections} setOpenModal={setOpenEditModal} Data={collections[CollectionId]} Index={CollectionId} />
                </View>
            </Modal>




            {/* display the collections  */}

            <FlatList className="mt-3" data={collections} renderItem={({ item, index }) => (
                <TouchableOpacity onPress={() => navigation.navigate('collection', { item, path: `/${index}/` })}>
                    <View className="flex mx-3 my-2 px-4 py-2 bg-secondary rounded-md shadow-md">

                        <View className="flex-row justify-between">

                            <View>
                                <Text className="text-black font-medium py-1">{item.title}</Text>
                                <Text className="text-sky-500 pb-1 font-medium">{item.description}</Text>
                            </View>

                            <View className="flex-row w-[50px] justify-between">

                                {/* <TouchableOpacity onPress={setCollectionId(index)} >
                                    <Image
                                        className="my-1"
                                        style={{ resizeMode: 'cover', width: 24, height: 24 }}
                                        source={require('../assets/clone.png')}
                                    />
                                </TouchableOpacity> */}
                                <TouchableOpacity onPress={() => { deleteCollection(index) }} >
                                    <Image
                                        className="my-1"
                                        style={{ resizeMode: 'cover', width: 24, height: 24 }}
                                        source={require('../assets/delete.png')}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    setCollectionId(index);
                                    setOpenEditModal(true)
                                }} >
                                    <Image
                                        className="my-1"
                                        style={{ resizeMode: 'cover', width: 24, height: 24 }}
                                        source={require('../assets/edit.png')}
                                    />
                                </TouchableOpacity>

                            </View>

                        </View>


                        <View className="flex justify-start flex-row my-2 bg-secondary -z-10">
                            {
                                item.tags ? item.tags.map((tag, i) => {
                                    {/* console.log(colors[i % Object.keys(colors).length]); */ }
                                    return (
                                        <Text key={i} className={`bg-gray-200 text-gray-500 rounded-sm shadow-md inline-block px-2 py-1 mr-2`} > {tag}</Text>
                                    )
                                }) : null
                            }
                        </View>
                    </View>
                </TouchableOpacity>
            )
            } />
        </View >
    );
}




