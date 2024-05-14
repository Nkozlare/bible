import unitImages from "../unitImages";
import {
  View,
  Image,
  ImageBackground,
  Text,
  ScrollView,
  Pressable,
} from "react-native";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { allInfo } from "../data";

export default function LessonsList({ chosenUnit, slug }) {
  const goBack = () => {
    router.back();
  };
  const [lessons, setLessons] = useState(null);
  useEffect(() => {
    setLessons(
      allInfo.lessons.filter((lesson) => lesson.unitId.toString() === slug)
    );
  }, []);
  return (
    lessons && (
      <View className="flex items-center justify-start bg-white min-h-screen min-w-full">
        <View className="bg-teal-700 min-w-full flex py-6 z-10">
          <Pressable onPress={goBack} className="fixed top-6 left-6 z-20">
            <Image
              source={require("../assets/icons/backArrow.png")}
              className="h-8 w-8"
            />
          </Pressable>
          <ImageBackground
            resizeMode="contain"
            source={unitImages[chosenUnit.image]}
            className="min-w-full"
          >
            <Text className="text-zinc-100 text-4xl p-6 pt-16 font-bold">
              {chosenUnit && chosenUnit.title.en}
            </Text>
          </ImageBackground>
        </View>
        <ScrollView className="px-6 selection:pt-6 flex flex-col gap-6 min-w-full h-full z-0">
          {lessons.length !== 0 ? (
            lessons.map((lesson, i) => {
              return (
                <Link key={i} href={`/${slug}/${lesson.id}`}>
                  <View className=" bg-zinc-200 rounded-lg shadow-lg py-8 px-4 flex flex-col gap-1">
                    <Text className="text-xl font-bold">
                      {i + 1}. {lesson.title.en}
                    </Text>
                    <View className="h-[2px] min-w-full bg-yellow-900"></View>
                    <Text className="text-lg">{lesson.reference.en}</Text>
                  </View>
                </Link>
              );
            })
          ) : (
            <Text className="text-xl text-zinc-800 pt-4 min-w-full text-center">
              There are no lessons in this unit
            </Text>
          )}
        </ScrollView>
      </View>
    )
  );
}
