import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

interface CameraOverlayProps {
  instructionText: string;
}

const { width } = Dimensions.get('window');
const overlaySize = width * 0.75;

export default function CameraOverlay({ instructionText }: CameraOverlayProps) {
  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      <View style={styles.darkener} />
      <View style={styles.centerRow}>
        <View style={styles.darkener} />
        <View style={styles.cutoffBox} />
        <View style={styles.darkener} />
      </View>
      <View style={styles.bannerBottom}>
        <Text style={styles.promptText}>{instructionText}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  darkener: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.65)' },
  centerRow: { flexDirection: 'row', height: overlaySize },
  cutoffBox: {
    width: overlaySize,
    height: overlaySize,
    borderRadius: overlaySize / 2,
    borderWidth: 3,
    borderColor: '#00E676',
    backgroundColor: 'transparent',
  },
  bannerBottom: { flex: 1.5, backgroundColor: 'rgba(0, 0, 0, 0.65)', alignItems: 'center', paddingTop: 32 },
  promptText: { color: '#FFFFFF', fontSize: 18, fontWeight: '700', textAlign: 'center', paddingHorizontal: 24, textTransform: 'uppercase' },
});