import { View, Text, StyleSheet, Pressable, Image, TextInput, FlatList, Alert, Vibration} from "react-native";
import { useRouter } from "expo-router";
import React, {useState, useEffect} from "react";
import firebase  from "../firebase";


export default function Lista() {
  const [pergunta, setPergunta] = useState("");
  const [resposta, setResposta] = useState("");
  const [card, setCard] = useState([]);
  const [editId, setEditId] = useState("");
  let [editState, setEditState] = useState("none");

  const router = useRouter()

  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('Perguntas').onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setCard(data);
    });
    return () => unsubscribe();
  }, []);

  const excluirCard = (id) => {
    firebase.firestore().collection('Perguntas').doc(id).delete();
    Vibration.vibrate(100)
  }

  const atualizarCard = (id, dados) => {
    firebase.firestore().collection('Perguntas').doc(id).update(dados);
    closeEdit();

    Vibration.vibrate(100)
    Alert.alert('Card atualizado')
  }

  const showEdit = (id) => {
    setEditState("flex")
    setEditId(id)
  }

  const closeEdit = () => {
    setEditState("none")
    setEditId("")
  }

  const renderCard = ({item}) => {
    return(
      <View style={styles.pergunta}>
        <View style={styles.variaveis}>
          <Text style={styles.font}>{`${item.pergunta}`}
          </Text>
          <Text style={styles.font}>{`${item.resposta}`}
          </Text>
        </View>
        <View style={styles.acoes}>
          <Pressable onPress={() => showEdit(item.id)}>
            <Image style={styles.edit} source={require(
            '../assets/pencil.png',
            )}>
          </Image>
          </Pressable>
          <Pressable onPress={() => excluirCard(item.id)}>
          <Image style={styles.trash} source={require(
            '../assets/trash.png',
          )}>
          </Image>
          </Pressable>
        </View>
      </View>
    )
  }

  const editBox = () => {
    return(
      <View style={[styles.editContainer, { display: editState }]}>
        <View style={styles.editBox}>
          <View style={styles.editTitle}>
            <Text style={styles.titletext}>Editar</Text>
          </View>
          <View style={styles.editform}>
            <TextInput
              style={styles.input}
              placeholder='Pergunta'
              onChangeText={text => setPergunta(text)}
              value={pergunta}
            />
            <TextInput
              style={styles.input}
              placeholder='Resposta'
              onChangeText={text => setResposta(text)}
              value={resposta}
            />
          </View>
          <View style={styles.editButtons}>
            <Pressable style={styles.editButton} onPress={closeEdit}>
              <Text style={styles.editButtonText}>Voltar</Text>
            </Pressable>
            <Pressable style={styles.editButton} onPress={() => atualizarCard(editId, { pergunta, resposta})}>
              <Text style={styles.editButtonText}>Editar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {editBox()}
      <Text style={styles.title}>Lista de Cards</Text>
      <FlatList 
        data={card}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
       <Pressable onPress={() => router.push("/")} style={styles.button}>
        <Text style={styles.buttonText}>Voltar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    height: "100%",
    paddingBottom: 25,
    gap: 45
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  list: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  pergunta: {
    display:"flex",
    flexDirection: "row",
    backgroundColor: '#ddd',
    padding: 4,
    margin: 8,
    height: 68,
    width: '100%',
    borderRadius: 5,
    alignItems: 'flex-start',
    aspectRatio: 5,
    justifyContent: "space-between"
  },
  variaveis: {
    height: "100%",
    gap: 5,
  },
  font: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  acoes: {
    height: "100%",
    gap: 5,
  },
  edit: {
    height: 20,
    width: 20,

  },
  trash: {
    height: 25,
    width: 25,
    backgroundColor: '#e7131357',
    borderRadius: 5
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  editContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1
  },
  editBox: {
    backgroundColor: '#fff',
    borderRadius: 5,
    width: "80%",
    aspectRatio: 1,
    elevation: 5,
    display: 'flex',
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 15
  },
  buttons: {
    width: '65%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButtons: {
    width: '65%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton:{
    backgroundColor: '#007AFF',
    justifyContent: "center",
    borderRadius: 5,
    alignItems: 'center',
    width: "35%",
    aspectRatio: 2.10
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  titletext: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    paddingHorizontal: 12,
    width: '65%',
    height: 30,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  editform: {
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
  },
});
