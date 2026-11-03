import { Request, Response } from "express";
import { StudiosService, StudioFilterQuery } from "./studios.service";
import { successResponse, errorResponse } from "../../utils/response";

export class StudiosController {
  static async getStudios(req: Request, res: Response) {
    try {
      const {
        search,
        category,
        minPrice,
        maxPrice,
        capacity,
        ownerEmail,
        sortBy,
        page,
        limit,
      } = req.query;

      const query: StudioFilterQuery = {
        search: search ? String(search) : undefined,
        category: category ? String(category) : undefined,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        capacity: capacity ? Number(capacity) : undefined,
        ownerEmail: ownerEmail ? String(ownerEmail) : undefined,
        sortBy: sortBy as StudioFilterQuery["sortBy"],
        page: page ? Number(page) : 1,
        limit: limit ? Number(limit) : 12,
      };

      const result = await StudiosService.findStudios(query);
      return successResponse(
        res,
        result.studios,
        "Studios fetched successfully",
        200,
        result.pagination
      );
    } catch (error) {
      console.error("Error fetching studios:", error);
      return errorResponse(res, "Failed to fetch studios", 500);
    }
  }

  static async getFeatured(req: Request, res: Response) {
    try {
      const limit = req.query.limit ? Number(req.query.limit) : 6;
      const featured = await StudiosService.getFeaturedStudios(limit);
      return successResponse(res, featured, "Featured studios fetched successfully");
    } catch (error) {
      console.error("Error fetching featured studios:", error);
      return errorResponse(res, "Failed to fetch featured studios", 500);
    }
  }

  static async getStudioById(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const studio = await StudiosService.getStudioById(id);

      if (!studio) {
        return errorResponse(res, "Studio not found", 404);
      }

      return successResponse(res, studio, "Studio details fetched successfully");
    } catch (error) {
      console.error("Error fetching studio details:", error);
      return errorResponse(res, "Failed to fetch studio details", 500);
    }
  }

  static async createStudio(req: Request, res: Response) {
    try {
      const user = req.user;
      if (!user?.email) {
        return errorResponse(res, "Unauthorized", 401);
      }

      const body = req.body;

      if (!body.name || !body.category || !body.hourlyRate) {
        return errorResponse(res, "Missing required studio fields (name, category, hourlyRate)", 400);
      }

      const newStudio = await StudiosService.createStudio({
        ...body,
        hourlyRate: Number(body.hourlyRate),
        capacity: Number(body.capacity || 10),
        squareFeet: Number(body.squareFeet || 500),
        ownerEmail: user.email,
        ownerName: user.name || body.ownerName || "Studio Host",
        ownerAvatar: user.name ? undefined : undefined,
        amenities: Array.isArray(body.amenities) ? body.amenities : [],
        equipment: Array.isArray(body.equipment) ? body.equipment : [],
        rules: Array.isArray(body.rules) ? body.rules : [],
        images: Array.isArray(body.images) ? body.images : [body.featuredImage || ""],
        featuredImage: body.featuredImage || (body.images?.[0] ?? ""),
        rating: 5.0,
        reviewCount: 0,
        isFeatured: Boolean(body.isFeatured),
      });

      return successResponse(res, newStudio, "Studio created successfully", 201);
    } catch (error) {
      console.error("Error creating studio:", error);
      return errorResponse(res, "Failed to create studio", 500);
    }
  }

  static async updateStudio(req: Request, res: Response) {
    try {
      const user = req.user;
      if (!user?.email) {
        return errorResponse(res, "Unauthorized", 401);
      }

      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const result = await StudiosService.updateStudio(id, req.body, user.email);

      if (!result.success) {
        return errorResponse(res, result.error || "Update failed", result.status || 400);
      }

      return successResponse(res, result.studio, "Studio updated successfully");
    } catch (error) {
      console.error("Error updating studio:", error);
      return errorResponse(res, "Failed to update studio", 500);
    }
  }

  static async deleteStudio(req: Request, res: Response) {
    try {
      const user = req.user;
      if (!user?.email) {
        return errorResponse(res, "Unauthorized", 401);
      }

      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const result = await StudiosService.deleteStudio(id, user.email);

      if (!result.success) {
        return errorResponse(res, result.error || "Delete failed", result.status || 400);
      }

      return successResponse(res, { id }, "Studio deleted successfully");
    } catch (error) {
      console.error("Error deleting studio:", error);
      return errorResponse(res, "Failed to delete studio", 500);
    }
  }
}
