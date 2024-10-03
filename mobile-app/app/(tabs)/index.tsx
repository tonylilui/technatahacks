import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

enum CameraType {
  back = "back"
}

const HomePage: React.FC = () => {
  const [facing, setFacing] = useState<CameraType>(CameraType.back);
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraVisible, setIsCameraVisible] = useState<boolean>(false);

  const handleRequestPermission = async () => {
    const { status } = await requestPermission();
    if (status === "granted") {
      setIsCameraVisible(true);
    } else {
      alert("Camera permission is required to use the camera.");
    }
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={handleRequestPermission} title="Grant Permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isCameraVisible ? (
        <CameraView style={styles.camera} facing={facing}>
        </CameraView>
      ) : (
        <Button title="Open Camera" onPress={handleRequestPermission} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    width: "100%",
    height: "100%",
  },
});

export default HomePage;
