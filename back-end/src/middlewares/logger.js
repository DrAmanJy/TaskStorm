import morgan from "morgan";
import fs from "fs";
import path from "path";

const logDir = path.resolve("src/logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logFilePath = path.join(logDir, "access.log");
const accessLogStream = fs.createWriteStream(logFilePath, { flags: "a" });

const fileLogger = morgan("combined", { stream: accessLogStream });

const consoleLogger = morgan("dev");

const logger = (req, res, next) => {
  fileLogger(req, res, () => {});
  consoleLogger(req, res, next);
};

export default logger;
