import React, { useCallback, useEffect, useState } from "react";
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
import { skipToken } from "@reduxjs/toolkit/dist/query";

const transactions = () => {
  const dispatch = useAppDispatch();
  //   const { products, status, error } = useAppSelector(selectProducts);
  const { data, isLoading, isError, isSuccess } = useGetProductsQuery();
  const [products, setProducts] = useState([]);
  console.log(data);

  useEffect(() => {
    if (isSuccess) {
      setProducts(data.products);
    }
  });

  const filterPress = useCallback((event: any) => {
    // console.log(products);
  }, []);

  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <div className="d-flex">
        <div>
          <Sidebar />
        </div>
        <div className="me-4 ms-4 w-100">
          <div className="fw-semibold fs-3">Transactions</div>
          <div>
            <CardGroupTwo />
          </div>
          {data ? <Pagination length={data.products.length} /> : <Pagination />}
          <div>
            {data ? (
              <Table
                data={data.products.map((product) => {
                  return Object.fromEntries(
                    Object.entries(product).slice(0, 8)
                  );
                })}
                filterPress={filterPress}
              />
            ) : (
              <div className="d-flex justify-content-center">
                <div className="spinner-border"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default transactions;
