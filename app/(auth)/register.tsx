import { TextInput, Heading1 } from "@/components/StyledText";
import { View as DefaultView } from "react-native";
import { View } from "@/components/Themed";
import { StyleSheet } from "react-native";
import { Button } from "@/components/StyledButton";
import { useState } from "react";
import { Link } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";
import Toast from "react-native-toast-message";

export default function Register() {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
    confirmPassword: "",
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
    if (formData.confirmPassword === "") {
      setError({ ...error, confirmPassword: "Confirm Password is required" });
      isValid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError({ ...error, confirmPassword: "Password does not match" });
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async () => {
    setError({ email: "", password: "", confirmPassword: "" });
    if (validate()) {
      await register(formData.email, formData.password).catch((e) =>
        Toast.show({
          type: "error",
          text1: "Error",
          text2: e.message,
        })
      );
    }
  };

  return (
    <View style={styles.container}>
      <Heading1 style={styles.heading}>Let&apos;s Join Revolution</Heading1>
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
        autoComplete="password-new"
      />
      <TextInput
        label="Confirm Password"
        placeholder="*********"
        textContentType="password"
        secureTextEntry
        onChangeText={(text) =>
          setFormData({ ...formData, confirmPassword: text })
        }
        value={formData.confirmPassword}
        error={error.confirmPassword}
        autoComplete="password-new"
      />
      <Button style={styles.button} onPress={handleSubmit}>
        Sign Up
      </Button>
      <Link href={"/(auth)/login"} asChild>
        <Button variant="secondary" outlined style={styles.button}>
          Login
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
  heading: {
    textAlign: "center",
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
