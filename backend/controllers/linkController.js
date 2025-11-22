import Link from "../models/Link.js";
import { generateCode } from "../utils/generateCode.js";

// POST /api/links - Create a short link
export const createLink = async (req, res) => {
  try {
    const { url, code } = req.body;

    if (!url) {
      return res.status(400).json({ message: "URL is required" });
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return res.status(400).json({ message: "Invalid URL format" });
    }

    // Codes must follow [A-Za-z0-9]{6,8}
    const codeRegex = /^[A-Za-z0-9]{6,8}$/;

    // If no custom code, generate one (length 6)
    let finalCode = code || generateCode();

    if (!codeRegex.test(finalCode)) {
      return res.status(400).json({
        message: "Code must be 6-8 characters long and alphanumeric only",
      });
    }

    // Ensure code is globally unique
    const existing = await Link.findOne({ code: finalCode });
    if (existing) {
      return res.status(409).json({ message: "Code already exists" });
    }

    // Create and save link
    const link = await Link.create({
      url,
      code: finalCode,
    });

    return res.status(201).json(link);
  } catch (err) {
    console.error("Error in createLink:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET /api/links - List all links
export const getAllLinks = async (req, res) => {
  try {
    const links = await Link.find().sort({ createdAt: -1 });
    return res.status(200).json(links);
  } catch (err) {
    console.error("Error in getAllLinks:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET /api/links/:code - Get stats for one code
export const getLinkStats = async (req, res) => {
  try {
    const { code } = req.params;

    const link = await Link.findOne({ code });
    if (!link) {
      return res.status(404).json({ message: "Not found" });
    }

    return res.status(200).json(link);
  } catch (err) {
    console.error("Error in getLinkStats:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/links/:code - Delete link
export const deleteLink = async (req, res) => {
  try {
    const { code } = req.params;

    const deleted = await Link.findOneAndDelete({ code });
    if (!deleted) {
      return res.status(404).json({ message: "Not found" });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Error in deleteLink:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET /:code - Redirect to original URL + increment stats
export const redirectLink = async (req, res) => {
  try {
    const { code } = req.params;

    const link = await Link.findOne({ code });

    if (!link) {
      return res.status(404).send("Not found");
    }

    // Update click stats
    link.totalClicks += 1;
    link.lastClicked = new Date();
    await link.save();

    return res.redirect(302, link.url);
  } catch (err) {
    console.error("Error in redirectLink:", err);
    return res.status(500).send("Server error");
  }
};
