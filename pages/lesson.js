import {
  View,
  Image,
  ImageBackground,
  Text,
  ScrollView,
  Pressable,
} from "react-native";
import { Link, router } from "expo-router";
import AudioPlayer from "./audioPlayer";
import { useState } from "react";

export default function Lesson({ chosenLesson }) {
  const goBack = () => {
    router.back();
  };
  return (
    <ScrollView
      className="relative flex bg-white min-h-screen min-w-full"
      contentContainerStyle="items-center justify-start"
    >
      <View className="flex items-center justify-center h-36">
        <Image source={require("../assets/bible.png")} className="" />
      </View>
      <View className="bg-teal-700 min-w-full flex p-6 z-10 flex-row items-center justify-between">
        <Pressable onPress={goBack} className="z-20 pr-3">
          <Image
            source={require("../assets/icons/whiteBackArrow.png")}
            className="h-8 w-8"
          />
        </Pressable>
        <Text className="text-zinc-100 text-4xl font-bold">
          {chosenLesson.title.en}
        </Text>
      </View>
      <AudioPlayer />
      <View className="flex flex-col gap-4 px-6 pb-6 self-center">
        <Text className="text-zinc-500 text-xs">
          In the name of God, Most Gracious, Most Merciful.
        </Text>
        <Text className="text-3xl font-light text-zinc-800">
          {chosenLesson.reference.en}
        </Text>
        <View className="h-[2px] bg-yellow-900 min-w-[90%]"></View>
        <View className="flex flex-col gap-4 max-w-full">
          {chosenLesson.passages.map((passage, i) => {
            return (
              <Text key={i} className="text-zinc-600 w-[85%]">
                {passage.en}
              </Text>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}
