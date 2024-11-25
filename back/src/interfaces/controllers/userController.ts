import { Request, Response } from 'express';
import { UserService } from '../../application/services/userService';
import { CreateUserDTO, UpdateUserDTO } from '../../application/dtos/UserDTO';

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  public async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password, role }: CreateUserDTO = req.body;
      const userId = req.params.id;

      const newUser = await this.userService.createUser({ name, email, password, role }, userId);
      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(400).json({ message: 'erro na criação do usuário' });
    }
  }

  public async getAll(res: Response): Promise<Response> {
    try {
      const users = await this.userService.getAll();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: "error.message" });
    }
  }

  public async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const user = await this.userService.getById(id);
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encotrado' });
      }
      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "error.message" });
    }
  }

  public async editUser(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password, role }: UpdateUserDTO = req.body;
      const userId = req.params.id;

      const updatedUser = await this.userService.editUser(userId, { name, email, password, role });
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(400).json({ message: 'Erro na edição do usuário' });
    }
  }

  public async deactivateUser(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.params.id;

      await this.userService.deactivateUser(userId);
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ message: 'Erro na desativação do usuário' });
    }
  }

  public async activedUser(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.params.id;

      await this.userService.activateUser(userId);
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ message: 'Erro na desativação do usuário' });
    }
  }
}
