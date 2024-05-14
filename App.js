import { StatusBar } from "expo-status-bar";
import InfoProvider from "./InfoProvider";
import "react-native-gesture-handler";
import Home from "./pages/home";

export default function App() {
  return (
    <InfoProvider>
      <Home />
      <StatusBar style="auto" />
    </InfoProvider>
  );
}
