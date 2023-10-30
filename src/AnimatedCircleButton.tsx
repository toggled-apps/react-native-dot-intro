import * as React from "react";
import {
  TouchableOpacity,
  Animated,
  StatusBar,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const AnimatedAntDesign = Animated.createAnimatedComponent(Feather);

type Props = {
  animatedValue: any;
  animatedValue2: any;
  arrowColor: string;
  bgColor: string;
  initialBgColor: string;
  onPress: () => void;
  nextBgColor: string;
  iconName: string;
};

const Circle = ({
  animatedValue,
  animatedValue2,
  arrowColor,
  bgColor,
  initialBgColor,
  onPress,
  nextBgColor,
  iconName,
}: Props) => {
  const inputRange = [0, 0.001, 0.5, 0.501, 1];
  const backgroundColor = animatedValue2.interpolate({
    inputRange,
    outputRange: [
      initialBgColor,
      initialBgColor,
      initialBgColor,
      bgColor,
      bgColor,
    ],
  });
  const dotBgColor = animatedValue2.interpolate({
    inputRange: [0, 0.001, 0.5, 0.501, 0.9, 1],
    outputRange: [
      bgColor,
      bgColor,
      bgColor,
      initialBgColor,
      initialBgColor,
      nextBgColor,
    ],
  });

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        styles.container,
        { backgroundColor },
      ]}
    >
      <Animated.View
        style={[
          styles.circle,
          {
            backgroundColor: dotBgColor,
            transform: [
              { perspective: 200 },
              {
                rotateY: animatedValue2.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ["0deg", "-90deg", "-180deg"],
                }),
              },

              {
                scale: animatedValue2.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 6, 1],
                }),
              },

              {
                translateX: animatedValue2.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0, 50, 0], // Circle button has both width and height set to 100px you can input values. Percentages don't seem to work on android
                }),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity onPress={onPress}>
          <Animated.View
            style={[
              styles.button,
              {
                transform: [
                  {
                    scale: animatedValue.interpolate({
                      inputRange: [0, 0.05, 0.5, 1],
                      outputRange: [1, 0, 0, 1],
                      // extrapolate: "clamp"
                    }),
                  },
                  {
                    rotateY: animatedValue.interpolate({
                      inputRange: [0, 0.5, 0.9, 1],
                      outputRange: ["0deg", "180deg", "180deg", "180deg"],
                    }),
                  },
                ],
                opacity: animatedValue.interpolate({
                  inputRange: [0, 0.05, 0.9, 1],
                  outputRange: [1, 0, 0, 1],
                }),
              },
            ]}
          >
            <AnimatedAntDesign name={iconName} size={45} color={arrowColor} />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

export default Circle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: StatusBar.currentHeight,
    padding: 8,
    paddingBottom: 50,
  },
  button: {
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    backgroundColor: "turquoise",
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
