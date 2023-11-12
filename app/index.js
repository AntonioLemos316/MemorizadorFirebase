import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, Alert, Vibration } from "react-native";
import firebase from "../firebase"

export default function App() {
  const [pergunta, setPergunta] = useState();
  const [resposta, setRespota] = useState();

  const router = useRouter();

  const handle = async() => {
    const card = await firebase.firestore().collection("Perguntas").add({
      pergunta: pergunta,
      resposta: resposta,
    })

    Vibration.vibrate(100)
    Alert.alert(`Card criado com Sucesso!`)
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Adicionando Cards</Text>
        <TextInput
          style={styles.input}
          placeholder="Pergunta"
          onChangeText={(text) => setPergunta(text)}
          value={pergunta}
        />
        <TextInput
          style={styles.input}
          placeholder="Respota"
          onChangeText={(text) => setRespota(text)}
          value={resposta}
        />
      </View>

      <View style={styles.buttons}>
        <Pressable style={styles.button} onPress={(handle)}>
          <Text style={styles.buttonText}>Criar</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => router.push("/lista")}>
          <Text style={styles.buttonText}>Ver Cards</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 100,
    gap: 40,
  },
  form: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "65%",
    height: 40,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  buttons: {
    width: "65%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#007AFF",
    justifyContent: "center",
    borderRadius: 5,
    alignItems: "center",
    width: "35%",
    aspectRatio: 2.1,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
