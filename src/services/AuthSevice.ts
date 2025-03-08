import bcrypt from 'bcrypt';
import { INTERNAL_SERVER_ERROR_SERVICE_RESPONSE, ServiceResponse } from '../entities/Service';
import Logger from '$pkg/logger';
import { createAccessToken } from '$utils/jwt.utils';
import { hashPassword } from '$utils/password.utils';
import { UserRegisterDTO } from '$entities/User';
import authRepository from '../repositores/AuthRepository';

async function register(userData: UserRegisterDTO): Promise<ServiceResponse<{}>> {
  try {
    const { fullName, password, email } = userData;

    const existingUser = await authRepository.getByEmail(email);
    if (existingUser) {
      return {
        status: false,
        err: { message: 'User already exists', code: 409 },
      };
    }

    const hashedPassword = await hashPassword(password);
    const user = await authRepository.create({
      fullName,
      email,
      password: hashedPassword,
    });

    const token = createAccessToken({
      id: user.id,
      email: user.email,
    });
    const { password: _password, createAt, updateAt, ...userWithoutPassword } = user;

    const result = {
      status: true,
      data: {
        token: token,
        user: userWithoutPassword,
      },
    };
    return result;
  } catch (err) {
    Logger.error(`AuthService.register : ${err}`);
    return INTERNAL_SERVER_ERROR_SERVICE_RESPONSE;
  }
}

async function login(input: { email: string; password: string }): Promise<ServiceResponse<{ token: string }>> {
  try {
    const { email, password } = input;

    const user = await authRepository.getByEmail(email);

    if (!user) {
      return {
        status: false,
        err: { message: 'Invalid email or password', code: 401 },
      };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return {
        status: false,
        err: { message: 'Invalid email or password', code: 401 },
      };
    }

    const token = createAccessToken({
      id: user.id,
      email: user.email,
    });

    const { password: _password, createdAt, updatedAt, ...userWithoutPassword } = user;

    const result = {
      status: true,
      data: {
        token: token,
        user: userWithoutPassword,
      },
    };

    return result;
  } catch (err) {
    Logger.error(`AuthService.login : ${err}`);
    return {
      ...INTERNAL_SERVER_ERROR_SERVICE_RESPONSE,
      data: undefined,
    } as ServiceResponse<{ token: string }>;
  }
}

async function me(userId: string): Promise<ServiceResponse<{}>> {
  try {
    const user = await authRepository.me(userId);
    if (!user) {
      return {
        status: false,
        err: { message: 'User not found', code: 404 },
      };
    }
    const { password: _password, createdAt, updatedAt, ...userWithoutPassword } = user;
    const result = {
      status: true,
      data: userWithoutPassword,
    };
    return result;
  } catch (err) {
    Logger.error(`AuthService.me : ${err}`);
    return INTERNAL_SERVER_ERROR_SERVICE_RESPONSE;
  }
}

const authService = { register, login, me };

export default authService;
