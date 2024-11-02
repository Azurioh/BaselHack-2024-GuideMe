import { prisma } from '../global.js';

export class UserRepository {
  async getAllUsers() {
    return await prisma.user.findMany({});
  }

  async getUserById(id, includeGuide) {
    return await prisma.user.findUniqueOrThrow({
      where: { id },
      include: {
        guidelines: includeGuide,
        likes: includeGuide,
        saved: includeGuide
      }
    });
  }

  async getUserByEmail(email, includeGuide) {
    return await prisma.user.findUniqueOrThrow({
      where: { email },
      include: {
        guidelines: includeGuide,
        likes: includeGuide,
        saved: includeGuide
      }
    });
  }


  async createUser(userData) {
    return await prisma.user.create({ data: userData });
  }

  async updateUser(id, userData) {
    return await prisma.user.update({ where: { id }, data: userData });
  }

  async deleteUser(id) {
    return await prisma.user.delete({ where: { id } });
  }

  async likeGuideline(userId, guidelineId) {
    return await prisma.user.update({
      where: { id: userId },
      data: {
        likes: {
          connect: { id: guidelineId }
        }
      }
    });
  }

  async unlikeGuideline(userId, guidelineId) {
    return await prisma.user.update({
      where: { id: userId },
      data: {
        likes: {
          disconnect: { id: guidelineId }
        }
      }
    });
  }

  async saveGuideline(userId, guidelineId) {
    return await prisma.user.update({
      where: { id: userId },
      data: {
        saved: {
          connect: { id: guidelineId }
        }
      }
    });
  }

  async unsaveGuideline(userId, guidelineId) {
    return await prisma.user.update({
      where: { id: userId },
      data: {
        saved: {
          disconnect: { id: guidelineId }
        }
      }
    });
  }
}
