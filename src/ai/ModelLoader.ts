import { loadTensorflowModel } from 'react-native-fast-tflite';

export class ModelLoader {
  private static instance: any = null;

  // Change parameter from a string path to an inline asset require module reference
  public static async getModelInstance(modelSource: any): Promise<any> {
    if (this.instance !== null) {
      return this.instance;
    }

    try {
      console.log(`[AI Engine] Initializing model instance directly via bundle asset module...`);
      
      // Pass the direct require reference into the model loader
      this.instance = await loadTensorflowModel(modelSource);
      
      console.log(`[AI Engine] BlazeFace TFLite model loaded successfully!`);
      return this.instance;
    } catch (error) {
      console.error('[AI Engine] Failed to initialize TFLite model instance:', error);
      throw error;
    }
  }
}