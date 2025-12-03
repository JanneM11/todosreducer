import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTodos } from './hooks/useTodos';
import TaskInput from './components/TaskInput';
import { SwipeListView } from 'react-native-swipe-list-view';

export default function App() {
  const { state, handleAdd, handleToggle, handleDelete } = useTodos()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simple Todo</Text>
      <TaskInput onAdd={handleAdd} />
      <SwipeListView
        data={state}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 8}}/>}
        renderItem={({ item }) => (
          <View 
            style={[
              styles.rowFront,
              item.done && styles.rowDone
            ]}
          >
            <Pressable onPress={() => handleToggle(item.id)}>
              <Text
                style={{textDecorationLine: item.done ? 'line-through' : 'none'}}
              >
                {item.name}
              </Text>
            </Pressable>
          </View>
        )}
        renderHiddenItem={({ item }) => (
          <View style={styles.rowBack}>
            <Button
            title="Delete"
            color="#d11a2a"
            onPress={() => {
              handleDelete(item.id)
            }}
            />
          </View>
        )} 
        rightOpenValue={-100}
        disableRightSwipe
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center'
  },
  rowFront: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderColor: '#eee',
    padding: 16,
    borderRadius: 4,
  },
  rowDone: {
    backgroundColor: '#e0e0e0'
  },
  rowBack: {
    backgroundColor: '#ddd',
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20,
    borderRadius: 4,
  }
});
