import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, Image, ToastAndroid } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import AddNotes from '../components/AddNotes';
import { textColors, bgColors } from '../data/data';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DeviceEventEmitter } from "react-native"
import { GetUserData } from './Home';
import EditNote from '../components/EditNote';



export default function Collection({ route, navigation }) {

    const param = route.params;
    const [OpenModal, setOpenModal] = useState(false);
    const [OpenEditModal, setOpenEditModal] = useState(false);
    const [NoteID, setNoteID] = useState(0)

    const [Notes, setNotes] = useState([]);

    console.log(Notes);


    console.log('/users/uid' + param.path + "Notes/")


    useEffect(() => {
        GetNotes()
    }, []);


    function showToast() {
        ToastAndroid.show('Copied To Clipboard', ToastAndroid.SHORT);
    }


    const GetNotes = async () => {

        const userData = await AsyncStorage.getItem('user');

        let data = await JSON.parse(userData);

        database()
            .ref('/users/' + data.uid + param.path + "Notes")
            .on('value', snapshot => {
                setNotes(snapshot.val() ? snapshot.val() : []);
                console.log('notes: ', snapshot.val());
            })
            .then(() => console.log('fetch the Notes.'))
            .catch(error => console.log(error));

    }


    const AddNote = async (Note) => {

        let preNote = [...Notes];
        preNote.push(Note);
        // console.log(preNote);

        const userData = await AsyncStorage.getItem('user');

        let data = await JSON.parse(userData);

        database()
            .ref('/users/' + data.uid + param.path + "Notes")
            .set(preNote)
            .then(() => {
                console.log("Note Added successfully");
            })
            .catch(error => console.log(error));
    }

    const DeleteNote = async (index) => {

        let preNotes = [...Notes];
        preNotes.splice(index, 1);


        const userData = await AsyncStorage.getItem('user');

        let data = await JSON.parse(userData);

        database()
            .ref('/users/' + data.uid + param.path + "Notes")
            .set(preNotes)
            .then(() => {
                console.log("Note Deleted successfully");
            })
            .catch(error => console.log(error));
    }

    const Editnote = async (Note, index) => {

        let preNote = [...Notes];
        // preNote.push(Note);
        // console.log(preNote);
        preNote[index].title = Note.title;
        preNote[index].url = Note.url;
        preNote[index].tags = [...Note.tags];

        const userData = await AsyncStorage.getItem('user');

        let data = await JSON.parse(userData);

        database()
            .ref('/users/' + data.uid + param.path + "Notes")
            .set(preNote)
            .then(() => {
                console.log("Note Edited successfully");
            })
            .catch(error => console.log(error));
    }





    return (
        <View className="flex flex-col pt-2 bg-white h-screen">


            {/* Model to Add Notes */}

            <Modal visible={OpenModal}>
                <View className="flex flex-col px-3 mt-10 h-screen">
                    <View className="flex flex-row justify-between items-center mx-2">
                        <Text className="text-black text-lg font-medium">Add Notes to {param.item.title}</Text>
                        <TouchableOpacity onPress={() => setOpenModal(false)}>
                            <Text className="bg-black text-white inline-block px-3 py-2 rounded-md shadow-md">X</Text>
                        </TouchableOpacity>
                    </View>
                    <AddNotes AddNote={AddNote} setOpenModal={setOpenModal} />
                </View>
            </Modal>


            <Modal visible={OpenEditModal}>
                <View className="flex flex-col px-3 mt-10 h-screen">
                    <View className="flex flex-row justify-between items-center mx-2">
                        <Text className="text-black text-lg font-medium">Edit Note!</Text>
                        <TouchableOpacity onPress={() => setOpenEditModal(false)}>
                            <Text className="bg-black text-white inline-block px-3 py-2 rounded-md shadow-md">X</Text>
                        </TouchableOpacity>
                    </View>
                    <EditNote EditNote={Editnote} setOpenModal={setOpenEditModal} Data={Notes[NoteID]} Index={NoteID} />
                </View>
            </Modal>



            <View className="flex flex-row justify-between items-center px-3  border-black mb-3 mt-3 mx-2">
                <Text className="text-lg font-medium">{param.item.title}</Text>
                <TouchableOpacity onPress={() => setOpenModal(true)}>
                    <Text className="px-3 py-2 rounded-md bg-black text-white">+</Text>
                </TouchableOpacity>
            </View>




            {/* Display the Notes */}

            <FlatList className="mt-3 mb-20" data={Notes} renderItem={({ item, index }) => (


                // console.log(item)

                <TouchableOpacity onPress={() => navigation.navigate('Article', { url: item.url })}>
                    <View className="flex mx-3 my-2 px-3 py-1 bg-secondary shadow-md rounded-sm">

                        <View className="flex-row justify-between">

                            <View>
                                <Text className="font-medium py-1">{item.title}</Text>
                                <Text className="text-sky-500 font-medium pb-1">{item.url}</Text>
                            </View>

                            <View className="flex-row w-[65px] justify-between">

                                <TouchableOpacity onPress={() => { Clipboard.setStringAsync(item.url); showToast() }}>
                                    <Image
                                        className="my-1"
                                        style={{ resizeMode: 'cover', width: 24, height: 24 }}
                                        source={require('../assets/clone.png')}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { DeleteNote(index) }} >
                                    <Image
                                        className="my-1"
                                        style={{ resizeMode: 'cover', width: 24, height: 24 }}
                                        source={require('../assets/delete.png')}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    setNoteID(index);
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


                        <View className="flex justify-start flex-row my-2">
                            {
                                item.tags ? item.tags.map((tag, i) => {

                                    return (
                                        <Text key={i} className={`bg-gray-200 text-gray-500 rounded-sm shadow-md inline-block px-2 py-1 mr-2`}>{tag}</Text>
                                    )
                                }) : null
                            }
                        </View>
                    </View>
                </TouchableOpacity>
            )} />



        </View>
    );
}


// {/* var bg = `bg-${colors[i % Object.keys(colors).length]}-200`;
//                                     var text = `text-${colors[i % Object.keys(colors).length]}-500`; */}
// {/* console.log(bg, text); */ }