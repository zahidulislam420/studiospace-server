import { Router } from "express";
import { BookingsController } from "./bookings.controller";
import { verifyJWT } from "../../middleware/verifyJWT";

const router = Router();

// Public availability check
router.get("/slots", BookingsController.getStudioSlots);

// Protected routes
router.post("/", verifyJWT, BookingsController.createBooking);
router.get("/mine", verifyJWT, BookingsController.getMyBookings);
router.get("/host", verifyJWT, BookingsController.getHostBookings);
router.patch("/:id/cancel", verifyJWT, BookingsController.cancelBooking);
router.patch("/:id/status", verifyJWT, BookingsController.updateStatus);

export default router;
