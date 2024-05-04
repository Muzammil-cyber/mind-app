import { forwardRef } from "react";
import {
  Pressable as DefualtButton,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useThemeColor } from "./Themed";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

type ButtonVariant = "primary" | "secondary" | "success" | "danger" | "warning";
type ButtonTextSize = "s" | "m" | "l";

export type ButtonProps = ThemeProps &
  React.ComponentPropsWithoutRef<typeof DefualtButton> & {
    variant?: ButtonVariant;
    textSize?: ButtonTextSize;
  };

export const Button = forwardRef<View | null, ButtonProps>((props, ref) => {
  const {
    style,
    lightColor,
    darkColor,
    children,
    variant,
    textSize,
    ...otherProps
  } = props;

  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    variant ? variant : "primary"
  );
  const textColor = useThemeColor(
    {
      light: lightColor,
      dark: darkColor,
    },
    "buttonText"
  );

  const fontSize = textSize === "s" ? 12 : textSize === "l" ? 20 : 16;

  return (
    <DefualtButton
      ref={ref}
      {...otherProps}
      style={
        typeof style === "object"
          ? { backgroundColor, ...defualtStyle.container, ...style }
          : {
              backgroundColor,
              ...defualtStyle.container,
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
