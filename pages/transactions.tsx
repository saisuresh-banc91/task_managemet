import React, { useCallback, useEffect, useState } from 'react'
import {
    Header,
    Sidebar,
    Table,
    Pagination,
    CardGroupTwo,
} from '@sachethpraveen/components'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
    useGetProductsQuery,
    useAddProductMutation,
} from '../features/api/apiSlice'
import { nanoid } from '@reduxjs/toolkit'
import {
    fetchProducts,
    selectProducts,
} from '../features/products/productsSlice'
import { skipToken } from '@reduxjs/toolkit/dist/query'

const transactions = () => {
    //   const dispatch = useAppDispatch();
    //   const { products, status, error } = useAppSelector(selectProducts);
    const { data, isError, isSuccess } = useGetProductsQuery()
    const [addNewProduct] = useAddProductMutation()
    const [products, setProducts] = React.useState([{}])
    const [addProduct, setAddProduct] = React.useState('')

    const filterPress = useCallback((event: any) => {
        // if (isSuccess) {
        //     setProducts(
        //         data.products.filter((product) => {
        //             return product[
        //                 event.currentTarget.id as keyof typeof product
        //             ]
        //                 .toString()
        //                 .includes(event.currentTarget.value)
        //         })
        //     )
        // }
    }, [])

    useEffect(() => {
        if (isSuccess) {
            setProducts(data.products)
        }
    })

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

                    {data ? (
                        <Pagination length={data.products.length} />
                    ) : (
                        <Pagination />
                    )}
                    <div>
                        {isSuccess ? (
                            <div>
                                <div>{products.length}</div>
                                <Table
                                    data={data.products.map((product) => {
                                        return Object.fromEntries(
                                            Object.entries(product).slice(0, 8)
                                        )
                                    })}
                                    filterPress={filterPress}
                                    generateKey={nanoid}
                                />
                            </div>
                        ) : isError ? (
                            <div className="fs-2 d-flex justify-content-center">
                                An Error Occurred
                            </div>
                        ) : (
                            <div className="d-flex justify-content-center">
                                <div className="spinner-border"></div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default transactions
