import express from "express";
import App from "./services/express";
import dbConnection from "./services/database";

const startServer = async () => {

    const app = express();

    await dbConnection();
    await App(app);

    app.listen(8001,() => {
        console.log("listening to port 8001")
    })
}

startServer();