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

  async getGuidelineByEmail(email) {
    return await this.guidelineRepository.getGuidelineByEmail(email);
  }

  async createGuideline(guidelineData) {
    return await this.guidelineRepository.createGuideline(guidelineData);
  }

  async updateGuideline(id, guidelineData) {
    return await this.guidelineRepository.updateGuideline(id, guidelineData);
  }

  async deleteGuideline(id) {
    return await this.guidelineRepository.deleteGuideline(id);
  }
}
