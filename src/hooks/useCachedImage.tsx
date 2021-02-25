import { useEffect, useRef, useState } from 'react';
import { InteractionManager } from 'react-native';
import * as Crypto from 'expo-crypto';
import * as FileSystem from 'expo-file-system';

export const isCachedImage = (uri: string) => uri.startsWith('file');

export default function useCachedImage(providedUri: string) {
  const [uri, setUri] = useState('');
  const downloadResumable = useRef<FileSystem.DownloadResumable | null>(null);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  });

  useEffect(() => {
    const interaction = InteractionManager.runAfterInteractions(async () => {
      if (providedUri) {
        const savedUri = await getImageFileSystemKey(providedUri);
        if (providedUri !== uri || savedUri !== uri)
          await loadImage(savedUri, providedUri);
      }
    });

    return () => {
      if (interaction) interaction.cancel();
      checkClear();
    };
  }, [providedUri]);

  const checkClear = async () => {
    try {
      if (downloadResumable) {
        const t = await downloadResumable.current?.pauseAsync();
        const savedUri = await getImageFileSystemKey(providedUri);
        const metadata = await FileSystem.getInfoAsync(savedUri);
        if (metadata.exists && t?.fileUri) {
          await FileSystem.deleteAsync(t.fileUri);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getImageFileSystemKey = async (remoteUri: string) => {
    const hashed = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      remoteUri
    );
    return `${FileSystem.documentDirectory}${hashed}`;
  };

  const loadImage = async (savedUri: string, remoteUri: string) => {
    if (downloadResumable.current)
      downloadResumable.current._removeSubscription();

    try {
      // Use the cached image if it exists
      const metadata = await FileSystem.getInfoAsync(savedUri);
      if (metadata.exists) {
        setUri(savedUri);
        return;
      }

      // otherwise download to cache
      const newDownloadResumable = FileSystem.createDownloadResumable(
        remoteUri,
        savedUri,
        {},
        onDownloadUpdate
      );

      const imageObject = await newDownloadResumable.downloadAsync();
      if (mounted.current && imageObject && imageObject.status === 200)
        setUri(imageObject.uri);
    } catch (err) {
      if (mounted.current) setUri('');

      const metadata = await FileSystem.getInfoAsync(savedUri);
      if (metadata.exists) await FileSystem.deleteAsync(savedUri);
    }
  };

  const onDownloadUpdate = (
    downloadProgress: FileSystem.DownloadProgressData
  ) => {
    if (
      downloadProgress.totalBytesWritten >=
      downloadProgress.totalBytesExpectedToWrite
    ) {
      if (downloadResumable.current)
        downloadResumable.current._removeSubscription();
      downloadResumable.current = null;
    }
  };

  return uri ? uri : providedUri;
}
