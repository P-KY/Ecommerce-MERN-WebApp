import express from "express";
import {
  loginController,
  registerController,
  testController,
} from "../controllers/authController.js";
import { isAdmin, requireSingnIn } from "../middlewares/authMiddleware.js";
// router object

const router = express.Router();

// routing

// register || POSt
router.post("/register", registerController);

// LOGIN || POST
router.post("/login", loginController);

// test || get
router.get("/test", requireSingnIn, isAdmin, testController);

export default router;
