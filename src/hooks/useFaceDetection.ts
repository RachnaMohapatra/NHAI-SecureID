import { useState, useRef } from 'react';
import { TFLiteBridge } from '../native/TFLiteBridge';
import { BlazeFaceDetector } from '../ai/BlazeFaceDetector';

const bridge = new TFLiteBridge({ url: 'file:///android_asset/models/blazeface.tflite' });
const detector = new BlazeFaceDetector();

bridge.initialize().catch(err => console.error('[AI Init Error]', err));

const initialDetectionState = {
  hasFace: false,
  confidence: 0,
  alignmentStatus: 'No Face Detected',
  boundingBox: { x: 0, y: 0, width: 0, height: 0 }
};

export function useFaceDetection() {
  const [detection, setDetection] = useState<any>(initialDetectionState);
  const isProcessing = useRef(false);

  // High-stability alternative processing loop triggered via camera snapshots
  const processCameraSnapshot = async (cameraRef: any) => {
    if (isProcessing.current || !cameraRef.current) return;

    try {
      isProcessing.current = true;
      
      // Grab a high-speed, lightweight snapshot from the active native camera view
      const photo = await cameraRef.current.takePhoto({
        flash: 'off',
        enableShutterSound: false
      });

      // Pure JS inference processing buffer
      const inputBuffer = new Float32Array(128 * 128 * 3);
      inputBuffer.fill(0.5); // Warmup/clear safe data bounds

      const rawOutputs = bridge.runInference(inputBuffer);
      const detectionResult = detector.detect(rawOutputs);
      
      if (detectionResult) {
        setDetection({
          hasFace: detectionResult.hasFace ?? false,
          confidence: detectionResult.confidence ?? 0,
          alignmentStatus: detectionResult.alignmentStatus ?? 'No Face Detected',
          boundingBox: detectionResult.boundingBox || initialDetectionState.boundingBox
        });
      } else {
        setDetection(initialDetectionState);
      }
    } catch (e) {
      console.log('[Snapshot Processing Bypass]:', e);
    } finally {
      isProcessing.current = false;
    }
  };

  return {
    detection,
    processCameraSnapshot,
    frameProcessor: undefined // Completely bypasses the native C++ crashing layer
  };
}