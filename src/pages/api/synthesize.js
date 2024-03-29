// pages/api/synthesize.js
import { PollyClient, SynthesizeSpeechCommand } from "@aws-sdk/client-polly";

import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

const polly = new PollyClient({
  region: "us-west-2", // Adjust the region accordingly
  credentials,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' parameter in the request body" });
  }

  const params = {
    OutputFormat: "mp3",
    Text: `<speak>${text}</speak>`,
    VoiceId: "Joanna",
    TextType: 'ssml',
  };

  try {
    const command = new SynthesizeSpeechCommand(params);
    const response = await polly.send(command);

    const audioBuffer = await streamToBuffer(response.AudioStream);

    res.setHeader("Content-Type", "audio/mp3"); // Fix content type
    res.status(200).send(audioBuffer); // Add status code
    
  } catch (error) {
    console.error("Error synthesizing speech:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function streamToBuffer(stream) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}
