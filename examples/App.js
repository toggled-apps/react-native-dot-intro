import * as React from "react";
import { View } from "react-native";
import RNDotIntro from "react-native-dot-intro";

/* 
initialBgColor -> Big background of the element
bgColor -> initial circle bg color that will be the next slide initial BG Color
nextBgColor -> next circle bg color after we fully transition the circle and this will be small again
prev bgColor === next initialBgColor
prev nextBgColor === next bgColor
*/

const colors = [
  {
    arrowColor: "#000B92",
    textColor: "white",
    initialBgColor: "#000B92",
    bgColor: "#F576AA",
    nextBgColor: "#F576AA",
  },
  {
    arrowColor: "#F576AA",
    textColor: "white",
    initialBgColor: "#000B92",
    bgColor: "#F576AA",
    nextBgColor: "white",
  },
  {
    arrowColor: "#F576AA",
    textColor: "black",
    initialBgColor: "#F576AA",
    bgColor: "white",
    nextBgColor: "#000B92",
  },
];

const contents = [
  {
    image: { uri: "https://images.unsplash.com/photo-1486246772917-8947d0f7f541?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=975&q=80" },
    text:
      "For the things we have to learn before we can do them, we learn by doing them.\n\n___ Aristotle, The Nicomachean Ethics",
  },
  {
    image: { uri: "https://images.unsplash.com/photo-1585543923016-c6ac4a980ff0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=904&q=80" },
    text: "The fastest way to build an app.\n\n___ The Expo Team",
  },
  {
    image: { uri: "https://images.unsplash.com/photo-1570475735025-6cd1cd5c779d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" },
    text:
      "The greatest glory in living lies not in never falling, but in rising every time we fall.\n\n__ Nelson Mandela",
  },
];

export default function App() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <RNDotIntro
        colors={colors}
        contents={contents}
        imageWidth={200}
        imageHeight={200}
        onEnd={() => {console.log("Handle onEnd e.g. navigate to app")}}
        title="Dot Intro"
      />
    </View>
  );
}
