import { getDB } from "../../config/db";
import { BookingDocument } from "./bookings.service";

export interface OverlapCheckResult {
  hasConflict: boolean;
  conflictingBooking?: BookingDocument;
  message?: string;
}

/**
 * Checks for overlapping bookings on the same studio and date.
 * Double-Booking Prevention Algorithm (AGENTS.md Section 7 Step 7):
 * existing.startTime < new.endTime && existing.endTime > new.startTime
 */
export async function checkBookingOverlap(
  studioId: string,
  date: string,
  newStartTime: string,
  newEndTime: string,
  excludeBookingId?: string
): Promise<OverlapCheckResult> {
  const col = getDB().collection<BookingDocument>("bookings");

  // Query confirmed or pending bookings for the same studio and date
  const bookings = await col
    .find({
      studioId,
      date,
      status: { $in: ["Confirmed", "Pending"] },
      ...(excludeBookingId ? { _id: { $ne: excludeBookingId as unknown as import("mongodb").ObjectId } } : {}),
    })
    .toArray();

  for (const existing of bookings) {
    // Condition: existing.startTime < new.endTime && existing.endTime > new.startTime
    if (existing.startTime < newEndTime && existing.endTime > newStartTime) {
      return {
        hasConflict: true,
        conflictingBooking: existing,
        message: `Time slot conflict: Studio is already reserved from ${existing.startTime} to ${existing.endTime} on ${existing.date}. Please choose a different time window.`,
      };
    }
  }

  return { hasConflict: false };
}
