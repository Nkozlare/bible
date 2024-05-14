import React, { useState, useEffect, useCallback, useRef } from "react";
import { Button, Image, Text, TouchableOpacity, View } from "react-native";
import { Audio } from "expo-av";
import { useFocusEffect } from "@react-navigation/native";
import Slider from "@react-native-community/slider";

const AudioPlayer = () => {
  const [ready, setReady] = useState(false);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const soundObject = useRef(null);

  useEffect(() => {
    const loadAudio = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require("../assets/audio/test.mp3")
        );
        soundObject.current = sound;
        setSound(sound);
        const newDuration = await sound.getStatusAsync();
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.positionMillis >= newDuration.durationMillis) {
            setIsPlaying(false);
          }
          setCurrentTime(status.positionMillis);
        });
        setDuration(newDuration.durationMillis);
        setReady(true);
      } catch (error) {
        console.log("Error loading audio:", error);
      }
    };

    loadAudio();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const handlePlayPause = async () => {
    const playback = await sound.getStatusAsync();
    if (sound) {
      if (playback.isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    }
  };

  const fastForward = () => {
    sound.setStatusAsync({
      positionMillis: currentTime + 15000,
    });
  };

  const rewind = () => {
    sound.setStatusAsync({
      positionMillis: currentTime - 15000,
    });
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        // Pause playback when the screen is unfocused
        sound?.pauseAsync();
      };
    }, [sound])
  );

  return (
    <View className="flex justify-center items-center p-6">
      <View className="flex flex-row items-center justify-center gap-6">
        <TouchableOpacity onPress={rewind}>
          <Image
            className="h-8 w-8"
            source={require("../assets/icons/rewind.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePlayPause}>
          <Image
            className="h-12 w-12"
            source={
              isPlaying
                ? require("../assets/icons/pause.png")
                : require("../assets/icons/play.png")
            }
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={fastForward}>
          <Image
            className="h-8 w-8"
            source={require("../assets/icons/forward.png")}
          />
        </TouchableOpacity>
      </View>
      {ready && (
        <Slider
          style={{ width: "100%", height: 40 }}
          minimumTrackTintColor="#713f13"
          maximumTrackTintColor="#71717a"
          thumbTintColor=""
          minimumValue={0}
          maximumValue={duration}
          value={currentTime}
          onSlidingComplete={(value) => {
            sound.setStatusAsync({
              positionMillis: value,
            });
          }}
        />
      )}
    </View>
  );
};

export default AudioPlayer;
