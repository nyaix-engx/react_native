import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Content from './Content';
import ScrollView from './ScrollView';
import Search from './Search';
import SearchBox from './SearchBox';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default () => {
  const [search, setSearch] = useState(false);
  return (
    <View style={styles.container}>
      <Search />
      <ScrollView>
        <Content />
      </ScrollView>
      <SearchBox visible={search} onRequestClose={() => setSearch(false)} />
    </View>
  );
};
