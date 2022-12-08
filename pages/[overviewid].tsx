import { CardGroup, Header, Sidebar } from "@sachethpraveen/components";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import { BsPerson } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchUserById, selectUser } from "../features/user/userSlice";
import { useRouter } from "next/router";
import { nanoid } from "@reduxjs/toolkit";
import { useGetUserByIdQuery } from "../features/api/apiSlice";

const overview: React.FC = () => {
  const router = useRouter();
  const userid = router.query.overviewid;

  const dispatch = useAppDispatch();
  const { user, status, error } = useAppSelector(selectUser);
  const { data, isError, isSuccess, isLoading } = useGetUserByIdQuery(
    userid!.toString()
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUserById(userid!.toString()));
    }
  });
  return (
    <>
      <div className="d-flex flex-column vh-100">
        <div className="header">
          <Header />
        </div>

        <div className="d-flex content">
          <Sidebar />
          {data && (
            <div className="businessContainer">
              <div className="d-flex m-3">
                <div className="fs-1">
                  <BsPerson />
                </div>
                <div className="ms-3 d-flex flex-column">
                  <p>{data.email}</p>
                  <p>{data.phone}</p>
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
                  <div className="fw-semibold">Username</div>
                  <div>{data.username}</div>
                </div>
                <div className="m-3">
                  <div className="fw-semibold">Company</div>
                  <div>{data.company.name}</div>
                </div>
                <div className="m-3">
                  <div className="fw-semibold">Website</div>
                  <div>{data.domain}</div>
                </div>
                <div className="m-3">
                  <div className="fw-semibold">Registered Address</div>
                  <div>{data.address.address}</div>
                </div>
              </div>
            </div>
          )}
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
