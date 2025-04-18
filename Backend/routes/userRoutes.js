import express from "express";
import fetchuser from "../middleware/fetchuser.js";

const router = express.Router();

// **Protected Route: Get User Profile**
router.get("/:userId", fetchuser, (req, res) => {
    if (req.params.userId !== req.user.id) {
        return res.status(403).json({ message: "Access Denied: You can't view this page" });
    }

    res.json({ message: `Welcome ${req.user.name}, this is your profile!` });
});

export default router;
