// const bcrypt = require("bcrypt");
import bcrypt from "bcryptjs";

const users = [
  {
    id: 1,
    email: "test123@gmail.com",
    phone: "1234567890",
    password: bcrypt.hashSync("12345678", 10),
  },
  {
    id: 2,
    email: "test12@gmail.com",
    phone: "9876543210",
    password: bcrypt.hashSync("1234567890", 10),
  },
  {
    id: 3,
    email: "test13@gmail.com",
    phone: "9856308263",
    password: bcrypt.hashSync("23456789", 10),
  },
  {
    id: 4,
    email: "test23@gmail.com",
    phone: "8763496287",
    password: bcrypt.hashSync("12345780", 10),
  },
  {
    id: 5,
    email: "test1@gmail.com",
    phone: "8763496223",
    password: bcrypt.hashSync("13456781", 10),
  },
];

export default users;
