const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");

const Admin = require("./models/Admin");

const adminRoutes = require("./routes/adminRoutes");
const videoRoutes = require("./routes/videoRoutes");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// ======================================
// MIDDLEWARE
// ======================================

app.use(
cors({
origin: [
"http://localhost:5173",
"http://localhost:5174",
],
})
);

app.use(express.json());

app.use(
express.urlencoded({
extended: true,
})
);

// ======================================
// CREATE UPLOAD FOLDERS
// ======================================

const videoFolder = path.join(
__dirname,
"uploads",
"videos"
);

const thumbnailFolder = path.join(
__dirname,
"uploads",
"thumbnails"
);

if (!fs.existsSync(videoFolder)) {
fs.mkdirSync(videoFolder, {
recursive: true,
});
}

if (!fs.existsSync(thumbnailFolder)) {
fs.mkdirSync(thumbnailFolder, {
recursive: true,
});
}

// ======================================
// STATIC UPLOADS
// ======================================

app.use(
"/uploads",
express.static(
path.join(__dirname, "uploads")
)
);

// ======================================
// TEST ROUTE
// ======================================

app.get("/", (req, res) => {
res.json({
message:
"Video website backend is running",
});
});

// ======================================
// ROUTES
// ======================================

app.use(
"/api/admin",
adminRoutes
);

app.use(
"/api/videos",
videoRoutes
);

// ======================================
// ERROR HANDLER
// ======================================

app.use(
(error, req, res, next) => {
console.error(
"Server error:",
error
);


if (error.message) {
  return res.status(400).json({
    message: error.message,
  });
}

res.status(500).json({
  message: "Something went wrong",
});


}
);

// ======================================
// CREATE DEFAULT ADMIN
// ======================================

const createDefaultAdmin = async () => {
try {
const email =
process.env.ADMIN_EMAIL;


const password =
  process.env.ADMIN_PASSWORD;

if (!email || !password) {
  console.log(
    "Admin credentials missing in .env"
  );

  return;
}

const existingAdmin =
  await Admin.findOne({
    email: email.toLowerCase(),
  });

if (existingAdmin) {
  console.log(
    "Admin already exists"
  );

  return;
}

const hashedPassword =
  await bcrypt.hash(
    password,
    10
  );

await Admin.create({
  email: email.toLowerCase(),
  password: hashedPassword,
});

console.log(
  "Default admin created successfully"
);


} catch (error) {
console.error(
"Admin creation error:",
error.message
);
}
};

// ======================================
// MONGODB CONNECTION
// ======================================

mongoose
.connect(process.env.MONGO_URI)

.then(async () => {
console.log(
"MongoDB connected successfully"
);


await createDefaultAdmin();

app.listen(
  PORT,
  () => {
    console.log(
      `Server running on http://localhost:${PORT}`
    );
  }
);


})

.catch((error) => {
console.error(
"MongoDB connection failed:",
error.message
);
});
