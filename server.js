const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
bodyParser = require("body-parser");
// const ejwt = require("express-jwt");
require("dotenv/config");
// const path = require("path");
const userRouter = require("./routes/User");
const uploadRouter = require("./routes/Upload");
const receiptRouter = require("./routes/Receipt");
const guiderRouter = require("./routes/Guider");
const pherRouter = require("./routes/Pher");
const gherRouter = require("./routes/Gher");
const committerRouter = require("./routes/Committer");

const port = process.env.PORT || 4000;

mongoose.connect(process.env.MONGODB_URI || process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
try {
  const connection = mongoose.connection;
  connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
  });
} catch (error) {
  console.log("errrorrrr");
}
// const corsOptions = {
//   origin: true,
//   credentials: true,
//   maxAge: 3600,
// };
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use("/users", userRouter);
app.use("/uploads", uploadRouter);
app.use("/receipts", receiptRouter);
app.use("/phers", pherRouter);
app.use("/ghers", gherRouter);
app.use("/guiders", guiderRouter);
app.use("/committers", committerRouter);
// app.use('/public', express.static('public'));

// app.use('/pop', popRouter)

// if ((process.env.NODE_ENV || "").trim() === "production") {
//   app.use(express.static("client/build"));
//   app.get("/", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
