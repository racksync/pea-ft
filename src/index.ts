import axios from 'axios';
import * as cheerio from 'cheerio';

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

      // Return the FT value as JSON
      return new Response(JSON.stringify({ ftValue }), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return new Response(`Error: ${error.message}`, { status: 500 });
    }
  },
};