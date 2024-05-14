import { Text, View, Image, ScrollView } from "react-native";
import { allInfo } from "../data";
import unitImages from "../unitImages";
import { Link } from "expo-router";
import InfoContext from "../InfoContext";
import { useContext } from "react";
import DropdownComponent from "./dropdown";

export default function Home() {
  const { language, setLanguage } = useContext(InfoContext);
  const unitMap = allInfo.units.map((unit, i) => {
    return (
      <Link key={i} href={`/${unit.slug}`}>
        <View
          key={i}
          className="rounded-lg flex flex-col bg-zinc-200 max-w-full shadow-xl"
        >
          <View className="p-4">
            <Image
              source={unitImages[unit.image]}
              resizeMode="contain"
              className="max-w-full h-40 object-contain"
            />
          </View>
          <View className="rounded-b-lg bg-yellow-900">
            <Text className=" text-zinc-100 p-4 text-lg tracking-wide uppercase font-bold">
              {unit.title.en}
            </Text>
          </View>
        </View>
      </Link>
    );
  });
  return (
    <View className="flex items-center justify-start bg-white min-h-screen min-w-full">
      <View className="bg-teal-700 min-w-full flex p-6 pt-16 z-20">
        <Text className="text-zinc-100 text-4xl font-bold">BIBLE APP</Text>
      </View>
      <View className="min-w-full z-20 mb-6">
        <DropdownComponent />
      </View>
      <ScrollView className="flex-1 min-w-full px-8 pb-8 flex-col gap-12 z-10">
        {unitMap}
        <View className=" bg-transparent z-0"></View>
      </ScrollView>
    </View>
  );
}
