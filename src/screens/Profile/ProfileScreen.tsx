import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Alert,
  ImageStyle,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {launchCamera, CameraOptions, Asset} from 'react-native-image-picker';

import {useTheme} from '../../context/ThemeContext';

type ImagePickerResponse = {
  didCancel?: boolean;
  errorCode?: string;
  errorMessage?: string;
  assets?: Asset[];
};

const ProfileScreen: React.FC = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const {theme, toggleTheme} = useTheme();

  const requestCameraPermission = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message:
              'App needs access to your camera to take a profile picture.',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Permission error:', err);
        return false;
      }
    }
    return true;
  };

  const openCamera = async (): Promise<void> => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert('Camera permission denied');
      return;
    }

    const options: CameraOptions = {
      mediaType: 'photo',
      cameraType: 'back',
      saveToPhotos: true,
      quality: 0.8,
    };

    launchCamera(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image capture');
      } else if (response.errorCode) {
        console.error('ImagePicker Error: ', response.errorMessage);
        Alert.alert('Error', 'Failed to capture image');
      } else if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        if (uri) {
          setImageUri(uri);
        }
      }
    });
  };

  interface Styles {
    container: ViewStyle;
    image: ImageStyle;
    text: TextStyle;
    toggleButton: ViewStyle;
  }

  const styles = StyleSheet.create<Styles>({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: 150,
      height: 150,
      borderRadius: 75,
      margin: 20,
      borderWidth: 2,
    },
    text: {
      fontSize: 18,
      marginBottom: 20,
    },
    toggleButton: {
      marginTop: 20,
    },
  });

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <Text style={[styles.text, {color: theme.colors.text}]}>
        User: Dummy Name
      </Text>
      {imageUri ? (
        <Image
          source={{uri: imageUri}}
          style={[styles.image, {borderColor: theme.colors.primary}]}
          accessibilityLabel="Profile picture"
        />
      ) : (
        <View
          style={[
            styles.image,
            {
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.primary,
            },
          ]}
        />
      )}
      <Button
        title="Capture Image"
        onPress={openCamera}
        color={theme.colors.primary}
      />
      <View style={styles.toggleButton}>
        <Button
          title={`Switch to ${theme.dark ? 'Light' : 'Dark'} Mode`}
          onPress={toggleTheme}
          color={theme.colors.secondary}
        />
      </View>
    </View>
  );
};

export default ProfileScreen;
