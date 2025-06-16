import express from "express";
import http from "http";

const app = express();

app.get("/image-proxy", (req, res) => {
  const url = req.query.url;
  if (!url || typeof url !== "string") {
    return res.status(400).send("Missing URL");
  }

  http.get(url, (proxyRes) => {
    res.writeHead(proxyRes.statusCode || 200, proxyRes.headers);
    proxyRes.pipe(res);
  }).on("error", (err) => {
    console.error("Proxy error:", err);
    res.status(500).send("Fetch failed");
  });
});

app.listen(4000, () => {
  console.log("Image proxy running on http://localhost:4000");
});
