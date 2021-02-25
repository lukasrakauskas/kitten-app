import React, { memo } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import useCachedImage, { isCachedImage } from 'src/hooks/useCachedImage';
import useOnline from 'src/hooks/useOnline';

import { KittenDTO } from '../kittenDto';

const { width } = Dimensions.get('window');

interface ListingProps {
  kitten: KittenDTO;
}

function KittenListing({ kitten }: ListingProps) {
  const { navigate } = useNavigation();
  const isOnline = useOnline();

  const handlePress = () => {
    if (isOnline) navigate('Kitten', { kitten });
  };

  const uri = useCachedImage(kitten.uri);

  if (!isCachedImage(uri) && !isOnline) {
    return null;
  }

  return (
    <View key={kitten.id} style={styles.listing}>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View>
          <Image style={styles.image} resizeMode="cover" source={{ uri }} />
          <Text style={styles.title}>{kitten.name}</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
export default memo(KittenListing);

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
