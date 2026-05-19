import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/generate-achievement", async (req, res) => {
    try {
      const { level, currentAchievements, actionType } = req.body;
      
      const prompt = `You are a game designer for an infinite leveling system. 
      The player is currently level ${level}. 
      They just performed the action: "${actionType}".
      Current achievements unlocked: ${JSON.stringify(currentAchievements || [])}.
      
      Generate a NEW, UNIQUE, and CREATIVE achievement name and description for this player. 
      The achievement should feel like it belongs in a professional game like Google Play Games.
      Provide a Lucide icon name (like 'Trophy', 'Sword', 'Shield', 'Zap', 'Star', 'Flame', 'Ghost', 'Crown', 'Target', 'Compass', 'Key', 'Lock', 'Unlock', 'Gamepad', 'Ghost') that fits the vibe.`;

      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              description: { type: Type.STRING },
              icon: { type: Type.STRING }
            },
            required: ["name", "description", "icon"]
          }
        }
      });

      const achievement = JSON.parse(result.text || "{}");
      res.json(achievement);
    } catch (error) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: "Failed to generate achievement" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
