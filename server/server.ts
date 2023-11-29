const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const path = require("path");
const bodyParser = require("body-parser");
import express, { Request, Response } from "express";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const next = require("next");
const { parse } = require("url");

const port = process.env.SERVER_PORT;
const nextApp = next({ dev: true, port });
const handle = nextApp.getRequestHandler();

nextApp
  .prepare()
  .then(() => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, "../", "public")));

    app.use("/api", (req: Request, res: Response) => {
      res.json({ res: "hello!" });
    });

    app.get("/", (req: Request, res: Response) => {
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;
      nextApp.render(req, res, pathname, query);
    });

    app.get("*", (req: Request, res: Response) => {
      return handle(req, res);
    });

    app.post("/test", (req, res, next) => {
      res.json({ repeat: String(req.body.value.repeat(req.body.num)) });
    });

    app.listen(port, () => {
      console.log(`Express server listen port:${port}`);
      console.log(`http://localhost:${port}`);
    });
  })
  .catch((ex: { stack: any }) => {
    console.error(ex.stack);
    process.exit(1);
  });

module.exports = app;
