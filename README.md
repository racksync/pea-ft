# PEA FT Value Fetcher

This project fetches the FT (Fuel Tariff) value from the PEA (Provincial Electricity Authority) website and returns it as a JSON response.

## Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/racksync/pea-ft.git
    cd pea-ft
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file and add your Telegram credentials:
    ```plaintext
    TELEGRAM_BOT_TOKEN=your_telegram_bot_token
    TELEGRAM_CHAT_ID=your_telegram_chat_id
    ```

4. Build the project:
    ```sh
    npm run build
    ```

5. Run the project locally:
    ```sh
    npm start
    ```

## Deploy to Cloudflare Workers

1. Install Wrangler CLI:
    ```sh
    npm install -g wrangler
    ```

2. Login to Cloudflare:
    ```sh
    wrangler login
    ```

3. Publish the Worker:
    ```sh
    wrangler publish
    ```

## Configure Worker Schedule

To configure the worker schedule interval, update the `wrangler.toml` file. For example, to run the worker every 5 minutes, set the schedule as follows:
```toml
[triggers.crons]
schedule = "*/5 * * * *"
```

## Usage

Send a request to the endpoint to fetch the current FT value:
```sh
curl https://your-worker-subdomain.workers.dev
```

## License

This project is licensed under the MIT License.
