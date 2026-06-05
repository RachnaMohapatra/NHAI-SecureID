export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type AlignmentStatus = 'Move Closer' | 'Move Back' | 'Center Face' | 'Face Ready' | 'No Face Detected';

export interface FaceDetectionResult {
  hasFace: boolean;
  boundingBox: BoundingBox;
  confidence: number;
  alignmentStatus: AlignmentStatus;
}

export interface ModelConfig {
  modelPath: string;
  scoreThreshold: number;
  iouThreshold: number;
  inputSize: number;
}