import {
  CardGroupTwo,
  Header,
  Pagination,
  Sidebar,
  Table,
} from "@sachethpraveen/components";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useGetBinsQuery } from "../features/api/binsSlice";

export default function cards() {
  const { data } = useGetBinsQuery();

  return (
    <div>
      <Header />
      <div className="d-flex">
        <div>
          <Sidebar />
        </div>
        <div className="ms-3 me-3 w-100">
          <div className="fw-semibold fs-3">Cards</div>
          <div>
            <CardGroupTwo />
          </div>
          <Pagination />
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
  );
}
