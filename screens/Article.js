import { useState, useEffect } from 'react';
import { View, Text, useWindowDimensions, ScrollView } from 'react-native';
import RenderHtml from 'react-native-render-html';

function Article({ route, navigation }) {


  const [webData, setWebData] = useState(null);
  const [Loading, setLoading] = useState(false)

  const param = route.params;
  // console.log(param);

  useEffect(() => {
    Simplify()
  }, [])


  const Simplify = async () => {

    setLoading(true);

    const response = await fetch("https://one-space-backend.vercel.app/scrape", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ "url": param.URL })
    });

    // console.log(response)
    const data = await response.json();
    // console.log(data.html)
    setWebData(data);

    setLoading(false);
  }

  const { width } = useWindowDimensions();

  return (

    <View className="flex flex-col bg-white h-screen">

      {
        Loading ? <View className="h-full mx-10 font-semibold flex justify-center items-center"><Text className="text-xl text-sky-500" >Loading...</Text></View> :

          <ScrollView style={{ flex: 1 }} className="px-10">
            {
              webData ? <RenderHtml className="px-10"
                contentWidth={width}
                source={webData}
              /> : <View className="text-2xl mx-10 font-semibold flex justify-center items-center"><Text>Sorry We Could Not Found Web Content!</Text></View>
            }
          </ScrollView>
      }
    </View>
  )
}

export default Article