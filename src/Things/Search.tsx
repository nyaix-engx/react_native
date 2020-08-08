import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { StyleGuide } from "../components";

const grey = {
  r: 186,
  g: 187,
  b: 199
};
const primary = {
  r: 56,
  g: 132,
  b: 255
};
const size = 48;
const marginTop = 32;
const CONTAINER_HEIGHT = 100;
export const THRESHOLD = CONTAINER_HEIGHT + marginTop;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: -CONTAINER_HEIGHT,
    justifyContent: "center",
    alignItems: "center"
  },
  search: {
    width: size,
    height: size,
    borderRadius: size / 2,
    justifyContent: "center",
    alignItems: "center"
  }
});

interface SearchProps {}

export default memo(() => {
  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <View>
          <Icon name="search" size={32} color="#babbc7" />
        </View>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Icon name="search" size={32} color="white" />
        </View>
      </View>
      <View>
        <View>
          <Icon name="chevron-down" size={32} color="#babbc7" />
        </View>
        <View style={{ ...StyleSheet.absoluteFillObject }}>
          <Icon
            name="chevron-down"
            size={32}
            color={StyleGuide.palette.primary}
          />
        </View>
      </View>
    </View>
  );
});
