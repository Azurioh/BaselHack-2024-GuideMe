export class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getAllUsers(includePassword = false) {
    return await this.userRepository.getAllUsers(includePassword);
  }

  async getUserById(id, includeGuide, includePassword = false) {
    return await this.userRepository.getUserById(id, includeGuide, includePassword);
  }

  async getUserByEmail(email, includeGuide, includePassword = false) {
    return await this.userRepository.getUserByEmail(email, includeGuide, includePassword);
  }

  async createUser(userData, includePassword = false) {
    return await this.userRepository.createUser(userData, includePassword);
  }

  async updateUser(id, userData, includePassword = false) {
    return await this.userRepository.updateUser(id, userData, includePassword);
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
