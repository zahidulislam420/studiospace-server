import { Router } from "express";
import { WishlistController } from "./wishlist.controller";
import { verifyJWT, optionalJWT } from "../../middleware/verifyJWT";

const router = Router();

router.post("/toggle", verifyJWT, WishlistController.toggle);
router.get("/mine", verifyJWT, WishlistController.getMyWishlist);
router.get("/check/:studioId", optionalJWT, WishlistController.checkStatus);

export default router;
