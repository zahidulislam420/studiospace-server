import { Request, Response } from "express";
import { WishlistService } from "./wishlist.service";
import { successResponse, errorResponse } from "../../utils/response";

export class WishlistController {
  static async toggle(req: Request, res: Response) {
    try {
      const user = req.user;
      if (!user?.email) {
        return errorResponse(res, "Unauthorized", 401);
      }

      const { studioId } = req.body;
      if (!studioId) {
        return errorResponse(res, "studioId is required", 400);
      }

      const result = await WishlistService.toggleWishlist(user.email, studioId);
      if (!result.success) {
        return errorResponse(res, result.error || "Toggle failed", result.status || 400);
      }

      return successResponse(res, { isWishlisted: result.isWishlisted }, result.message);
    } catch (error) {
      console.error("Error toggling wishlist:", error);
      return errorResponse(res, "Failed to toggle wishlist", 500);
    }
  }

  static async getMyWishlist(req: Request, res: Response) {
    try {
      const user = req.user;
      if (!user?.email) {
        return errorResponse(res, "Unauthorized", 401);
      }

      const studios = await WishlistService.getUserWishlist(user.email);
      return successResponse(res, studios, "Wishlist studios fetched successfully");
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      return errorResponse(res, "Failed to fetch wishlist", 500);
    }
  }

  static async checkStatus(req: Request, res: Response) {
    try {
      const user = req.user;
      if (!user?.email) {
        return successResponse(res, { isWishlisted: false });
      }

      const studioId = Array.isArray(req.params.studioId)
        ? req.params.studioId[0]
        : req.params.studioId;

      const isWishlisted = await WishlistService.isStudioWishlisted(user.email, studioId);
      return successResponse(res, { isWishlisted });
    } catch (error) {
      console.error("Error checking wishlist status:", error);
      return errorResponse(res, "Failed to check wishlist status", 500);
    }
  }
}
