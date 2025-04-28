import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // The application is purely client-side with no API routes needed
  // All calculations are handled on the frontend

  const httpServer = createServer(app);

  return httpServer;
}
