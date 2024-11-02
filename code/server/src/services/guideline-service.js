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

  async createGuideline(guidelineData) {
    try {
        const imageData = guidelineData.imgs

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
        console.log("Classification result:", result);

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
