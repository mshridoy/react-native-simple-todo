import React, { useState, useEffect, useContext } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Vibration,
  Alert,
  ToastAndroid,
  Image,
} from "react-native";
import Task from "./../components/Task";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { MainContext } from "../components/Provider";

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("@storage_Key", jsonValue);
  } catch (e) {
    // saving error
  }
};

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem("@storage_Key");
    return value;
  } catch (e) {
    // error reading value
  }
};

export default function App({ navigation }) {
  const mainContext = useContext(MainContext);
  const { taskItems, setTaskItems } = mainContext;

  const [task, setTask] = useState();
  // const [taskItems, setTaskItems] = useState([]);

  useEffect(() => {
    navigation.addListener("tabPress", (e) => {
      (async function () {
        const data = await getData();

        if (data) {
          const storedDataFetched = JSON.parse(data);
          setTaskItems(storedDataFetched);
        }
      })();
    });
  }, [navigation]);

  const handleAddTask = () => {
    const newTask = {
      id: Date.now(),
      time: Date.now(),
      task,
      isCompleted: false,
    };
    Keyboard.dismiss();
    setTaskItems([newTask, ...taskItems]);
    storeData([newTask, ...taskItems]);
    setTask(null);
    ToastAndroid.showWithGravity(
      "New Task Added!",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    );
  };

  const completeTask = (id) => {
    const updatedData = taskItems.map((singleItem) => {
      if (singleItem.id === id) {
        const cloneItem = { ...singleItem };
        cloneItem.isCompleted = false;
        return cloneItem;
      }
      return singleItem;
    });
    setTaskItems(updatedData);
    storeData(updatedData);
    ToastAndroid.showWithGravity(
      "Task move to active!",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    );
  };
  const deleteTask = (id) => {
    Vibration.vibrate(100);
    Alert.alert(
      "Do you delete the task?",
      taskItems.find((singleItem) => singleItem.id === id).task,
      [
        {
          text: "Cancel",
          onPress: () => {
            ToastAndroid.showWithGravity(
              "Canceled!",
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
            );
          },
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            setTaskItems(
              taskItems.filter((singleItem) => singleItem.id !== id)
            );
            storeData(taskItems.filter((singleItem) => singleItem.id !== id));
            ToastAndroid.showWithGravity(
              "Task deleted!",
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
            );
          },
        },
      ]
    );
  };

  useEffect(() => {
    (async function () {
      const data = await getData();
      if (data) {
        const storedDataFetched = JSON.parse(data);
        setTaskItems(storedDataFetched);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}

      {taskItems.filter((singleItem) => singleItem.isCompleted === true)
        .length === 0 ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            marginTop: -30,
          }}
        >
          <Image
            style={{ width: 150, height: 150 }}
            source={require("../images/nodata.png")}
          />
          <Text style={{ marginTop: 8 }}>
            You don't have any completed task.
          </Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Today's Tasks */}
          <View style={styles.tasksWrapper}>
            <View style={styles.items}>
              {/* This is where the tasks will go! */}
              {taskItems
                .filter((singleItem) => singleItem.isCompleted === true)
                .map((item) => {
                  return (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => completeTask(item.id)}
                      onLongPress={() => deleteTask(item.id)}
                    >
                      <Task
                        text={item.task}
                        time={item.time}
                        isCompleted={item.isCompleted}
                      />
                    </TouchableOpacity>
                  );
                })}
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  tasksWrapper: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    paddingHorizontal: 10,
    marginTop: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    flex: 1,
    marginRight: 10,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {},
});
