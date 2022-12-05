import { CardGroup, Header, Sidebar } from "@sachethpraveen/components";
import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import React from "react";
import { BsPerson } from "react-icons/bs";

<Head>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
  />
</Head>;

const overview = () => {
  return (
    <>
      <div className="d-flex flex-column vh-100">
        <div className="header">
          <Header />
        </div>

        <div className="d-flex content">
          <Sidebar />
          <div className="businessContainer">
            <div className="d-flex m-3">
              <div className="fs-1">
                <BsPerson />
              </div>
              <div className="ms-3 d-flex flex-column">
                <p>User Email</p>
                <p>User Number</p>
              </div>
            </div>
            <hr className="m-3" />
            <div>
              <div className="fs-6 fw-semibold ms-3">Business Info</div>
              <div className="m-3">
                <div>CARD91</div>
                <div>ISSUER_P</div>
              </div>
              <div className="m-3">
                <div className="fw-semibold">GST Number</div>
                <div>1234556677</div>
              </div>
              <div className="m-3">
                <div className="fw-semibold">TAN Number</div>
                <div>1234455677</div>
              </div>
              <div className="m-3">
                <div className="fw-semibold">PAN Number</div>
                <div>1234556678</div>
              </div>
              <div className="m-3">
                <div className="fw-semibold">Registered Address</div>
                <div>safi aw pfiawp fnap nfanwfj la asf naowj n</div>
              </div>
            </div>
          </div>
          <div className="overviewContainer">
            <div className="fs-4 fw-semibold mt-3 ms-3">Overview</div>
            <div>
              <CardGroup />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default overview;
