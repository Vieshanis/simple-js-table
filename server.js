const http = require("http");
const fs = require('fs').promises;
const host = 'localhost';
const port = 8000;

const requestListener = function (req, res) {
  console.log(req.url)

  if (req.url.includes('/test')) {
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(shareIndexFile);
  } else {
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(indexFile);
  }
};

fs.readFile(__dirname + "/index.html")
  .then(contents => {
    indexFile = contents;
  })
  .catch(err => {
    console.error(`Could not read index.html file: ${err}`);
    process.exit(1);
  });

fs.readFile(__dirname + "/share.html")
  .then(contents => {
    shareIndexFile = contents;
  })
  .catch(err => {
    console.error(`Could not read test.html file: ${err}`);
    process.exit(1);
  });


const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});