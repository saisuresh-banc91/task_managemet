import React, { useEffect } from "react";
import {
  Header,
  Sidebar,
  Table,
  Pagination,
  CardGroupTwo,
} from "@sachethpraveen/components";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import "bootstrap/dist/css/bootstrap.min.css";
import { useGetProductsQuery } from "../features/api/apiSlice";

import {
  fetchProducts,
  selectProducts,
} from "../features/products/productsSlice";

const transactions = () => {
  const dispatch = useAppDispatch();
  const { products, status, error } = useAppSelector(selectProducts);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  });

  return (
    <div>
      <Header />
      <div className="d-flex">
        <div>
          <Sidebar />
        </div>

        {products.length > 0 && (
          <div className="me-4 ms-4">
            <div className="fw-semibold fs-3">Transactions</div>
            <div>
              <CardGroupTwo />
            </div>
            <Pagination length={products.length} />
            <div className="overflow-scroll">
              <Table data={products} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default transactions;
