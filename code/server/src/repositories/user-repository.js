import { prisma } from '../global.js';

export class UserRepository {
  async getAllUsers(includeGuide) {
    return await prisma.user.findMany({ include: { guidelines: includeGuide } });
  }

  async getUserById(id, includeGuide) {
    return await prisma.user.findUniqueOrThrow({ where: { id }, include: { guidelines: includeGuide } });
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
}
