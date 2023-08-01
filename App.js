import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Button,
  FlatList,
  View,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const TaskItem = ({ task, time, onDelete, onEdit }) => {
  return (
    <View style={styles.taskContainer}>
      <View style={styles.tableRow}>
        <Text style={styles.task}>{task}</Text>
        <Text style={styles.taskTime}>{time}</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => onEdit(task, time)}>
            <Icon name="create-outline" size={24} color="blue" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(task)}>
            <Icon name="trash-outline" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  const addTask = () => {
    if (currentTask.trim() !== "" && currentTime.trim() !== "") {
      const newTask = {
        task: currentTask.trim(),
        time: currentTime.trim(),
      };
      setTasks([...tasks, newTask]);
      setCurrentTask("");
      setCurrentTime("");
    }
  };

  const deleteTask = (taskToDelete) => {
    setTasks(tasks.filter((task) => task.task !== taskToDelete));
  };

  const editTask = (taskToEdit, timeToEdit) => {
    setCurrentTask(taskToEdit);
    setCurrentTime(timeToEdit);
    deleteTask(taskToEdit);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Add a task"
          value={currentTask}
          onChangeText={(text) => setCurrentTask(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Add time (e.g., 10:00 AM)"
          value={currentTime}
          onChangeText={(text) => setCurrentTime(text)}
          style={styles.input}
        />
        <Button title="Add" onPress={addTask} />
      </View>
      <View style={styles.tableContainer}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.headerText}>Task</Text>
          <Text style={styles.headerText}>Time</Text>
          <Text style={styles.headerText}>Actions</Text>
        </View>
        <FlatList
          data={tasks}
          renderItem={({ item }) => (
            <TaskItem
              task={item.task}
              time={item.time}
              onDelete={deleteTask}
              onEdit={editTask}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    marginRight: 8,
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tableHeader: {
    backgroundColor: "#f2f2f2",
    fontWeight: "bold",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    width: "30%",
  },
  task: {
    fontSize: 16,
    width: "30%",
  },
  taskTime: {
    fontSize: 16,
    width: "30%",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "30%",
  },
});

export default App;
