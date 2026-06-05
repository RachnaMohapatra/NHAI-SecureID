import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { useIsFocused } from '@react-navigation/native';
import { useCameraPermission } from '../hooks/useCameraPermission';

export default function CameraPreview() {
  // Select the front-facing camera
  const device = useCameraDevice('front');
  
  // Check if this screen is currently active/visible to the user
  const isFocused = useIsFocused();
  
  // Fetch our custom permission states
  const { hasPermission, isChecking } = useCameraPermission();

  // 1. Show loading state while checking permissions
  if (isChecking) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.infoText}>Checking camera permissions...</Text>
      </View>
    );
  }

  // 2. Show UI if permission was denied
  if (!hasPermission) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>
          Camera permission is required to proceed. Please enable it in your device settings.
        </Text>
      </View>
    );
  }

  // 3. Show UI if no front camera physically exists on the device
  if (device == null) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>No front camera detected on this device.</Text>
      </View>
    );
  }

  // 4. Render the active camera feed
  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isFocused} // Pauses camera when screen is not focused
        photo={false} // Disabled for now until Phase 2B
        video={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    padding: 20,
  },
  infoText: {
    color: '#ffffff',
    fontSize: 16,
    marginTop: 12,
  },
  errorText: {
    color: '#ff4444',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
});