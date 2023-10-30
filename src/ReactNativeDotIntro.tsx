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
    iconName: string;
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
  onBackward?: () => void;
  onForward?: () => void;
  selectedScreenIndex?: number | null;
}

const ReactNativeDotIntro: React.FC<Props> = (props) => {
  const width = useWindowDimensions().width;
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const safeColors = props.colors || [];
  const safeContents = props.contents.slice(0, safeColors.length);

  const currentColor = safeColors[currentIndex];
  if (!currentColor) return null;

  const mainAnimationValue = React.useRef(new Animated.Value(0)).current;
  const secondaryAnimationValue = React.useRef(new Animated.Value(0)).current;
  const sliderAnimationValue = React.useRef(new Animated.Value(0)).current;

  const transformValue = sliderAnimationValue.interpolate({
    inputRange: safeContents.length > 1 ? safeContents.map((_, i) => i) : [0, 1],
    outputRange: safeContents.length > 1
      ? safeContents.map((_, i) => -i * width * 2)
      : [0, -width * 2],
  });

  const handleBackward = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      sliderAnimationValue.setValue(currentIndex - 1);
      if (props.onBackward) props.onBackward();
    }
  };

  const handlePress = () => {
    if (currentIndex + 1 < safeColors.length) {
      mainAnimationValue.setValue(0);
      secondaryAnimationValue.setValue(0);
      Animated.parallel([
        Animated.timing(sliderAnimationValue, {
          toValue: currentIndex + 1,
          duration: props.textDuration || 800,
          useNativeDriver: true,
        }),
        Animated.timing(mainAnimationValue, {
          toValue: 1,
          duration: props.duration || 1000,
          useNativeDriver: true,
        }),
        Animated.timing(secondaryAnimationValue, {
          toValue: 1,
          duration: props.duration || 1000,
          useNativeDriver: false,
        }),
      ]).start();
      setCurrentIndex((currentIndex + 1) % safeColors.length);
      if (props.onForward) props.onForward();
    } else {
      props.onEnd();
    }
  };

  // Function to handle screen selection
  const handleSelectScreen = (index: number) => {
    if (index >= 0 && index < safeContents.length) {
      setCurrentIndex(index);
      sliderAnimationValue.setValue(index);
      triggerButtonAnimation(); // Trigger the button animation when selecting a specific screen
    }
  };

  // Function to trigger the button animation
  const triggerButtonAnimation = () => {
    mainAnimationValue.setValue(0);
    secondaryAnimationValue.setValue(0);
    Animated.parallel([
      Animated.timing(mainAnimationValue, {
        toValue: 1,
        duration: props.duration || 1000,
        useNativeDriver: true,
      }),
      Animated.timing(secondaryAnimationValue, {
        toValue: 1,
        duration: props.duration || 1000,
        useNativeDriver: false,
      }),
    ]).start();
  };

  React.useEffect(() => {
    if (props.selectedScreenIndex !== undefined && props.selectedScreenIndex !== null) {
      // Handle screen selection when the selectedScreenIndex prop changes
      handleSelectScreen(props.selectedScreenIndex);
    }
  }, [props.selectedScreenIndex]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <View style={styles.navigationButtons}>
        <Pressable onPress={handleBackward}>
          <Text style={styles.buttonText}>Back</Text>
        </Pressable>
        <Pressable onPress={handlePress}>
          <Text style={styles.buttonText}>Next</Text>
        </Pressable>
      </View>
      <AnimatedCircleButton
        arrowColor={currentColor.arrowColor}
        onPress={handlePress}
        animatedValue={mainAnimationValue}
        animatedValue2={secondaryAnimationValue}
        initialBgColor={currentColor.initialBgColor}
        nextBgColor={currentColor.nextBgColor}
        bgColor={currentColor.bgColor}
        iconName={currentColor.iconName}
      />
      <Animated.View
        style={[
          styles.slider,
          {
            transform: [{ translateX: transformValue }],
          },
        ]}
      >
        {safeContents.map((content, i) => {
          const color = safeColors[i];
          return (
            <View style={{ paddingRight: width, width: width * 2 }} key={i}>
              <View style={styles.header}>
                <Text style={[styles.headerText, { color: color.textColor }]}>
                  {props.title}
                </Text>
                {props.skip && (
                  <Pressable onPress={props.onEnd}>
                    <Text style={[styles.headerText, { color: color.textColor }]}>
                      Skip
                    </Text>
                  </Pressable>
                )}
              </View>
              <View style={styles.content}>
                {content.image && (
                  <Image
                    style={[
                      styles.image,
                      {
                        width: props.imageWidth || 125,
                        height: props.imageHeight || 125,
                        borderRadius: props.imageBorderRadius,
                      },
                    ]}
                    source={content.image}
                  />
                )}
                {content.text && (
                  <Text
                    style={[styles.paragraph, { color: color.textColor }]}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 12,
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  buttonText: {
    fontSize: 16,
    color: "#333",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  headerText: {
    margin: 12,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  content: {
    justifyContent: "space-evenly",
    paddingTop: 75,
    paddingBottom: 50,
  },
  image: {
    alignSelf: "center",
  },
  paragraph: {
    paddingHorizontal: 24,
    paddingTop: 50,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  slider: {
    flexDirection: "row",
  },
});

export default ReactNativeDotIntro;

