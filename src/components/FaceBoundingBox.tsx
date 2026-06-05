import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BoundingBox } from '../ai/types';

interface FaceBoundingBoxProps {
  box: BoundingBox;
  isValid: boolean;
}

export const FaceBoundingBox: React.FC<FaceBoundingBoxProps> = ({ box, isValid }) => {
  if (box.width === 0 || box.height === 0) return null;

  return (
    <View style={[
      styles.box,
      {
        left: box.x,
        top: box.y,
        width: box.width,
        height: box.height,
        borderColor: isValid ? '#00FF00' : '#FF3B30' // Green when face is aligned, red when misaligned
      }
    ]}>
      {/* Dynamic corner anchors */}
      <View style={[styles.corner, styles.topLeft]} />
      <View style={[styles.corner, styles.topRight]} />
      <View style={[styles.corner, styles.bottomLeft]} />
      <View style={[styles.corner, styles.bottomRight]} />
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    position: 'absolute',
    borderWidth: 2,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  corner: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderColor: '#FFFFFF',
  },
  topLeft: { top: -2, left: -2, borderTopWidth: 3, borderLeftWidth: 3 },
  topRight: { top: -2, right: -2, borderTopWidth: 3, borderRightWidth: 3 },
  bottomLeft: { bottom: -2, left: -2, borderBottomWidth: 3, borderLeftWidth: 3 },
  bottomRight: { bottom: -2, right: -2, borderBottomWidth: 3, borderRightWidth: 3 },
});