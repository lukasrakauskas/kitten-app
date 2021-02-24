import React, { useEffect } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';

import { useAppDispatch, useAppSelector } from 'src/store';

import KittenListing from '../components/KittenListing';
import { KittenDTO } from '../kittenDto';
import { fetchKittensByAmount, selectKittens } from '../kittenSlice';

const { width } = Dimensions.get('window');

export default function KittenListScreen() {
  const kittens = useAppSelector(selectKittens);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchKittensByAmount(3));
  }, [dispatch]);

  const renderItem = ({ item }: { item: KittenDTO }) => (
    <KittenListing key={item.id} kitten={item} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        directionalLockEnabled={true}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, width }}
        style={styles.list}
        data={kittens}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingBottom: 16
  },
  list: {
    // marginVertical: 16
  }
});
