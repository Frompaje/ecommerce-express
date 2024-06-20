import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { env } from "../env";
import { UnauthorizedError } from "../error/Unauthorized-error";
import { prisma } from "../lib/prisma";

export async function adminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw new UnauthorizedError();
  }

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as { sub: string };

    const user = await prisma.user.findFirst({
      where: {
        id: payload.sub,
      },
    });

    if (!user) {
      throw new UnauthorizedError();
    }

    if (user.role !== "ADMIN") {
      throw new UnauthorizedError();
    }

    next();
  } catch (error) {
    console.log(`${error}, Rota:{Middleware:auth}`);

    if (error instanceof UnauthorizedError) {
      return res.status(401).send({
        message: error.message,
      });
    }
  }
}
