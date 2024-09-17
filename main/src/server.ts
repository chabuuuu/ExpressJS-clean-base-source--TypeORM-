import "dotenv/config";
import express from "express";
import "reflect-metadata";
import helmet from "helmet";
// import { errorHanlder } from "@/middleware/error.middleware";
import { route } from "@/routes";
import { AppDataSource } from "@/database/db.datasource";
import { GlobalConfig } from "@/utils/config/global-config.util";
import cors from "cors";
import morgan from "morgan";
import { endRequestPipelineMiddleware } from "@/middleware/end-request-pipeline.middleware";
import responser from "responser";
import { globalErrorHanlder } from "@/middleware/error-handle.middleware";

/**
 * Express app
 */
const app = express();

/**
 * Middlewares
 */
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(morgan(GlobalConfig.morgan.format || "dev"));
app.use(cors(GlobalConfig.cors));
if (GlobalConfig.helmet.enable) {
  app.use(helmet());
}
app.use(responser);

/**
 * Routes
 */
route(app, GlobalConfig.server.api_version);

/**
 * Global error handler
 */
app.use(globalErrorHanlder);
/**
 * End request pipeline handler
 */
app.use(endRequestPipelineMiddleware);

/**
 * Server
 */
AppDataSource.getInstance()
  .initialize()
  .then(async () => {
    console.log("Database is connected");
    const port = GlobalConfig.server.port || 3000;
    app.listen(port, () => {
      console.log(
        `Server is running on http://localhost:${port} in ${GlobalConfig.enviroment} mode`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });