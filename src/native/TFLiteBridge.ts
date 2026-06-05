import { ModelLoader } from '../ai/ModelLoader';

export class TFLiteBridge {
  private model: any = null;

  // Change string declaration to accept a direct asset reference module
  constructor(private modelAsset: any) {}

  public async initialize(): Promise<void> {
    // Pass the required asset directly into the model loader instance
    this.model = await ModelLoader.getModelInstance(this.modelAsset);
  }

  public runInference(inputBuffer: Float32Array): Float32Array[] {
    if (!this.model) {
      throw new Error('[TFLite Bridge] Inference invoked before initialization lifecycle completion.');
    }

    const outputs = this.model.run([inputBuffer]);
    return outputs.map((out: any) => new Float32Array(out));
  }
}