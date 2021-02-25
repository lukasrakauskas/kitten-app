import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

import useCachedImage from 'src/hooks/useCachedImage';
import { RootStackParamList } from 'src/navigation';

const { width } = Dimensions.get('window');

type KittenScreenRouteProp = RouteProp<RootStackParamList, 'Kitten'>;

export default function KittenScreen(): JSX.Element {
  const { params } = useRoute<KittenScreenRouteProp>();
  const { kitten } = params;

  const uri = useCachedImage(kitten.uri);

  return (
    <View style={styles.container}>
      <Image style={styles.image} resizeMode="cover" source={{ uri }} />
      <View style={styles.information}>
        <Text style={styles.title}>{kitten.name}</Text>
        <Text>
          i Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  },
  image: {
    width,
    height: 300
  },
  information: {
    padding: 20
  }
});
