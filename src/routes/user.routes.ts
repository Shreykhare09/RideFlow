import { Router } from "express";
import { createUser } from "../controllers/user.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorizeRoles } from "../middleware/role.middleware";

const router = Router();

router.post("/", createUser);

router.get("/profile", authenticate, (req, res) => {
  res.status(200).json({
    messsage: "You are authenticated",
    user: req.user,
  });
});

router.get(
  "/driver-test",
  authenticate,
  authorizeRoles("driver"),
  (req, res) => {
    res.status(200).json({
      message: "Driver access granted",
      user: req.user,
    });
  }
);

router.get(
  "/rider-test",
  authenticate,
  authorizeRoles("rider"),
  (req, res) => {
    res.status(200).json({
        message: "Rider access granted",
        user: req.user,
    });
  }
);
export default router;
