import { prisma } from '../utils/prisma.utils';

async function create(user: any) {
  const result = await prisma.user.create({ data: user });
  return result;
}

async function getByEmail(email: string): Promise<any> {
  const result = prisma.user.findUnique({ where: { email } });
  return result;
}

async function me(userId: string): Promise<any> {
  const result = await prisma.user.findUnique({ where: { id: userId } });
  return result;
}

const authRepository = {
  create,
  me,
  getByEmail,
};

export default authRepository;
