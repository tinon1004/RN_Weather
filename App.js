import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Pressable, FlatList } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const CITY = ["Seoul", "Tokyo", "Beijing", "Shanghai"];
const APIKEY = "8a3422fcc88e71d19c156d16f02656a7";

export default function App() {
  const [isReady, setReady] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [region, setRegion] = React.useState("Seoul");

  React.useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${region}&appid=${APIKEY}`);
        const json = await response.json();
        console.log(json);
        setData(json);
      } catch (err) {
        console.log(err);
      }
    }, 0);
    return () => {
      clearTimeout(timer);
    };
  }, [region]);

  const renderItem = ({ item, index }) => {
    return (
      <Pressable
        style={{
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: item === region ? "#8283eb" : "#BEC0D1",
          marginHorizontal: wp(3),
          width: wp(20),
          height: hp(5),
        }}
        onPress={() => setRegion(item)}
      >
        <Text style={{ color: "#fff" }}>{item}</Text>
      </Pressable>
    );
  };
  const renderItem2 = ({ item, index }) => {
    return (
      <View
        style={{
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          marginTop: hp(2),
          marginHorizontal: wp(4),
          width: wp(30),
          height: wp(30),
        }}
      >
        <Text style={{ color: "#8283eb", fontSize: hp(2), marginBottom: 10, fontWeight: "bold" }}>{item.key}</Text>
        <Text style={{ color: "#123269", fontSize: hp(2) }}>{item.value}</Text>
      </View>
    );
  };

  if (isReady) {
    return (
      <View style={styles.container2}>
        <View>
          <FlatList showsHorizontalScrollIndicator={false} horizontal data={CITY} renderItem={renderItem} keyExtractor={(item, index) => index.toString()} />
        </View>
        <View style={{ marginTop: hp(5), alignSelf: "center", width: wp(70), height: hp(40), backgroundColor: "#fff", borderRadius: 20 }}>
          <Image
            style={{ width: wp(60), height: wp(60), alignSelf: "center" }}
            source={{
              uri: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            }}
          />
          <Text style={{ textAlign: "center", fontSize: 40, fontWeight: "bold" }}>{data.weather[0].main}</Text>
          <Text style={{ textAlign: "center", fontSize: 20, color: "#bbb" }}>{data.weather[0].description}</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <FlatList
            numColumns={2}
            data={[
              { key: "최저 기온", value: data.main.temp_min },
              { key: "최고 기온", value: data.main.temp_max },
              { key: "기압", value: data.main.pressure },
              { key: "습도", value: data.main.humidity },
            ]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem2}
          />
        </View>
        <StatusBar style="auto" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Image style={{ marginTop: hp(25), width: wp(90), height: wp(50), alignSelf: "center" }} source={require("./assets/image.png")} />
      <Text style={{ marginTop: hp(5), width: wp(70), textAlign: "center", alignSelf: "center", fontSize: hp(3) }}>
        <Text style={{ color: "#8283eb", fontWeight: "bold" }}>Find</Text> your weather predictions in your City
      </Text>
      <Text style={{ marginTop: hp(2), width: wp(70), textAlign: "center", alignSelf: "center", fontSize: hp(2), color: "#123269" }}>
        간편하게 날씨를 확인하세요!
      </Text>
      <Pressable
        style={{
          width: wp(50),
          height: hp(6),
          marginTop: hp(15),
          backgroundColor: "#8283eb",
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
        }}
        onPress={() => setReady(true)}
      >
        <Text style={{ fontSize: hp(2), color: "white", fontWeight: "bold" }}>시작하기</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dcebff",
  },
  container2: {
    flex: 1,
    backgroundColor: "#dcebff",
    paddingTop: hp(10),
  },
});