export class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getAllUsers() {
    return await this.userRepository.getAllUsers();
  }

  async getUserById(id, includeGuide) {
    return await this.userRepository.getUserById(id, includeGuide);
  }

  async createUser(userData) {
    return await this.userRepository.createUser(userData);
  }

  async updateUser(id, userData) {
    return await this.userRepository.updateUser(id, userData);
  }

  async deleteUser(id) {
    return await this.userRepository.deleteUser(id);
  }

  async likeGuideline(userId, guidelineId) {
    return await this.userRepository.likeGuideline(userId, guidelineId);
  }

  async unlikeGuideline(userId, guidelineId) {
    return await this.userRepository.unlikeGuideline(userId, guidelineId);
  }

  async saveGuideline(userId, guidelineId) {
    return await this.userRepository.saveGuideline(userId, guidelineId);
  }

  async unsaveGuideline(userId, guidelineId) {
    return await this.userRepository.unsaveGuideline(userId, guidelineId);
  }
}
