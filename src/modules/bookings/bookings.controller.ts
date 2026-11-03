import { Request, Response } from "express";
import { BookingsService, BookingStatus } from "./bookings.service";
import { successResponse, errorResponse } from "../../utils/response";

export class BookingsController {
  static async createBooking(req: Request, res: Response) {
    try {
      const user = req.user;
      if (!user?.email) {
        return errorResponse(res, "Unauthorized", 401);
      }

      const { studioId, date, startTime, endTime, specialRequests } = req.body;

      if (!studioId || !date || !startTime || !endTime) {
        return errorResponse(
          res,
          "Missing required booking fields (studioId, date, startTime, endTime)",
          400
        );
      }

      const result = await BookingsService.createBooking({
        studioId,
        userEmail: user.email,
        userName: user.name || user.email.split("@")[0],
        date,
        startTime,
        endTime,
        specialRequests,
      });

      if (!result.success) {
        return errorResponse(
          res,
          result.error || "Failed to create booking",
          result.status || 400
        );
      }

      return successResponse(res, result.booking, "Booking created successfully", 201);
    } catch (error) {
      console.error("Error creating booking:", error);
      return errorResponse(res, "Internal server error creating booking", 500);
    }
  }

  static async getMyBookings(req: Request, res: Response) {
    try {
      const user = req.user;
      if (!user?.email) {
        return errorResponse(res, "Unauthorized", 401);
      }

      const bookings = await BookingsService.getUserBookings(user.email);
      return successResponse(res, bookings, "My bookings fetched successfully");
    } catch (error) {
      console.error("Error fetching bookings:", error);
      return errorResponse(res, "Failed to fetch bookings", 500);
    }
  }

  static async getHostBookings(req: Request, res: Response) {
    try {
      const user = req.user;
      if (!user?.email) {
        return errorResponse(res, "Unauthorized", 401);
      }

      const bookings = await BookingsService.getHostBookings(user.email);
      return successResponse(res, bookings, "Host bookings fetched successfully");
    } catch (error) {
      console.error("Error fetching host bookings:", error);
      return errorResponse(res, "Failed to fetch host bookings", 500);
    }
  }

  static async cancelBooking(req: Request, res: Response) {
    try {
      const user = req.user;
      if (!user?.email) {
        return errorResponse(res, "Unauthorized", 401);
      }

      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const result = await BookingsService.cancelBooking(id, user.email);

      if (!result.success) {
        return errorResponse(res, result.error || "Cancel failed", result.status || 400);
      }

      return successResponse(res, result.booking, "Booking cancelled successfully");
    } catch (error) {
      console.error("Error cancelling booking:", error);
      return errorResponse(res, "Failed to cancel booking", 500);
    }
  }

  static async updateStatus(req: Request, res: Response) {
    try {
      const user = req.user;
      if (!user?.email) {
        return errorResponse(res, "Unauthorized", 401);
      }

      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const { status } = req.body;

      if (!status) {
        return errorResponse(res, "Status is required", 400);
      }

      const result = await BookingsService.updateStatus(
        id,
        status as BookingStatus,
        user.email
      );

      if (!result.success) {
        return errorResponse(res, result.error || "Status update failed", result.status || 400);
      }

      return successResponse(res, result.booking, "Booking status updated successfully");
    } catch (error) {
      console.error("Error updating booking status:", error);
      return errorResponse(res, "Failed to update booking status", 500);
    }
  }

  static async getStudioSlots(req: Request, res: Response) {
    try {
      const { studioId, date } = req.query;
      if (!studioId || !date) {
        return errorResponse(res, "studioId and date are required query parameters", 400);
      }

      const slots = await BookingsService.getStudioSlots(String(studioId), String(date));
      return successResponse(res, slots, "Studio slots fetched successfully");
    } catch (error) {
      console.error("Error fetching studio slots:", error);
      return errorResponse(res, "Failed to fetch studio slots", 500);
    }
  }
}
