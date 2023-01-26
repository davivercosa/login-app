import { prisma } from '../database/prisma';

class HomeModel {
  index(): string {
    return 'Login App API';
  }
}

export default new HomeModel();
