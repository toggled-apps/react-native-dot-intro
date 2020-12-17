import * as React from "react";
import {
  Animated,
  Image,
  Pressable,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import AnimatedCircleButton from "./AnimatedCircleButton";

interface Props {
  colors: {
    arrowColor: string;
    initialBgColor: string;
    bgColor: string;
    nextBgColor: string;
    textColor: string;
  }[];
  contents: { text: string; image: any }[];
  duration?: number;
  imageBorderRadius: number;
  imageWidth?: number;
  imageHeight?: number;
  onEnd: () => void;
  textDuration?: number;
  title: string;
  skip: boolean;
}

const ReactNativeDotIntro = ({
  colors,
  contents,
  duration = 1000,
  imageBorderRadius = 50,
  imageWidth = 125,
  imageHeight = 125,
  onEnd,
  textDuration = 800,
  title = "",
  skip = true,
}: Props) => {
  const width = useWindowDimensions().width;

  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const animatedValue2 = React.useRef(new Animated.Value(0)).current;
  const sliderAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const inputRange = [...Array(contents.length).keys()];
  const [index, setIndex] = React.useState(0);

  const animate = (i: number) =>
    Animated.parallel([
      Animated.timing(sliderAnimatedValue, {
        toValue: i,
        duration: textDuration,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: duration,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue2, {
        toValue: 1,
        duration: duration,
        useNativeDriver: false,
      }),
    ]);

  const onPress = () => {
    if (index + 1 < colors.length) {
      animatedValue.setValue(0);
      animatedValue2.setValue(0);
      animate((index + 1) % colors.length).start();
      setIndex((index + 1) % colors.length);
    } else {
      onEnd();
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "flex-start", paddingTop: 12 }}
    >
      <StatusBar hidden />
      <AnimatedCircleButton
        arrowColor={colors[index].arrowColor}
        onPress={onPress}
        animatedValue={animatedValue}
        animatedValue2={animatedValue2}
        initialBgColor={colors[index].initialBgColor}
        nextBgColor={colors[index].nextBgColor}
        bgColor={colors[index].bgColor}
      />
      <Animated.View
        style={{
          flexDirection: "row",
          transform: [
            {
              translateX: sliderAnimatedValue.interpolate({
                inputRange,
                outputRange: contents.map((_, i) => -i * width * 2),
              }),
            },
          ],
          opacity: sliderAnimatedValue.interpolate({
            inputRange: [...Array(contents.length * 2 + 1).keys()].map(
              (i) => i / 2
            ),
            outputRange: [...Array(contents.length * 2 + 1).keys()].map((i) =>
              i % 2 === 0 ? 1 : 0
            ),
          }),
        }}
      >
        {contents.slice(0, colors.length).map((content, i) => {
          return (
            <View style={{ paddingRight: width, width: width * 2 }} key={i}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 24,
                  paddingTop: 12,
                }}
              >
                <Text
                  style={[styles.headerText, { color: colors[i].textColor }]}
                >
                  {title}
                </Text>
                {skip && (
                  <Pressable onPress={() => onEnd()}>
                    <Text
                      style={[
                        styles.headerText,
                        { color: colors[i].textColor },
                      ]}
                    >
                      Skip
                    </Text>
                  </Pressable>
                )}
              </View>
              <View
                style={styles.content}
              >
                {content.image && (
                  <Image
                    style={{
                      width: imageWidth,
                      height: imageHeight,
                      alignSelf: "center",
                      borderRadius: imageBorderRadius,
                    }}
                    source={content.image}
                  />
                )}
                {content.text && (
                  <Text
                    style={[styles.paragraph, { color: colors[i].textColor }]}
                  >
                    {content.text}
                  </Text>
                )}
              </View>
            </View>
          );
        })}
      </Animated.View>
    </SafeAreaView>
  );
};

export default ReactNativeDotIntro;

const styles = StyleSheet.create({
  content: {
    justifyContent: "space-evenly",
    paddingTop: 75,
    paddingBottom: 50,
  },
  headerText: {
    margin: 12,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  paragraph: {
    paddingHorizontal: 24,
    paddingTop: 24,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});
