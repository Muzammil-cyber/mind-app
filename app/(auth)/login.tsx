import { TextInput, Heading1 } from "@/components/StyledText";
import { View as DefaultView } from "react-native";
import { View } from "@/components/Themed";
import { StyleSheet } from "react-native";
import { Button } from "@/components/StyledButton";
import { useState } from "react";
import { Link } from "expo-router";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const validate = () => {
    let isValid = true;
    if (formData.email === "") {
      setError({ ...error, email: "Email is required" });
      isValid = false;
    }
    if (formData.password === "") {
      setError({ ...error, password: "Password is required" });
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = () => {
    setError({ email: "", password: "" });
    if (validate()) {
      console.log("Form Submitted");
    }
  };

  return (
    <View style={styles.container}>
      <Heading1>Welcome Back 🫡</Heading1>
      <DefaultView style={styles.separator} />
      <TextInput
        label="Email Address"
        placeholder="John@Doe.com"
        textContentType="emailAddress"
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        value={formData.email}
        error={error.email}
        autoComplete="email"
      />
      <TextInput
        label="Password"
        placeholder="*********"
        textContentType="password"
        secureTextEntry
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        value={formData.password}
        error={error.password}
        autoComplete="password"
      />
      <Button style={styles.button} onPress={handleSubmit}>
        Login
      </Button>
      <Link href={"/(auth)/register"} asChild>
        <Button variant="secondary" outlined style={styles.button}>
          Create an Account
        </Button>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  button: {
    marginTop: 20,
    width: "100%",
  },
});
