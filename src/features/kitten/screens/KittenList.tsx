import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View
} from 'react-native';

import useOnline from 'src/hooks/useOnline';
import { useAppDispatch, useAppSelector } from 'src/store';

import CustomAmountDialog from '../components/CustomAmountDialog';
import KittenListing from '../components/KittenListing';
import OfflineNotice from '../components/OfflineNotice';
import { KittenDTO } from '../kittenDto';
import { fetchKittensByAmount, selectKittens } from '../kittenSlice';

const { width } = Dimensions.get('window');

export default function KittenListScreen() {
  const kittens = useAppSelector(selectKittens);
  const status = useAppSelector((state) => state.kitten.status);
  const dispatch = useAppDispatch();
  const isOnline = useOnline();

  const [amount, setAmount] = useState(30);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchKittensByAmount(amount));
  }, [dispatch, amount]);

  const renderItem = ({ item }: { item: KittenDTO }) => (
    <KittenListing key={item.id} kitten={item} />
  );

  const handleOpen = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const handleSet = (newAmount: number) => {
    setAmount(newAmount);
    setVisible(false);
  };

  if (status === 'pending') {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Loading kittens :3</Text>
      </View>
    );
  }

  const renderListHeaderComponent = () => {
    return (
      <>
        <View style={styles.buttons}>
          <View style={[styles.buttonContainer, { marginRight: 8 }]}>
            <Button
              title="30"
              onPress={() => setAmount(30)}
              disabled={!isOnline}
            />
          </View>
          <View style={[styles.buttonContainer, { marginVertical: 8 }]}>
            <Button
              title="50"
              onPress={() => setAmount(50)}
              disabled={!isOnline}
            />
          </View>
          <View style={[styles.buttonContainer, { marginLeft: 8 }]}>
            <Button
              title="100"
              onPress={() => setAmount(100)}
              disabled={!isOnline}
            />
          </View>
        </View>
        <Button
          title="Custom amount"
          onPress={handleOpen}
          disabled={!isOnline}
        />
      </>
    );
  };

  return (
    <View style={styles.container}>
      <OfflineNotice />
      <CustomAmountDialog
        visible={visible}
        onSet={handleSet}
        onClose={handleClose}
      />
      <FlatList
        ListHeaderComponent={renderListHeaderComponent()}
        directionalLockEnabled={true}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
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
    justifyContent: 'center'
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8
  },
  buttonContainer: {
    flex: 1
  },
  contentContainer: {
    paddingHorizontal: 16,
    width,
    paddingBottom: 16
  }
});
