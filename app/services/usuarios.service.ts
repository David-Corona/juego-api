import bcrypt from 'bcrypt';
import { FindOptions } from 'sequelize/types';
import { Op } from 'sequelize';

import Usuario from '../models/usuario.model';
import { ErrorHandler } from '../helpers/error';


class UsuariosService {

  async listAll( options: FindOptions) {
    try {
      const usuarios = await Usuario.findAndCountAll(options);
      return usuarios;

    } catch(error: any) {
      throw new ErrorHandler(500, "Error al listar usuarios", error.message)
    }
  }

  async createUser(usuario: Usuario) {
    try {
      const user = await Usuario.findOne({ where: { "email": usuario.email }})
      if (user) {
        throw new ErrorHandler(400, "El email ya está en uso.");
      }

      const hashedPassword = await bcrypt.hash(usuario.password, Number(process.env.BCRYPT_SALT));

      const newUsuario = new Usuario({
        nombre: usuario.nombre,
        email: usuario.email,
        password: hashedPassword,
        role: usuario.role || 'user',
        is_active: usuario.is_active || false
      });

      return await newUsuario.save();    

    } catch(error: any) {
      throw new ErrorHandler(500, "Error al crear usuario", error.message)
    }
  }

  async updateUser(id: number, usuario: Usuario) {
    try {
      const user = await Usuario.findByPk(id);
      if (!user) {
        throw new ErrorHandler(400, "ID de usuario incorrecta.");
      }

      await user.update(usuario); // patch
      return user;

    } catch(error: any) {
      throw new ErrorHandler(500, "Error al actualizar usuario", error.message)
    }
  }

  async deleteUsers(ids: number[]) {
    try {
      const users = await Usuario.findAll({ where: { id: ids }});
      if (users.length !== ids.length) {
        throw new ErrorHandler(400, "IDs de usuario incorrectas.");
      }
    
      await Usuario.destroy({ where: { id: ids }}); 

    } catch(error: any) {
      throw new ErrorHandler(500, "Error al eliminar usuario", error.message)
    }
  }



}

export default new UsuariosService();