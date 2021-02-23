import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      KittenList: 'kitten-list',
      Kitten: 'kitten',
      NotFound: '*'
    }
  }
};
