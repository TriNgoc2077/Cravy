import React from "react";
import {
  FlatList,
  StyleSheet,
  View,
  ViewStyle,
  ListRenderItemInfo,
  Platform,
} from "react-native";

interface CustomFlatListProps<T> {
  data: T[];
  renderItem: (info: ListRenderItemInfo<T>) => React.ReactElement | null;
  style?: ViewStyle;
  HeaderComponent?: React.ReactElement;
  StickyElementComponent?: React.ReactElement;
  TopListElementComponent?: React.ReactElement;
}

function CustomFlatList<T>({
  data,
  renderItem,
  style,
  HeaderComponent,
  StickyElementComponent,
  TopListElementComponent,
}: CustomFlatListProps<T>) {
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      style={style}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={
        <View>
          {HeaderComponent}
          {StickyElementComponent && (
            <View style={styles.stickyContainer}>{StickyElementComponent}</View>
          )}
          {TopListElementComponent && (
            <View style={styles.topListContainer}>
              {TopListElementComponent}
            </View>
          )}
        </View>
      }
      stickyHeaderIndices={StickyElementComponent ? [1] : undefined}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  stickyContainer: {
    zIndex: Platform.OS === "android" ? 0 : 1,
    backgroundColor: "#fff",
  },
  topListContainer: {
    marginBottom: 10,
  },
});

export default CustomFlatList;
