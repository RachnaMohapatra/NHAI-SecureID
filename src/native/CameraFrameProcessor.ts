import { Frame } from 'react-native-vision-camera';
import { Worklets } from 'react-native-worklets-core';
import { TFLiteBridge } from './TFLiteBridge';
import { BlazeFaceDetector } from '../ai/BlazeFaceDetector';

// Instantiated safely on the Main JS Thread
const bridge = new TFLiteBridge('blazeface.tflite');
const detector = new BlazeFaceDetector();

// Handle asynchronous bridge initialization smoothly
bridge.initialize().catch(err => {
  console.error('[AI Pipeline Initialization Error]:', err);
});

// The Worklet payload pipeline receiver running back safely on the JavaScript main context
const runInferenceOnJS = Worklets.createRunOnJS((shareablePixelList: number[]) => {
  try {
    const inputBuffer = new Float32Array(128 * 128 * 3);
    
    // Normalize and sample data structures across array lengths safely
    for (let i = 0; i < inputBuffer.length; i++) {
      inputBuffer[i] = (shareablePixelList[i] || 0) / 255.0; 
    }

    const rawOutputs = bridge.runInference(inputBuffer);
    const detectionResult = detector.detect(rawOutputs);

    // Optional global hook reference if you are updating tracking state elements on the UI
    // global.onFaceTracked?.(detectionResult);

  } catch (e) {
    console.error('[Inference Thread Process Error]:', e);
  }
});

/**
 * Standard exported explicit function block.
 * This format prevents Metro compilation drops across runtime loops.
 */
export function processCameraFrame(frame: Frame): void {
  'worklet';

  // Safely extract the raw byte values within the context of the background thread loop
  const rawPixelArray = frame.toArrayBuffer();
  const uint8View = new Uint8Array(rawPixelArray);
  const shareableBuffer = Array.from(uint8View);

  // Dispatch cleanly across thread regions
  runInferenceOnJS(shareableBuffer);
}