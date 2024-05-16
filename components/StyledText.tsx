import Texts from "@/constants/Texts";
import { TextInput as DefualtInput } from "react-native";
import { Text, TextProps, InputProps } from "./Themed";

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: "SpaceMono" }]} />;
}

export function Heading1(props: TextProps) {
  return (
    <Text
      {...props}
      style={[
        { fontSize: Texts.size["2xl"], fontFamily: Texts.font.bold },
        props.style,
      ]}
    />
  );
}

export function Heading2(props: TextProps) {
  return (
    <Text
      {...props}
      style={[
        { fontSize: Texts.size.xl, fontFamily: Texts.font.semiBold },
        props.style,
      ]}
    />
  );
}

export function Heading3(props: TextProps) {
  return (
    <Text
      {...props}
      style={[
        { fontSize: Texts.size.l, fontFamily: Texts.font.medium },
        props.style,
      ]}
    />
  );
}

export function Label(props: TextProps) {
  return (
    <Text
      {...props}
      style={[
        { fontSize: 16, fontFamily: "Montserrat_500Medium" },
        props.style,
      ]}
    />
  );
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