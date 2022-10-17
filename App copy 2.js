/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  TouchableOpacity,
  FlatList,
  View,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Todo from './src/models';
import TodoCard from './src/components/todo';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState('');

  const save = () => {
    // if (todos.filter(todo => todo.title === title).length > 0) {
    //   setError('Todo already exist');
    //   return;
    // }
    const todo = {
      id: todos.length,
      title: title,
      description: description,
      completed: completed,
    };
    setTodos([...todos, todo]);
  };

  const remove = todo => {
    setTodos([...todos.filter(e => e !== todo)]);
  };

  const markAsCompleted = todo => {
    setTodos([
      ...todos.map(item => {
        if (item.id === todo.id) {
          return {...item, completed: !todo.completed}; //gets everything that was already in item, and updates "done"
        }
        return item; // else return unmodified item
      }),
    ]);
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <FlatList
        style={styles.sectionContainer}
        ListHeaderComponent={
          <View style={styles.sectionContainer}>
            <Text
              style={[
                styles.sectionTitle,
                {textAlign: 'center', padding: 10, color: '#F52A6D'},
              ]}>
              Todo App
            </Text>
            <TextInput
              style={[
                styles.inputStyle,
                error !== '' ? {borderColor: '#F52A6D'} : {},
              ]}
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
            />

            <TextInput
              multiline={true}
              numberOfLines={5}
              value={description}
              onChangeText={setDescription}
              style={[styles.inputStyle, {textAlign: 'left'}]}
            />
            <View style={{flex: 1, flexDirection: 'row'}}>
              <CheckBox value={completed} onValueChange={setCompleted} />
              <Text style={{paddingVertical: 5}}>Completed</Text>
            </View>
            <TouchableOpacity style={styles.buttonStyle} onPress={save}>
              <Text style={styles.buttonTextStyle}>Add</Text>
            </TouchableOpacity>
          </View>
        }
        data={todos}
        renderItem={({item}) => (
          <TodoCard
            item={item}
            remove={remove}
            markAsCompleted={markAsCompleted}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    paddingHorizontal: 10,
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  inputStyle: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    marginVertical: 5,
  },
  buttonStyle: {
    backgroundColor: '#F52A6D',
    height: 50,
    borderRadius: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 5,
  },
  buttonTextStyle: {
    color: '#fff',
    fontSize: 16,
  },
});

export default App;
