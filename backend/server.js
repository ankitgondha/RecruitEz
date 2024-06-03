// import express from "express";
// import dotenv from "dotenv";
// import morgan from "morgan";
// // import connectDB from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js";
// import cors from "cors";

// //configure env
// dotenv.config();
// connectDB();

// //rest object
// const app = express();

// //middlewares
// app.use(express.json());
// app.use(morgan("dev"));
// app.use(cors({ origin: "http://localhost:5173/", credentials: true }));

// //routes
// app.use("/api/v1/auth", authRoutes);

// app.get("/", (req, res) => {
//   res.send({
//     message: "App is running",
//   });
// });

// //PORT
// const PORT = process.env.PORT || 8080;

// app.listen(PORT, () => {
//   console.log(
//     `Server Running on mode ${process.env.DEV_MODE} ${PORT}`.bgCyan.white
//   );
// });
