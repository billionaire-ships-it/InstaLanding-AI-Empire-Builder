import mongoose, { Schema, model, models } from "mongoose";

const LandingPageSchema = new Schema({
  userId: { type: String, required: true },
  prompt: { type: String, required: true },
  html: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const LandingPage = models.LandingPage || model("LandingPage", LandingPageSchema);

export default LandingPage;
 