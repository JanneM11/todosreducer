import { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";



export default function TaskInput({ onAdd}: { onAdd: (name: string) => void}) {
  const [text, setText] = useState("")

  const handleAdd = () => {
    if (text.trim().length > 0) {
      onAdd(text)
      setText("")
    }
  }

  return(
  <View style={styles.row} >
    <TextInput
      style={styles.input}
      value={text}
      onChangeText={setText}
      placeholder="Enter Task"
    />
    <Button title="Add" onPress={handleAdd} />
  </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",   
    alignItems: "center",   
    marginBottom: 16,
  },
  input: {
    flex: 1,               
    borderWidth: 1,
    padding: 8,
    marginRight: 8,         
  },
});