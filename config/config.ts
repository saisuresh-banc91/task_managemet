// const bcrypt = require("bcrypt");
import bcrypt from "bcryptjs";

const users = [
  {
    email: "test123@gmail.com",
    phone: "1234567890",
    password: bcrypt.hashSync("12345678", 10),
  },
  {
    email: "test12@gmail.com",
    phone: "9876543210",
    password: bcrypt.hashSync("1234567", 10),
  },
  {
    email: "test13@gmail.com",
    phone: "9856308263",
    password: bcrypt.hashSync("2345678", 10),
  },
  {
    email: "test23@gmail.com",
    phone: "8763496287",
    password: bcrypt.hashSync("1234578", 10),
  },
  {
    email: "test1@gmail.com",
    phone: "8763496223",
    password: bcrypt.hashSync("1345678", 10),
  },
];

export default users;
