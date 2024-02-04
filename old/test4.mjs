// server.mjs

import { PollyClient, SynthesizeSpeechCommand } from "@aws-sdk/client-polly";
import { fromIni } from "@aws-sdk/credential-provider-ini";
import * as fs from "fs";
import { Readable } from "stream";

const credentials = fromIni();
const polly = new PollyClient({
  region: "us-west-2",
  credentials,
});

const params = {
  OutputFormat: "mp3",
  Text: '<speak>This is your SSML content.</speak>',

  VoiceId: "Joanna",
  TextType: 'ssml',

};

async function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
}

async function run() {
  try {
    console.log("Starting speech synthesis...");

    const command = new SynthesizeSpeechCommand(params);
    const response = await polly.send(command);

    console.log("Speech synthesis completed successfully.");

    // Convert the audio stream to a buffer
    const audioBuffer = await streamToBuffer(response.AudioStream);

    // Save the audio data as an MP3 file
    fs.writeFileSync("output.mp3", audioBuffer);

    console.log("Audio file saved as output.mp3.");
  } catch (error) {
    console.error("Error synthesizing speech:", error);
  }
}

run();
console.log("Script execution initiated.");
