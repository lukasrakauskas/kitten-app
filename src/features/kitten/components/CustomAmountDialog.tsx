import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Dialog from 'react-native-dialog';

interface CustomAmountDialogProps {
  visible: boolean;
  onClose: () => void;
  onSet: (amount: number) => void;
}

export default function CustomAmountDialog({
  visible,
  onSet,
  onClose
}: CustomAmountDialogProps): JSX.Element | null {
  const [amount, setAmount] = useState<number | null>(null);

  const handleSet = () => {
    if (amount !== null) onSet(amount);
  };

  const handleChange = (text: string) => {
    if (text.length === 0) {
      setAmount(null);
      return;
    }
    const newAmount = Number(text.replace(/[^0-9]/g, ''));
    setAmount(newAmount);
  };

  const amountValue = amount !== null ? String(amount) : '';

  return (
    <View style={styles.container}>
      <Dialog.Container visible={visible} onBackdropPress={onClose}>
        <Dialog.Title>Set a custom kitten amount</Dialog.Title>
        <Dialog.Description>
          How many kittens would you like to see?
        </Dialog.Description>
        <Dialog.Input
          onChangeText={handleChange}
          value={amountValue}
          keyboardType="numeric"
          placeholder="Kitten amount"
        />
        <Dialog.Button label="Cancel" onPress={onClose} />
        <Dialog.Button label="Set" onPress={handleSet} />
      </Dialog.Container>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
