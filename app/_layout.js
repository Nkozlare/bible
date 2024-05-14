import InfoProvider from "../InfoProvider";
import { Slot } from "expo-router";

export default function HomeLayout() {
  return (
    <InfoProvider>
      <Slot />
    </InfoProvider>
  );
}
