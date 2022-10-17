import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

export default TodoCard = ({item, remove, markAsCompleted}) => {
  return (
    <View style={[styles.container, item.completed ? styles.completed : {}]}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <CheckBox
          value={item.completed}
          onValueChange={e => markAsCompleted(item)}
        />
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => {
            remove(item);
          }}>
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>

      {/* <Text>Status : {item.completed ? 'Completed' : 'Pending'}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderColor: '#eee',
    borderWidth: 1,
    padding: 5,
    margin: 5,
    borderRadius: 5,
  },
  completed: {
    // backgroundColor: '#A4F3F5',
  },
  title: {
    fontSize: 20,
    color: '#F52A6D',
  },
  description: {
    color: '#000',
    fontSize: 16,
    paddingVertical: 24,
  },
  removeButton: {
    backgroundColor: '#F52A6D',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});
