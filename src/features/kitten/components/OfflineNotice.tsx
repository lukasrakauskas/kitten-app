import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

import useOnline from 'src/hooks/useOnline';

const { width } = Dimensions.get('window');

export default function OfflineNotice() {
  const isOnline = useOnline();

  if (isOnline) return null;

  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    zIndex: 1
  },
  offlineText: { color: '#fff' }
});
