import axios from 'axios';
import * as cheerio from 'cheerio';
// Remove dotenv import
// import * as dotenv from 'dotenv';

// dotenv.config();

async function sendTelegramNotification(message: string) {
  const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

  await axios.post(url, {
    chat_id: chatId,
    text: message,
  });
}

function getCurrentMonthPeriod(): string {
  const month = new Date().getMonth() + 1; // getMonth() returns 0-11
  if (month >= 1 && month <= 4) {
    return 'มกราคม-เมษายน';
  } else if (month >= 5 && month <= 8) {
    return 'พฤษภาคม-สิงหาคม';
  } else {
    return 'กันยายน-ธันวาคม';
  }
}

export default {
  async fetch(request: Request, env: any, ctx: ExecutionContext): Promise<Response> {
    try {
      // Fetch the webpage
      const response = await axios.get('https://www.pea.co.th/our-services/tariff/ft');
      const html = response.data;

      // Load the HTML into cheerio
      const $ = cheerio.load(html);

      // Extract the FT value from the element with ID #current-ft
      const ftValue = $('#current-ft').text().trim();

      // Check if the FT value is unknown, null, or incorrect
      if (!ftValue || isNaN(Number(ftValue))) {
        await sendTelegramNotification('FT value is unknown, null, or incorrect.');
        return new Response('FT value is unknown, null, or incorrect.', { status: 500 });
      }

      // Get the current period
      const period = getCurrentMonthPeriod();
      const year = new Date().getFullYear() + 543; // Convert to Buddhist year
      const timestamp = Math.floor((Date.now() + 7 * 60 * 60 * 1000) / 1000); // Adjust to UTC+7

      // Return the FT value, period, year, and timestamp as JSON
      return new Response(JSON.stringify({ ftValue, period, year, timestamp }), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      await sendTelegramNotification(`Error: ${error.message}`);
      return new Response(`Error: ${error.message}`, { status: 500 });
    }
  },
};