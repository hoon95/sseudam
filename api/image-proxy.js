const http = require("http");

module.exports = async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).send("Missing URL");
  }

  http.get(url, (proxyRes) => {
    res.writeHead(proxyRes.statusCode || 200, proxyRes.headers);
    proxyRes.pipe(res);
  }).on("error", (err) => {
    console.error("Proxy error:", err);
    res.status(500).send("Image fetch failed");
  });
};
