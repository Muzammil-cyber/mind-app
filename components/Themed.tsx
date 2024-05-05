/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  Text as DefaultText,
  View as DefaultView,
  TextInput as DefualtInput,
} from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "./useColorScheme";

import Texts from "@/constants/Texts";
import { Label } from "./StyledText";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];
export type InputProps = ThemeProps &
  DefualtInput["props"] & { label?: string; error?: string };

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <DefaultText
      style={[{ color, fontFamily: Texts.font.regular }, style]}
      {...otherProps}
    />
  );
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function TextInput(props: InputProps) {
  const { style, lightColor, darkColor, label, error, ...otherProps } = props;
  // how to make margin Bottom apply to the error if it exist?
  return (
    <>
      {label && <Label style={{ alignSelf: "flex-start" }}>{label}</Label>}
      <DefualtInput
        style={[
          {
            width: "100%",
            borderWidth: 1,
            borderColor: "gray",
            backgroundColor: "white",
            borderRadius: 5,
            padding: 10,
            fontFamily: Texts.font.regular,
            marginTop: label ? 5 : 0,
            marginBottom: error ? 0 : 20,
          },
          style,
          {
            borderColor: error ? "red" : "gray",
          },
        ]}
        {...otherProps}
      />
      {error && (
        <Text
          style={{ color: "red", alignSelf: "flex-start", marginBottom: 20 }}
        >
          {error}
        </Text>
      )}
    </>
  );
}






