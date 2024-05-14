import { useEffect, useState } from "react";
import Lesson from "../../pages/lesson";
import { useLocalSearchParams } from "expo-router";
import { allInfo } from "../../data";
import { Pressable, Text, View } from "react-native";
import { Link, router } from "expo-router";
export default function Page() {
  const goBack = () => {
    router.back();
  };
  const { slug, lesson } = useLocalSearchParams();
  const [chosenLesson, setChosenLesson] = useState(null);
  useEffect(() => {
    setChosenLesson(
      allInfo.lessons.find(
        (specificLesson) => specificLesson.id.toString() === lesson
      )
    );
  }, []);
  return chosenLesson ? (
    <Lesson slug={slug} lessonId={lesson} chosenLesson={chosenLesson} />
  ) : (
    <View className="min-w-full min-h-screen flex justify-center items-center">
      <Text>
        Unable to find Lesson:{" "}
        <Pressable onPress={goBack}>
          <Text>Go Back</Text>
        </Pressable>
      </Text>
    </View>
  );
}
