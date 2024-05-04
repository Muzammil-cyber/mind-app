import Texts from "@/constants/Texts";
import { Text, TextProps } from "./Themed";

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
