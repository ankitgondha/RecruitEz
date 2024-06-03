import express from "express";
import {
  registerController,
  loginController,
  testController,
  updateRecruiterProfileController,
  updatePasswordController,
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

//Forgot Password || POST
router.post("/forgot-password", updatePasswordController);

//test routes
router.get("/test", requireSignInRecruiter, isRecruiter, testController);

router.put(
  "/updateRecruiterProfile",
  requireSignInRecruiter,
  updateRecruiterProfileController
);

export default router;
