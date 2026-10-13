import { createServer } from "http";
import { createApp } from "./app.js";

async function startServer() {
  const app = createApp({ serveStatic: true });
  const server = createServer(app);

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
