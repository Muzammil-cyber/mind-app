import { forwardRef } from "react";
import {
  Pressable as DefualtButton,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useThemeColor } from "./Themed";
import Colors from "@/constants/Colors";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

type ButtonVariant = keyof typeof Colors.light & keyof typeof Colors.dark;
type ButtonTextSize = "s" | "m" | "l";

export type ButtonProps = ThemeProps &
  React.ComponentPropsWithoutRef<typeof DefualtButton> & {
    variant?: ButtonVariant;
    textSize?: ButtonTextSize;
    outlined?: boolean;
  };

export const Button = forwardRef<View | null, ButtonProps>((props, ref) => {
  const {
    style,
    lightColor,
    darkColor,
    children,
    variant,
    textSize,
    outlined,
    ...otherProps
  } = props;

  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    variant ? variant : "primary"
  );
  const textColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    variant && outlined ? variant : "buttonText"
  );
  // const textColor = outlined
  //   ? useThemeColor(
  //       {
  //         light: lightColor,
  //         dark: darkColor,
  //       },

  //       variant ? `outline-${variant}` : "outline-primary"
  //     )
  //   : useThemeColor(
  //       {
  //         light: lightColor,
  //         dark: darkColor,
  //       },
  //       "buttonText"
  //     );

  const backgroundColor = outlined ? "transparent" : color;
  const borderColor = outlined ? color : "transparent";
  const borderWidth = outlined ? 1 : 0;

  const fontSize = textSize === "s" ? 12 : textSize === "l" ? 20 : 16;

  return (
    <DefualtButton
      ref={ref}
      {...otherProps}
      style={
        typeof style === "object"
          ? {
              ...defualtStyle.container,
              backgroundColor,
              borderColor,
              borderWidth,
              ...style,
            }
          : {
              ...defualtStyle.container,
              backgroundColor,
              borderColor,
              borderWidth,
            }
      }
    >
      {typeof children === "string" ? (
        <Text
          style={{
            ...defualtStyle.text,
            color: textColor,
            fontSize,
          }}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </DefualtButton>
  );
});

const defualtStyle = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 13,
    alignItems: "center",
    borderRadius: 5,
  },
  text: {
    fontFamily: "Montserrat_600SemiBold",
  },
});
