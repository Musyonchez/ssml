// server.mjs

import pkg from 'aws-sdk';
const { config } = pkg;
import { PollyClient, SynthesizeSpeechCommand } from '@aws-sdk/client-polly';

// Rest of your code remains the same




// Set the AWS credentials
config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-west-2',
});

const polly = new PollyClient({ region: 'us-west-2' });

// Use Amazon Polly to synthesize speech
const params = {
  OutputFormat: 'mp3',
  Text: 'Hello, this is a test from Amazon Polly.',
  VoiceId: 'Joanna', // You can choose from various voices. 'Joanna' is just an example.
};

async function run() {
  try {
    const command = new SynthesizeSpeechCommand(params);
    const response = await polly.send(command);
    
    // Handle the response as needed
    const audioBuffer = response.AudioStream;
    // Further processing or saving the audio data can be done here
  } catch (error) {
    console.error('Error synthesizing speech:', error);
  }
}

run(); // Call the async function to execute the code
