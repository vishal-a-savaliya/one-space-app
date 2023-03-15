import { View, Text, TextInput, Button } from 'react-native'
import React, { useState } from 'react'

const AddNotes = ({ AddNote, setOpenModal }) => {


    const [Note, setNote] = useState({
        "title": "",
        "URL": "",
        "tags": [],
    });

    const [error, setError] = useState([false, false])

    const [Tags, setTags] = useState("");

    const handelInput = (value, key) => {

        let preNote = { ...Note };
        preNote[key] = value;
        setNote(preNote);
    }

    const handelInputTags = () => {
        let preNote = { ...Note };
        preNote.tags.push(Tags);
        setNote(preNote);
        setTags("");
    }

    const HandelAddNote = () => {

        let preError = { ...error };

        if (Note.title.length === 0) {
            preError[0] = true;
            setError(preError);
        }
        if (Note.URL.length === 0) {
            preError[1] = true;
            setError(preError);
        }

        if (!error[0] && !error[1] && Note.title.length != 0 && Note.URL.length != 0) {
            AddNote(Note);
            setNote({
                "title": "",
                "URL": "",
                "tags": [],
            });
            setTags("");
            setOpenModal(false);
        }

    }

    return (
        <View>
            {/* <Text className="text-black font-medium text-center" >Add Note</Text> */}
            <View className="flex flex-col mx-2  mt-10">

                {error[0] ? <Text className="text-rose-500 font-medium">Please Enter Title *</Text> : null}

                <TextInput placeholder='Enter Title' className="border-2 border-gray-600 text-black font-medium rounded-md px-3 py-2 h-10 my-1" name="title" onChangeText={(value) => handelInput(value, "title")} value={Note.title} />

                {error[1] ? <Text className="text-rose-500 font-medium">Please Enter Valid URL *</Text> : null}
                <TextInput placeholder='Enter URL' className="border-2 border-gray-600 text-black font-medium rounded-md px-3 py-2 h-10 my-1" name="title" onChangeText={(value) => handelInput(value, "URL")} value={Note.URL} />

                <TextInput placeholder='Enter #Tags for Note' className="border-2 border-gray-600 text-black font-medium rounded-md px-3 py-2 h-10 my-1 mb-3" name="title" onChangeText={(value) => setTags(value)}
                    onSubmitEditing={handelInputTags} value={Tags} />

                <Button title='Add Note' onPress={() => { HandelAddNote() }}></Button>

            </View>

            <View className="flex justify-start flex-row mx-2 my-2 mt-5">
                {
                    Note.tags.map((tag, i) => {
                        return (
                            <Text key={i} className={`bg-gray-200  text-gray-500 rounded-sm shadow-md inline-block px-2 py-1 mr-2`}>{tag}</Text>
                        )
                    })
                }
            </View>
        </View>
    )
}

export default AddNotes