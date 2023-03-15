import { View, Text, TextInput, Button } from 'react-native'
import React, { useState } from 'react'

const AddCollection = ({ AddCollection, setOpenModal }) => {

    const [Collection, setCollection] = useState({

        "title": "",
        "description": "",
        "tags": [],
        "Notes": []

    });

    const [error, setError] = useState([false, false])

    const [Tags, setTags] = useState("");

    const handelInput = (value, key) => {

        let preCollection = { ...Collection };
        preCollection[key] = value;
        setCollection(preCollection);
    }

    const handelInputTags = () => {
        let preCollection = { ...Collection };
        preCollection.tags.push(Tags);
        setCollection(preCollection);
        setTags("");
    }

    const HandelAddCollection = () => {

        let preError = { ...error };

        if (Collection.title.length === 0) {
            preError[0] = true;
            setError(preError);
        }
        if (Collection.description.length === 0) {
            preError[1] = true;
            setError(preError);
        }

        if (!error[0] && !error[1] && Collection.title.length != 0 && Collection.description.length != 0) {
            AddCollection(Collection);
            setCollection({
                "title": "",
                "description": "",
                "tags": [],
                "Notes": []
            });
            setTags("");
            setOpenModal(false);
        }

    }

    return (
        <View>
            {/* <Text className="text-black font-medium text-center" >Add Collection</Text> */}
            <View className="flex flex-col mx-2  mt-10">

                {error[0] ? <Text className="text-rose-500 font-medium">Please Enter Title *</Text> : null}

                <TextInput placeholder='Enter Title' className="border-2 border-gray-600 text-black font-medium rounded-md px-3 py-2 h-10 my-1" name="title" onChangeText={(value) => handelInput(value, "title")} value={Collection.title} />

                {error[1] ? <Text className="text-rose-500 font-medium">Please Enter Valid description *</Text> : null}
                <TextInput placeholder='Enter description' className="border-2 border-gray-600 text-black font-medium rounded-md px-3 py-2 h-10 my-1" name="title" onChangeText={(value) => handelInput(value, "description")} value={Collection.description} />

                <TextInput placeholder='Enter #Tags for Collection' className="border-2 border-gray-600 text-black font-medium rounded-md px-3 py-2 h-10 my-1 mb-3" name="title" onChangeText={(value) => setTags(value)}
                    onSubmitEditing={handelInputTags} value={Tags} />

                <Button title='Add Collection' onPress={() => { HandelAddCollection() }}></Button>

            </View>

            <View className="flex justify-start flex-row mx-2 my-2 mt-5">
                {
                    Collection.tags.map((tag, i) => {
                        return (
                            <Text key={i} className={`bg-gray-200  text-gray-500 rounded-sm shadow-md inline-block px-2 py-1 mr-2`}>{tag}</Text>
                        )
                    })
                }
            </View>
        </View>
    )
}

export default AddCollection