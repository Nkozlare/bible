import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { allInfo } from "../../data";
import LessonsList from "../../pages/lessonsList";

export default function Page() {
  const { slug } = useLocalSearchParams();
  const [chosenUnit, setChosenUnit] = useState(null);
  useEffect(() => {
    setChosenUnit(
      allInfo.units.find((element) => element.slug.toString() === slug)
    );
  }, []);
  return chosenUnit && <LessonsList chosenUnit={chosenUnit} slug={slug} />;
}
