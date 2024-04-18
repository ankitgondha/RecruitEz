import express from "express";
import {
  registerController,
  loginController,
  testController,
} from "../controllers/authController.js";

import {
  requireSignInRecruiter,
  requireSignInCandidate,
  isRecruiter,
  isCandidate,
} from "../middlewares/authMiddleware.js";
// import { requireSignIn, isRecruiter } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST

router.post("/register", registerController);

//login || METHOD POST
router.post("/login", loginController);

//test routes
router.get("/test", requireSignInRecruiter, isRecruiter, testController);
export default router;
