import { prisma } from '../global.js';

export class UserRepository {
  async getAllUsers(includePassword) {
    return await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        guidelines: false,
        likes: false,
        saved: false,
        password: includePassword,
      },
    });
  }

  async getUserById(id, includeGuide, includePassword) {
    return await prisma.user.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        guidelines: includeGuide,
        likes: includeGuide,
        saved: includeGuide,
        password: includePassword,
      },
    });
  }

  async getUserByEmail(email, includeGuide, includePassword) {
    return await prisma.user.findUniqueOrThrow({
      where: { email },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        guidelines: includeGuide,
        likes: includeGuide,
        saved: includeGuide,
        password: includePassword,
      },
    });
  }

  async createUser(userData, includePassword) {
    return await prisma.user.create({
      data: userData,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        guidelines: true,
        likes: true,
        saved: true,
        password: includePassword,
      },
    });
  }

  async updateUser(id, userData, includePassword) {
    return await prisma.user.update({
      where: { id },
      data: userData,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        guidelines: true,
        likes: true,
        saved: true,
        password: includePassword,
      },
    });
  }

  async deleteUser(id) {
    return await prisma.user.delete({ where: { id } });
  }

  async likeGuideline(userId, guidelineId) {
    return await prisma.user.update({
      where: { id: userId },
      data: {
        likes: {
          connect: { id: guidelineId },
        },
      },
    });
  }

  async unlikeGuideline(userId, guidelineId) {
    return await prisma.user.update({
      where: { id: userId },
      data: {
        likes: {
          disconnect: { id: guidelineId },
        },
      },
    });
  }

  async saveGuideline(userId, guidelineId) {
    return await prisma.user.update({
      where: { id: userId },
      data: {
        saved: {
          connect: { id: guidelineId },
        },
      },
    });
  }

  async unsaveGuideline(userId, guidelineId) {
    return await prisma.user.update({
      where: { id: userId },
      data: {
        saved: {
          disconnect: { id: guidelineId },
        },
      },
    });
  }
}
