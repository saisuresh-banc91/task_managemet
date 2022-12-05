import { Footer, InputBox } from "@sachethpraveen/components";
import Head from "next/head";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCallback, useState } from "react";
import users from "../config/config";
import validator from "validator";
import bcrypt from "bcryptjs";
import Link from "next/link";
// const bcrypt = require("bcrypt");

const salt = bcrypt.genSaltSync(10);

export default function Home() {
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  const [field, setField] = useState("");
  const [isUser, setIsUser] = useState(false);
  const [error, setError] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const onChange = useCallback((event: any) => {
    setField(event.currentTarget.value);
  }, []);

  const keyPress = useCallback((event: any) => {
    if (event.key === "Enter") {
      if (event.currentTarget.id === "username") {
        const userEntered = event.currentTarget.value;
        if (
          validator.isEmail(userEntered) ||
          validator.isMobilePhone(userEntered) ||
          userEntered.length >= 8
        ) {
          if (
            users.filter((user) => {
              return user.email === userEntered || user.phone === userEntered;
            }).length === 1
          ) {
            setUser(userEntered);
            setIsUser(true);
            setError(false);
            setNotFound(false);
          } else {
            setNotFound(true);
            setError(false);
          }
        } else {
          setError(true);
          setNotFound(false);
        }
      } else {
        const passwordEntered = event.currentTarget.value;
        if (passwordEntered.length < 8) {
          setError(true);
          setInvalid(false);
          setPass("");
        } else {
          setError(false);
          if (
            users.filter((user) => {
              return bcrypt.compareSync(passwordEntered, user.password);
            }).length === 1
          ) {
            setPass(passwordEntered);
            setInvalid(false);
          } else {
            setPass("");
            setInvalid(true);
          }
        }
      }
    }
  }, []);

  return (
    <>
      <div className="container d-flex min-vw-100 m-0 p-0">
        <div className="loginBackground"></div>
        <div className="loginInput d-flex flex-column">
          <div className="loginComponents d-flex flex-column justify-content-center align-items-center flex-grow-1">
            <div className="fs-3 w-50">CARD91</div>
            <div className="fs-4 fw-bold mt-3 w-50">Login</div>
            <div className="w-50">
              <InputBox
                keyPress={keyPress}
                onChange={onChange}
                isUser={isUser}
                error={error}
                invalid={invalid}
                notFound={notFound}
              />
              {username && (
                <Link href={"/overview"}>
                  <button
                    className={
                      username && password
                        ? "btn btn-dark"
                        : "btn btn-dark disabled"
                    }
                  >
                    Login
                  </button>
                </Link>
              )}
            </div>
          </div>
          <div className="d-flex flex-column justify-content-end flex-grow-1 mb-2">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
