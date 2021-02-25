import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import useOnline from 'src/features/hooks/useOnline';

import { KittenDTO } from '../kittenDto';

const { width } = Dimensions.get('window');

interface ListingProps {
  kitten: KittenDTO;
}

export default function KittenListing({ kitten }: ListingProps) {
  const { navigate } = useNavigation();
  const isOnline = useOnline();

  const handlePress = () => {
    if (isOnline) navigate('Kitten', { kitten });
  };

  return (
    <View key={kitten.id} style={styles.listing}>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={{ uri: kitten.uri }}
          />
          <Text style={styles.title}>{kitten.name}</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  listing: {
    width
  },
  image: {
    height: 200,
    width: width - 32,
    marginVertical: 16,
    borderRadius: 16,
    overlayColor: 'white',
    overflow: 'hidden'
  },
  title: {
    fontSize: 18
  }
});
