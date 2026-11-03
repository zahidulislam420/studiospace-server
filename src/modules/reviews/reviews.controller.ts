import { Request, Response } from "express";
import { ReviewsService } from "./reviews.service";
import { successResponse, errorResponse } from "../../utils/response";

export class ReviewsController {
  static async getReviews(req: Request, res: Response) {
    try {
      const studioId = Array.isArray(req.params.studioId)
        ? req.params.studioId[0]
        : req.params.studioId;

      const reviews = await ReviewsService.getReviewsByStudio(studioId);
      return successResponse(res, reviews, "Reviews fetched successfully");
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return errorResponse(res, "Failed to fetch reviews", 500);
    }
  }

  static async addReview(req: Request, res: Response) {
    try {
      const user = req.user;
      if (!user?.email) {
        return errorResponse(res, "Unauthorized", 401);
      }

      const { studioId, rating, comment } = req.body;
      if (!studioId || !rating || !comment) {
        return errorResponse(res, "studioId, rating, and comment are required", 400);
      }

      const result = await ReviewsService.addReview({
        studioId,
        userEmail: user.email,
        userName: user.name || user.email.split("@")[0],
        rating: Number(rating),
        comment,
      });

      if (!result.success) {
        return errorResponse(res, result.error || "Failed to add review", result.status || 400);
      }

      return successResponse(res, result.review, "Review posted successfully", 201);
    } catch (error) {
      console.error("Error posting review:", error);
      return errorResponse(res, "Failed to post review", 500);
    }
  }
}
