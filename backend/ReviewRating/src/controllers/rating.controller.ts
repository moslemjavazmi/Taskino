// ReviewRating/src/controllers/rating.controller.ts
import { Request, Response } from "express";
import { createRating } from "../services/rating.service";

export async function submitRating(req: any, res: Response) {
  const raterId = req.user.id;
  const { taskId, rateeId, score, comment } = req.body;

  const rating = await createRating({
    taskId,
    raterId,
    rateeId,
    score,
    comment,
  });

  res.status(201).json(rating);
}
