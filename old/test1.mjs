// server.mjs

import { PollyClient, SynthesizeSpeechCommand } from '@aws-sdk/client-polly';
import { fromIni } from '@aws-sdk/credential-provider-ini'; // Import fromIni

// Set the AWS credentials directly
const credentials = fromIni(); // Use fromIni to load credentials from AWS CLI configuration

const polly = new PollyClient({
  region: 'us-west-2',
  credentials, // Set the credentials
});

// Use Amazon Polly to synthesize speech
const params = {
  OutputFormat: 'mp3',
  Text: 'Hello, this is a test from Amazon Polly.',
  VoiceId: 'Joanna', // You can choose from various voices. 'Joanna' is just an example.
};

// ... (previous code)

async function run() {
  try {
    console.log('Starting speech synthesis...'); // Add this line

    const command = new SynthesizeSpeechCommand(params);
    const response = await polly.send(command);

    console.log('Speech synthesis completed successfully.'); // Add this line

    // Handle the response as needed
    const audioBuffer = response.AudioStream;
    // Further processing or saving the audio data can be done here
  } catch (error) {
    console.error('Error synthesizing speech:', error);
  }
}

run(); // Call the async function to execute the code
console.log('Script execution initiated.'); // Add this line

// ... (rest of the code remains the same)
