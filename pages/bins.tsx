import { Header, Pagination, Sidebar, Table } from "@sachethpraveen/components";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useGetBinsQuery } from "../features/api/binsSlice";
import { nanoid } from "@reduxjs/toolkit";

const bins: React.FC = () => {
  const { data, isError, isSuccess } = useGetBinsQuery();

  return (
    <>
      <div className="">
        <div className="header ">
          <Header />
        </div>
        <div className="d-flex">
          <div>
            <Sidebar />
          </div>
          <div className="me-4 ms-4 w-100">
            <div className="fw-semibold fs-3 mb-5">Bins</div>
            <Pagination length={data?.length} />
            {isSuccess ? (
              <Table
                data={data.map(
                  (product: { rating: { rate: number; count: number } }) => {
                    return Object.fromEntries(
                      Object.entries(product).slice(0, 5)
                    );
                  }
                )}
                generateKey={nanoid}
              />
            ) : isError ? (
              <div className="d-flex justify-content-center">
                <div className="fs-2">An Error Occurred</div>
              </div>
            ) : (
              <div className="d-flex justify-content-center">
                <div className="spinner-border"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default bins;
