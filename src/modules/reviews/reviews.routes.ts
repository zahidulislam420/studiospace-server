import { Router } from "express";
import { ReviewsController } from "./reviews.controller";
import { verifyJWT } from "../../middleware/verifyJWT";

const router = Router();

router.get("/:studioId", ReviewsController.getReviews);
router.post("/", verifyJWT, ReviewsController.addReview);

export default router;
