import { getTwilioClient } from './twilio_config';
import twilio from 'twilio';

export function sendSMS(client: twilio.Twilio, recipientNumber: string, message: string) {
  const twilio = getTwilioClient();
  const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

  client.messages
    .create({
      body: message,
      from: twilioNumber,
      to: recipientNumber,
    })
    .then((message) => console.log(message.sid))
    .catch((err) => console.log(err));
}
