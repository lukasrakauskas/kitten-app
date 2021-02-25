import { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';

export default function useOnline(): boolean {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected ?? false);
    });

    return () => {
      unsubscribe();
    };
  }, [setIsConnected]);

  return isConnected;
}
