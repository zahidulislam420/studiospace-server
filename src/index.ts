import express from "express";

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (_req, res) => {
  res.json({ message: "StudioSpace Server API is running" });
});

export default app;
