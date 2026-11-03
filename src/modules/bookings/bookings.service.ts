import { ObjectId } from "mongodb";
import { getDB } from "../../config/db";
import { StudiosService } from "../studios/studios.service";
import { checkBookingOverlap } from "./overlap";

export type BookingStatus = "Pending" | "Confirmed" | "Cancelled" | "Completed";

export interface BookingDocument {
  _id?: ObjectId;
  studioId: string;
  studioName: string;
  studioImage: string;
  studioLocation: string;
  hostEmail: string;
  userEmail: string;
  userName: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  hours: number;
  hourlyRate: number;
  cleaningFee: number;
  serviceFee: number;
  totalPrice: number;
  status: BookingStatus;
  specialRequests?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBookingInput {
  studioId: string;
  userEmail: string;
  userName: string;
  date: string;
  startTime: string;
  endTime: string;
  specialRequests?: string;
}

export class BookingsService {
  private static collection() {
    return getDB().collection<BookingDocument>("bookings");
  }

  static async createBooking(input: CreateBookingInput) {
    const studio = await StudiosService.getStudioById(input.studioId);
    if (!studio) {
      return { success: false, status: 404, error: "Studio not found" };
    }

    // Step 7: Double-Booking Prevention Algorithm check
    const overlapCheck = await checkBookingOverlap(
      input.studioId,
      input.date,
      input.startTime,
      input.endTime
    );

    if (overlapCheck.hasConflict) {
      return {
        success: false,
        status: 409,
        error: overlapCheck.message || "Time slot conflict: Overlaps with an existing booking",
        conflictingBooking: overlapCheck.conflictingBooking,
      };
    }

    // Calculate hours from start and end time
    const [startH, startM] = input.startTime.split(":").map(Number);
    const [endH, endM] = input.endTime.split(":").map(Number);
    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;

    if (endMinutes <= startMinutes) {
      return {
        success: false,
        status: 400,
        error: "End time must be after start time",
      };
    }

    const durationHours = Math.max(1, (endMinutes - startMinutes) / 60);
    const hourlyRate = studio.hourlyRate || 75;
    const basePrice = Math.round(durationHours * hourlyRate);
    const cleaningFee = 35;
    const serviceFee = Math.round(basePrice * 0.1); // 10% platform fee
    const totalPrice = basePrice + cleaningFee + serviceFee;

    const col = this.collection();
    const now = new Date();
    const bookingDoc: BookingDocument = {
      studioId: input.studioId,
      studioName: studio.name,
      studioImage: studio.featuredImage || studio.images?.[0] || "",
      studioLocation: `${studio.location.city}, ${studio.location.state}`,
      hostEmail: studio.ownerEmail,
      userEmail: input.userEmail,
      userName: input.userName,
      date: input.date,
      startTime: input.startTime,
      endTime: input.endTime,
      hours: durationHours,
      hourlyRate,
      cleaningFee,
      serviceFee,
      totalPrice,
      status: "Confirmed",
      specialRequests: input.specialRequests,
      createdAt: now,
      updatedAt: now,
    };

    const result = await col.insertOne(bookingDoc);
    return {
      success: true,
      booking: { ...bookingDoc, _id: result.insertedId },
    };
  }

  static async getUserBookings(userEmail: string) {
    const col = this.collection();
    return col.find({ userEmail }).sort({ createdAt: -1 }).toArray();
  }

  static async getHostBookings(hostEmail: string) {
    const col = this.collection();
    return col.find({ hostEmail }).sort({ createdAt: -1 }).toArray();
  }

  static async getBookingById(id: string) {
    if (!ObjectId.isValid(id)) return null;
    const col = this.collection();
    return col.findOne({ _id: new ObjectId(id) });
  }

  static async cancelBooking(id: string, userEmail: string) {
    if (!ObjectId.isValid(id)) {
      return { success: false, status: 400, error: "Invalid booking ID" };
    }

    const col = this.collection();
    const booking = await col.findOne({ _id: new ObjectId(id) });
    if (!booking) {
      return { success: false, status: 404, error: "Booking not found" };
    }

    // Ownership: either creator or host
    if (booking.userEmail !== userEmail && booking.hostEmail !== userEmail) {
      return {
        success: false,
        status: 403,
        error: "Forbidden: You are not authorized to cancel this booking",
      };
    }

    const updated = await col.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          status: "Cancelled",
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" }
    );

    return { success: true, booking: updated };
  }

  static async updateStatus(id: string, status: BookingStatus, userEmail: string) {
    if (!ObjectId.isValid(id)) {
      return { success: false, status: 400, error: "Invalid booking ID" };
    }

    const col = this.collection();
    const booking = await col.findOne({ _id: new ObjectId(id) });
    if (!booking) {
      return { success: false, status: 404, error: "Booking not found" };
    }

    if (booking.hostEmail !== userEmail && booking.userEmail !== userEmail) {
      return {
        success: false,
        status: 403,
        error: "Forbidden: You are not authorized to change status for this booking",
      };
    }

    const updated = await col.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          status,
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" }
    );

    return { success: true, booking: updated };
  }

  static async getStudioSlots(studioId: string, date: string) {
    const col = this.collection();
    return col
      .find({
        studioId,
        date,
        status: { $in: ["Confirmed", "Pending"] },
      })
      .project({ startTime: 1, endTime: 1, status: 1 })
      .toArray();
  }
}
