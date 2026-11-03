import { Router } from "express";
import { StudiosController } from "./studios.controller";
import { verifyJWT } from "../../middleware/verifyJWT";

const router = Router();

// Public Read Endpoints
router.get("/", StudiosController.getStudios);
router.get("/featured", StudiosController.getFeatured);
router.get("/mine", verifyJWT, StudiosController.getMyStudios);
router.get("/:id", StudiosController.getStudioById);

// Protected Mutation Endpoints
router.post("/", verifyJWT, StudiosController.createStudio);
router.put("/:id", verifyJWT, StudiosController.updateStudio);
router.delete("/:id", verifyJWT, StudiosController.deleteStudio);

export default router;
