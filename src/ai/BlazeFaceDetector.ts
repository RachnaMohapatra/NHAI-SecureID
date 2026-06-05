import { FaceDetectionResult, AlignmentStatus, BoundingBox } from './types';

export class BlazeFaceDetector {
  private inputSize = 128; // Standard BlazeFace coordinate map input resolution
  private scoreThreshold = 0.75;

  public detect(outputs: Float32Array[]): FaceDetectionResult {
    // BlazeFace typically maps two output tensors: 
    // Output[0] structural regression bounding shapes [1, 896, 16]
    // Output[1] classification score values [1, 896, 1]
    const boxesTensor = outputs[0];
    const scoresTensor = outputs[1];

    let highestConfidence = 0;
    let bestBoxIndex = -1;

    // Scan anchor configurations to isolate the highest confidence target score
    for (let i = 0; i < scoresTensor.length; i++) {
      if (scoresTensor[i] > highestConfidence) {
        highestConfidence = scoresTensor[i];
        bestBoxIndex = i;
      }
    }

    if (bestBoxIndex === -1 || highestConfidence < this.scoreThreshold) {
      return {
        hasFace: false,
        boundingBox: { x: 0, y: 0, width: 0, height: 0 },
        confidence: 0,
        alignmentStatus: 'No Face Detected'
      };
    }

    // Isolate bounding indices offsets (4 attributes per bounding box tracking mapping: yMin, xMin, yMax, xMax)
    const offset = bestBoxIndex * 16;
    const yMin = boxesTensor[offset];
    const xMin = boxesTensor[offset + 1];
    const yMax = boxesTensor[offset + 2];
    const xMax = boxesTensor[offset + 3];

    // Convert normalized model tensors back into standard ratio bounds
    const boundingBox: BoundingBox = {
      x: Math.max(0, xMin),
      y: Math.max(0, yMin),
      width: Math.min(1, xMax - xMin),
      height: Math.min(1, yMax - yMin),
    };

    const alignmentStatus = this.calculateAlignment(boundingBox);

    return {
      hasFace: true,
      boundingBox,
      confidence: Math.round(highestConfidence * 100),
      alignmentStatus
    };
  }

  private calculateAlignment(box: BoundingBox): AlignmentStatus {
    // Check face size inside frame to ensure biometric accuracy
    if (box.width < 0.35 || box.height < 0.35) {
      return 'Move Closer';
    }
    if (box.width > 0.75 || box.height > 0.75) {
      return 'Move Back';
    }

    // Verify center alignment relative to coordinate space axis benchmarks
    const faceCenterX = box.x + box.width / 2;
    const faceCenterY = box.y + box.height / 2;

    if (faceCenterX < 0.35 || faceCenterX > 0.65 || faceCenterY < 0.35 || faceCenterY > 0.65) {
      return 'Center Face';
    }

    return 'Face Ready';
  }
}