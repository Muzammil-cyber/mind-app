import { Text, TextProps } from './Themed';

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'SpaceMono' }]} />;
}

export function Heading1(props: TextProps) {
  return (
    <Text
      {...props}
      style={[{ fontSize: 30, fontFamily: "Montserrat_700Bold" }, props.style]}
    />
  );
}

export function Heading2(props: TextProps) {
  return (
    <Text
      {...props}
      style={[
        { fontSize: 24, fontFamily: "Montserrat_600SemiBold" },
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
        { fontSize: 20, fontFamily: "Montserrat_500Medium" },
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