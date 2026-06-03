const http = require("node:http");
const https = require("node:https");
const fs = require("node:fs");
const path = require("node:path");
const { URL } = require("node:url");

const host = "127.0.0.1";
const port = Number(process.env.PORT || 4174);
const root = __dirname;
const defaultSymbols = [
  "tsla.us",
  "rklb.us",
  "asts.us",
  "irdm.us",
  "gsat.us",
  "nvda.us",
  "googl.us",
  "msft.us",
  "meta.us",
  "rivn.us",
  "lcid.us"
];
const cache = new Map();
const cacheTtlMs = 20_000;

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

function sanitizeSymbols(value) {
  const symbols = (value || "")
    .split(",")
    .map((symbol) => symbol.trim().toLowerCase())
    .filter((symbol) => /^[a-z0-9.]+$/.test(symbol));

  return symbols.length ? symbols : defaultSymbols;
}

function fetchStooq(symbols) {
  const key = symbols.join(",");
  const cached = cache.get(key);

  if (cached && Date.now() - cached.createdAt < cacheTtlMs) {
    return Promise.resolve(cached.body);
  }

  const quotePath = `/q/l/?s=${symbols.map((symbol) => encodeURIComponent(symbol)).join("+")}&f=sd2t2ohlcv&h&e=csv`;
  const requestUrl = `https://stooq.com${quotePath}`;

  return new Promise((resolve, reject) => {
    const request = https.get(requestUrl, (response) => {
      let body = "";

      response.setEncoding("utf8");
      response.on("data", (chunk) => {
        body += chunk;
      });
      response.on("end", () => {
        if (response.statusCode < 200 || response.statusCode >= 300) {
          reject(new Error(`Stooq returned ${response.statusCode}`));
          return;
        }

        cache.set(key, { body, createdAt: Date.now() });
        resolve(body);
      });
    });

    request.setTimeout(10_000, () => {
      request.destroy(new Error("Stooq request timed out"));
    });
    request.on("error", reject);
  });
}

function send(response, statusCode, contentType, body) {
  response.writeHead(statusCode, {
    "Content-Type": contentType,
    "Cache-Control": "no-store"
  });
  response.end(body);
}

function serveFile(response, pathname) {
  const cleanPath = pathname === "/" ? "/stock-analysis.html" : pathname;
  const filePath = path.normalize(path.join(root, cleanPath));

  if (!filePath.startsWith(root)) {
    send(response, 403, "text/plain; charset=utf-8", "Forbidden");
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      send(response, 404, "text/plain; charset=utf-8", "Not found");
      return;
    }

    const contentType = mimeTypes[path.extname(filePath)] || "application/octet-stream";
    send(response, 200, contentType, content);
  });
}

const server = http.createServer(async (request, response) => {
  const requestUrl = new URL(request.url, `http://${host}:${port}`);

  if (requestUrl.pathname === "/api/quotes") {
    try {
      const symbols = sanitizeSymbols(requestUrl.searchParams.get("symbols"));
      const csv = await fetchStooq(symbols);
      send(response, 200, "text/csv; charset=utf-8", csv);
    } catch (error) {
      send(response, 502, "application/json; charset=utf-8", JSON.stringify({ error: error.message }));
    }
    return;
  }

  serveFile(response, requestUrl.pathname);
});

server.listen(port, host, () => {
  console.log(`Free stock tracker running at http://${host}:${port}/stock-analysis.html`);
});
