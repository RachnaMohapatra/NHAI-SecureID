import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FaceDetectionResult } from '../ai/types';

interface DetectionOverlayProps {
  detection: FaceDetectionResult;
}

export const DetectionOverlay: React.FC<DetectionOverlayProps> = ({ detection }) => {
  const isReady = detection.alignmentStatus === 'Face Ready';

  return (
    <View style={styles.container}>
      <View style={[styles.badge, isReady ? styles.badgeReady : styles.badgeWait]}>
        <Text style={styles.statusText}>
          {detection.hasFace ? `Face Detected ✅` : `Searching for Face... 🔍`}
        </Text>
        <Text style={styles.subStatusText}>
          Status: {detection.alignmentStatus}
        </Text>
        {detection.hasFace && (
          <Text style={styles.confidenceText}>
            Confidence: {detection.confidence}%
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  badge: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(26, 32, 44, 0.85)',
    borderWidth: 1.5,
    alignItems: 'center',
  },
  badgeReady: { borderColor: '#00FF00' },
  badgeWait: { borderColor: '#FFA500' },
  statusText: { color: '#FFFFFF', fontSize: 18, fontWeight: '700', marginBottom: 4 },
  subStatusText: { color: '#E2E8F0', fontSize: 14, fontWeight: '500', marginBottom: 2 },
  confidenceText: { color: '#4FD1C5', fontSize: 13, fontWeight: '700', fontFamily: 'monospace' },
});