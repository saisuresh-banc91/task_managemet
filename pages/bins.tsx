import { Header, Pagination, Sidebar, Table } from "@sachethpraveen/components";
import React from "react";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import bootstrap from "bootstrap";
import { useGetBinsQuery } from "../features/api/binsSlice";

export default function () {
  const { data, isError, isLoading, isSuccess } = useGetBinsQuery();

  return (
    <>
      {/* <Head></Head> */}
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
            {data ? (
              <Table
                data={data.map(
                  (product: { rating: { rate: number; count: number } }) => {
                    return Object.fromEntries(
                      Object.entries(product).slice(0, 5)
                    );
                  }
                )}
              />
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
}
