import { UserRepository } from "../../domain/repositories/UserRepository";

export async function checkIfAdmin(userId: string, userRepository: UserRepository): Promise<boolean> {
  const user = await userRepository.findById(userId);

  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  return user.role === 'ADMIN';
}
