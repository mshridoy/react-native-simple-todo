import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from "react-native";

const Developer = (props) => {
  return (
    <View style={styles.item}>
      <View style={styles.square}></View>
      <View style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <View style={styles.itemLeft}>
          <Text
            style={
              props.isCompleted
                ? { textDecorationLine: "line-through", ...styles.itemText }
                : styles.itemText
            }
          >
            {props.name}
          </Text>
        </View>
        <Text style={{ color: "gray" }}>Department of {props.department}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 1,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: "#90ee90",
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 20,
  },
  itemText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: "#55BCF6",
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default Developer;
