import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';

const HomeScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);

  const askForPermission = async () => {
    // Show confirmation pop-up
    Alert.alert(
      'Camera Access',
      'Do you want to access the camera?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
            if (status === 'granted') {
              Alert.alert('Permission granted', 'You can now access the camera');
            } else {
              Alert.alert('Permission denied', 'You cannot access the camera');
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={askForPermission}>
        <Text style={styles.buttonText}>Camera</Text>
      </TouchableOpacity>
      {hasPermission === false && (
        <Text style={styles.errorText}>Camera permission denied</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 150,
    height: 50,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    marginTop: 20,
    color: 'red',
  },
});

export default HomeScreen;
