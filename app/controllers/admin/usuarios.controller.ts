import { RequestHandler } from 'express';
import usuariosService from '../../services/usuarios.service';
import { ErrorHandler } from '../../helpers/error';


export const findAll: RequestHandler = async (req, res, next) => {
    try {
        const result = await usuariosService.listAll(); //findAndCountAll

        return res.status(200).json({
            message: "Usuarios listados correctamente.",
            data: result,
        });
    } catch(error) {
        next(error);
    }
};

export const create: RequestHandler = async (req, res, next) => {
    try {
        console.log("BODY", req.body);
        const result = await usuariosService.createUser(req.body);

        return res.status(200).json({
            message: "Usuario creado correctamente.",
            data: result,
        });

    } catch(error) {
        next(error);
    }
};

export const remove: RequestHandler = async (req, res, next) => {
    try {
        await usuariosService.deleteUsers(req.body);

        return res.status(200).json({
            message: "Usuario/s eliminado/s correctamente."
        });
    } catch(error) {
        next(error);
    }
};