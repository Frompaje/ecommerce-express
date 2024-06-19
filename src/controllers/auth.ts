import { Request, Response } from "express";

export function login(req: Request, res: Response) {
  res.send("Login Works");
}
