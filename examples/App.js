import * as React from "react";
import { View, Text } from "react-native";
import RNDotIntro from "react-native-dot-intro";

const colors = [
  {
    initialBgColor: "goldenrod",
    bgColor: "#222",
    nextBgColor: "#222",
  },
  {
    initialBgColor: "goldenrod",
    bgColor: "#222",
    nextBgColor: "yellowgreen",
  },
  {
    initialBgColor: "#222",
    bgColor: "yellowgreen",
    nextBgColor: "midnightblue",
  },
  // {
  //   initialBgColor: "yellowgreen",
  //   bgColor: "midnightblue",
  //   nextBgColor: "turquoise",
  // },
  // {
  //   initialBgColor: "midnightblue",
  //   bgColor: "turquoise",
  //   nextBgColor: "goldenrod",
  // },
  // {
  //   initialBgColor: "turquoise",
  //   bgColor: "goldenrod",
  //   nextBgColor: "#222",
  // },
];
const duration = 1000;
const textDuration = 1000 * 0.8;
const quotes = [
  {
    quote:
      "For the things we have to learn before we can do them, we learn by doing them.",
    author: "Aristotle, The Nicomachean Ethics",
  },
  {
    quote: "The fastest way to build an app.",
    author: "The Expo Team",
  },
  {
    quote:
      "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
  },
  // {
  //   quote: "The way to get started is to quit talking and begin doing.",
  //   author: "Walt Disney",
  // },
  // {
  //   quote:
  //     "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking.",
  //   author: "Steve Jobs",
  // },
  // {
  //   quote:
  //     "If life were predictable it would cease to be life, and be without flavor.",
  //   author: "Eleanor Roosevelt",
  // },
  // {
  //   quote:
  //     "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.",
  //   author: "Oprah Winfrey",
  // },
  // {
  //   quote:
  //     "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
  //   author: "James Cameron",
  // },
  // {
  //   quote: "Life is what happens when you're busy making other plans.",
  //   author: "John Lennon",
  // },
];

export default function App() {
  return (
    <View
      style={{
        flex: 1
      }}
    >
      <RNDotIntro
        colors={colors}
        duration={duration}
        textDuration={textDuration}
        quotes={quotes}
      />
    </View>
  );
}
