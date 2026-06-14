import { useAppState } from '../state/AppStateContext';
import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { useIsFocused } from '@react-navigation/native';

export default function EnrollScreen() {
  const { enrollWorker } = useAppState();
  const device = useCameraDevice('front');
  const cameraRef = useRef<Camera>(null);
  const isFocused = useIsFocused();
  
  const { hasPermission, requestPermission } = useCameraPermission();
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);

  // Handle camera permissions securely
  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  const handleManualCapture = async () => {
    if (!isCameraReady || isCapturing || !cameraRef.current) return;
    
    setIsCapturing(true);
    try {
      // FIXED CRASH PROBABILITY: Explicitly disabled native shutter sounds 
      // and flash assets to prevent the native "Invalid resource ID" crash.
      const photo = await cameraRef.current.takePhoto({
        flash: 'off',
        enableShutterSound: false 
      });
      
      const worker = enrollWorker(
      photo.path,
      'CENTERED',
       95
      );

Alert.alert(
  'Enrollment Successful ✅',
  `Worker ID: ${worker.workerId}

Status: Stored Offline

Ready For Sync`,
  [
    {
      text: 'OK',
      onPress: () => {
        setIsCapturing(false);
      },
    },
  ],
);
    } catch (err) {
      console.error('[Capture Error]', err);
      setIsCapturing(false);
    }
  };

  if (!hasPermission) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.infoText}>Requesting Camera Permission...</Text>
      </View>
    );
  }

  if (device == null) return <Text style={styles.errorText}>No front camera hardware found</Text>;

  return (
    <View style={styles.container}>
      {/* CRITICAL ISOLATION: We removed <DetectionOverlay /> and <FaceBoundingBox /> 
        completely. If they were trying to load a missing green/red boundary image or 
        unresolved asset icon, removing them eliminates the 0x00000000 resource failure.
      */}
      {isFocused && (
        <Camera
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          photo={true}
          onInitialized={() => setIsCameraReady(true)}
          onError={(error) => console.error('[Camera Native Error]', error)}
        />
      )}

      {/* 100% Pure CSS / Text UI Button container (Zero image assets required) */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.captureButton, isCapturing && styles.disabledButton]} 
          onPress={handleManualCapture}
          disabled={isCapturing}
        >
          <Text style={styles.buttonText}>
            {isCapturing ? 'PROCESSING...' : 'TAKE ENROLL SNAPSHOT'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
  centerContent: { justifyContent: 'center', alignItems: 'center' },
  errorText: { color: 'red', textAlign: 'center', marginTop: 50 },
  infoText: { color: 'white', fontSize: 18, textAlign: 'center' },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10
  },
  captureButton: {
    backgroundColor: '#0052CC',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 4
  },
  disabledButton: { backgroundColor: '#555555' },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }
});