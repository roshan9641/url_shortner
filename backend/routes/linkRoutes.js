import express from "express";
import {
  createLink,
  getAllLinks,
  getLinkStats,
  deleteLink,
  redirectLink
} from "../controllers/linkController.js";

const router = express.Router();

// Required API endpoints per specification
router.post("/api/links", createLink);        // Create new short link
router.get("/api/links", getAllLinks);        // List all links
router.get("/api/links/:code", getLinkStats); // Stats for a single link
router.delete("/api/links/:code", deleteLink); // Delete link

// Redirect route must be last (to avoid conflicts with API paths)
router.get("/:code", redirectLink);            // 302 redirect or 404

export default router;
