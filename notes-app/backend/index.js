const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const noteRoutes = require("./routes/noteRoutes.js");

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json())
app.use(morgan("dev"));

app.use("/api", noteRoutes);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => console.error("MongoDB connection error:", err));
