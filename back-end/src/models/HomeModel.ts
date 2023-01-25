import { prisma } from '../database/prisma';

class HomeModel {
  index(): string {
    return 'Home API';
  }
}

export default new HomeModel();
