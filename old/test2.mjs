import { PollyClient, SynthesizeSpeechCommand } from '@aws-sdk/client-polly';
import { fromIni } from '@aws-sdk/credential-provider-ini';
import player from 'play-sound'; // Import the play-sound module

const credentials = fromIni();
const polly = new PollyClient({
  region: 'us-west-2',
  credentials,
});

const params = {
  OutputFormat: 'mp3',
  Text: 'Hello, this is a test from Amazon Polly.',
  VoiceId: 'Joanna',
};

// ... (previous code)

async function run() {
  try {
    console.log('Starting speech synthesis...');

    const command = new SynthesizeSpeechCommand(params);
    const response = await polly.send(command);

    console.log('Speech synthesis completed successfully.');

    // Debug log: Check the length of the audio buffer
    const audioBuffer = Buffer.from(await streamToBuffer(response.AudioStream));
    console.log('Audio buffer length:', audioBuffer.length);

    // Play the audio directly through the computer's speakers using play-sound
    const play = player();
    play.play(audioBuffer, (err) => {
      if (err) {
        console.error('Error playing audio:', err);
      } else {
        console.log('Audio played successfully.');
      }
    });

    // You can add more logic here if needed

  } catch (error) {
    console.error('Error synthesizing speech:', error);
  }
}

// ... (remaining code)

async function streamToBuffer(stream) {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', reject);
  });
}

run(); // Call the async function to execute the code
console.log('Script execution initiated.');