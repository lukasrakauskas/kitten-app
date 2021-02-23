import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

interface ListingProps {
  kitten: KittenDTO;
}

export default function KittenListing({ kitten }: ListingProps) {
  const { navigate } = useNavigation();

  const handlePress = () => {
    navigate('Kitten', { kitten });
  };

  return (
    <View key={kitten.id} style={styles.listing}>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={kitten.image}
          />
          <Text style={styles.title}>{kitten.name}</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  listing: {
    margin: 16,
    width: width
  },
  image: {
    height: 200,
    width: width - 32,
    marginVertical: 8,
    borderRadius: 16
  },
  title: {
    fontSize: 18
  }
});
