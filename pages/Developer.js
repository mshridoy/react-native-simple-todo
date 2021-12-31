import React from "react";
import { View, Text } from "react-native";

import SingleDeveloper from "../components/SingleDeveloper";

export default function Developer() {
  return (
    <View>
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          backgroundColor: "#529ce7",
          color: "white",
          textAlign: "center",
          paddingVertical: 15,
        }}
      >
        Project for CSE323
      </Text>
      {/* <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          backgroundColor: "red",
          color: "white",
          textAlign: "center",
          paddingVertical: 5,
        }}
      >
        Developers
      </Text> */}
      <SingleDeveloper name="Md. Abdur Rauf" department="ECE" />
      <SingleDeveloper name="Jannatun Nayem" department="ECE" />
      <SingleDeveloper name="Sahida Akter Chowdhury" department="ECE" />
    </View>
  );
}
