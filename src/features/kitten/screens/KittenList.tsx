import * as React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import KittenListing from '../components/KittenListing';

const CAT_NAMES = [
  'Perseus',
  'Quilstream',
  'MrFuzzbutt',
  'Butter',
  'Gulliver',
  'Ruby',
  'Azurisz',
  'Fred',
  'Twinkle'
];

const random = () => CAT_NAMES[Math.floor(Math.random() * CAT_NAMES.length)];

const listings: KittenDTO[] = [
  {
    id: 'a',
    name: random(),
    image: require('assets/tiny-home.jpg')
  },
  {
    id: 'b',
    name: random(),
    image: require('assets/cook-house.jpg')
  },
  {
    id: 'c',
    name: random(),
    image: require('assets/tiny-home.jpg')
  },
  {
    id: 'd',
    name: random(),
    image: require('assets/cook-house.jpg')
  },
  {
    id: 'e',
    name: random(),
    image: require('assets/tiny-home.jpg')
  },
  {
    id: 'f',
    name: random(),
    image: require('assets/cook-house.jpg')
  }
];

export default function KittenListScreen() {
  const renderItem = ({ item }: { item: KittenDTO }) => (
    <KittenListing key={item.id} kitten={item} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        style={styles.list}
        data={listings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 0,
    padding: 0,
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  list: {
    padding: 0,
    margin: 0
  }
});
