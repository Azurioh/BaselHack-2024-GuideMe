import getYogaGuide from "./getInstructions.js";

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
    guidelineData.result = await getYogaGuide(guidelineData.title);
    return await this.guidelineRepository.createGuideline(guidelineData);
  }

  async updateGuideline(id, guidelineData) {
    return await this.guidelineRepository.updateGuideline(id, guidelineData);
  }

  async deleteGuideline(id) {
    return await this.guidelineRepository.deleteGuideline(id);
  }
}
