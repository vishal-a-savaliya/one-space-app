import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal } from 'react-native';
import AddNotes from '../components/AddNotes';
import { colors } from '../data/data';


export default function Collection({ route, navigation }) {

    const param = route.params;
    const [OpenModal, setOpenModal] = useState(false);

    const AddNote = (Note) => {
        param.Notes.push(
            Note
        );
    }

    return (
        <View className="flex flex-col pt-2 bg-white h-screen">

            <Modal visible={OpenModal}>
                <View className="flex flex-col px-3 mt-10 h-screen">
                    <View className="flex flex-row justify-between items-center mx-2">
                        <Text className="text-black text-lg font-medium">Add Notes to {param.title}</Text>
                        <TouchableOpacity onPress={() => setOpenModal(false)}>
                            <Text className="bg-black text-white inline-block px-3 py-2 rounded-md shadow-md">X</Text>
                        </TouchableOpacity>
                    </View>
                    <AddNotes AddNote={AddNote} setOpenModal={setOpenModal} />
                </View>
            </Modal>



            <View className="flex flex-row justify-between items-center px-3  border-black mb-3 mt-3 mx-2">
                <Text className="text-lg font-medium">{param.title}</Text>
                <TouchableOpacity onPress={() => setOpenModal(true)}>
                    <Text className="px-3 py-2 rounded-md bg-black text-white">+</Text>
                </TouchableOpacity>
            </View>

            <FlatList className="mt-3" data={param.Notes} renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigation.navigate('collection', item)}>
                    <View className="flex mx-3 my-2 px-3 py-1 bg-secondary shadow-md rounded-sm">
                        <Text className="font-medium py-1">{item.title}</Text>
                        <Text className="text-sky-500 font-medium pb-1">{item.URL}</Text>
                        <View className="flex justify-start flex-row my-2">
                            {
                                item.tags.map((tag, i) => {
                                    {/* var bg = `bg-${colors[i % Object.keys(colors).length]}-200`;
                                    var text = `text-${colors[i % Object.keys(colors).length]}-500`; */}
                                    {/* console.log(bg, text); */ }
                                    return (
                                        <Text key={i} className={`bg-gray-200 text-gray-500 rounded-sm shadow-md inline-block px-2 py-1 mr-2`}>{tag}</Text>
                                    )
                                })
                            }
                        </View>
                    </View>
                </TouchableOpacity>
            )} />
        </View>
    );
}