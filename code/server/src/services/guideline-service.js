import getYogaGuide from "./getInstructions.js";
import { promises as fs } from 'fs';

export class GuidelineService {
  constructor(guidelineRepository) {
    this.guidelineRepository = guidelineRepository;
  }

  async getAllGuidelines() {
    return await this.guidelineRepository.getAllGuidelines();
  }

  async getGuidelineById(id) {
    return await this.guidelineRepository.getGuidelineById(id);
  }

  async createGuideline(guidelineData, id) {
    try {
      const imageData = guidelineData.imgs

      guidelineData.creatorId = id;
      const response = await fetch('http://python-server:5000/classify-yoga', {
        method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                images_base64: imageData
            })
        });

        const result = await response.json();
        if (result.error || !result.pose_name) {
            throw new Error(result.error);
        }
        guidelineData.result = await getYogaGuide(result.pose_name);

    } catch (error) {
      console.error("Classification error:", error);
    }
    return await this.guidelineRepository.createGuideline(guidelineData);
  }

  async imageToBase64(filePath) {
    const buffer = await fs.readFile(filePath);
    return buffer.toString('base64');
  }

  async updateGuideline(id, guidelineData) {
    return await this.guidelineRepository.updateGuideline(id, guidelineData);
  }

  async deleteGuideline(id) {
    return await this.guidelineRepository.deleteGuideline(id);
  }
}
