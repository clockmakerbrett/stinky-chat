import React from "react";
import firebase from "../Firebase";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";

import { UserContext } from "../Contexts";

const auth = firebase.auth();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 30
  },
  input: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    padding: 15,
    borderColor: "gray",
    marginBottom: 20
  }
});

export default function AuthScreen({ navigation }) {
  const { setUser } = React.useContext(UserContext);

  const [signUpMode, setSignUpMode] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSignUp = () => {
    const email = username + "@stinky.com";
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        const user = {
          _id: data.user.uid,
          name: data.user.email
        };
        setUser(user);
        navigation.navigate("StinkyChat");
      })
      .catch((error) => console.log(error));
  };

  const handleSignIn = () => {
    const email = username + "@stinky.com";
    auth
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        const user = {
          _id: data.user.uid,
          name: data.user.email.split("@")[0]
        };
        setUser(user);
        navigation.navigate("StinkyChat");
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.container}>
      {(signUpMode && (
        <>
          <Text>Sign Up:</Text>
          <TextInput style={styles.input} placeholder="Stinky Username" value={username} onChangeText={setUsername} />
          <TextInput style={styles.input} placeholder="Stinky Password" value={password} onChangeText={setPassword} />
          <Button title="Sign-up" onPress={handleSignUp} />
          <Text>Or:</Text>
          <Button title="SignIn" onPress={() => setSignUpMode(!signUpMode)} />
        </>
      )) || (
        <>
          <Text>Sign In:</Text>
          <TextInput style={styles.input} placeholder="Stinky Username" value={username} onChangeText={setUsername} />
          <TextInput style={styles.input} placeholder="Stinky Password" value={password} onChangeText={setPassword} />
          <Button title="Sign In" onPress={handleSignIn} />
          <Text>Or:</Text>
          <Button title="SignUp" onPress={() => setSignUpMode(!signUpMode)} />
        </>
      )}
    </View>
  );
}
