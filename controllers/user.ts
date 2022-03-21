import { Request, Response } from "express";
import User from "../models/user";

export const getUsers = async (req: Request, res: Response) => {
  const usuarios = await User.findAll();
  res.json({
    msg: "getUsuarios",
    usuarios,
  });
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const usuario = await User.findByPk(id);
  if (usuario) {
    return res.json({ usuario });
  }
  res.status(404).json({
    msg: "No existe el usuario",
  });
};

export const postUser = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const usuario = await User.create(body);
    await usuario.save();

    res.json({ usuario });
  } catch (error) {
    res.status(500).json({
      msg: "Error interno" + error,
    });
  }
};

export const putUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  res.json({
    msg: "putUsuarios",
    body,
    id,
  });
};

export const deletetUser = (req: Request, res: Response) => {
  const { id } = req.params;

  res.json({
    msg: "deleteUsuarios",
    id,
  });
};
