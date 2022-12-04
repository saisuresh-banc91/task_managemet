import {
  CardGroup,
  Footer,
  InputBox,
  Sidebar,
} from "@sachethpraveen/components";
import Head from "next/head";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  return (
    <>
      <div className="container d-flex min-vw-100 m-0 p-0">
        <div className="loginBackground"></div>
        <div className="loginInput d-flex flex-column">
          <div className="loginComponents d-flex flex-column justify-content-center align-items-center flex-grow-1">
            <div className="fs-3 w-50">CARD91</div>
            <div className="fs-4 fw-bold mt-3 w-50">Login</div>
            <div className="w-50">
              <InputBox />
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
