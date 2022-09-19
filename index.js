const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose")
const register = require("./routes/register")
const login = require("./routes/login")
const profile = require("./routes/profile")
const card = require("./routes/card")
// const cors = require("cors")
const app = express()
const PORT = process.env.PORT || 8000;

app.use(express.json());

mongoose
.connect(process.env.dbString, {useNewUrlParser: true})
.then(() => console.log("MongoDB connected successfully"))
.catch((err) => console.log(err));

app.use("/api/register", register)
app.use("/api/login", login)
app.use("/api/profile", profile)
app.use("/api/card", card)
// app.use(cors())

app.listen(PORT, () => console.log("Server started on port", PORT));