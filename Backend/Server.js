const app = require("./src/App");
const http = require("http");
const { Port } = require("./src/config/ServerConfig");
const ConDb = require("./src/db/db");
try {
  // Initilizing server connection
  const server = http.createServer(app);

  ConDb().then((res) => {
    if (res) {
      server.listen(Port, (err) => {
        if (err) {
          throw new Error("Server:", "Server Error");
        }

        console.log("Database Connected ");
        console.log("Server Running on Port: ", Port);
      });
    }
  });
} catch (error) {
  console.log("Server:", error);
}
