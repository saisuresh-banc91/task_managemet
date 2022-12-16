import React, { useCallback, useEffect, useState } from 'react'
import {
    Header,
    Sidebar,
    Table,
    Pagination,
    CardGroupTwo,
    NewTable,
    NewFilter,
} from '@sachethpraveen/components'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
    useGetProductsQuery,
    useAddProductMutation,
} from '../features/api/apiProductsSlice'
import { nanoid } from '@reduxjs/toolkit'
import { replace, selectProducts } from '../features/products/productsSlice'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'

const Transactions = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const products = useSelector(selectProducts)
    const { data, isError, isSuccess } = useGetProductsQuery()

    const columns = [
        { Header: 'ID', accessor: 'id', Filter: NewFilter },
        { Header: 'Title', accessor: 'title', Filter: NewFilter },
        { Header: 'Description', accessor: 'description', Filter: NewFilter },
        { Header: 'Price', accessor: 'price', Filter: NewFilter },
        {
            Header: 'Discount%',
            accessor: 'discountPercentage',
            Filter: NewFilter,
        },
        { Header: 'Rating', accessor: 'rating', Filter: NewFilter },
        { Header: 'Stock', accessor: 'stock', Filter: NewFilter },
        { Header: 'Brand', accessor: 'brand', Filter: NewFilter },
    ]

    useEffect(() => {
        if (localStorage.getItem('isLoggedIn') === 'loggedIn') {
            if (isSuccess) {
                dispatch(replace(data.products))
            }
        } else {
            console.log(router)
            router.replace('/')
        }
    }, [isSuccess])

    const onClick = useCallback(() => {
        localStorage.clear()
        router.push('/')
    }, [])

    return (
        <div className="me-4 ms-4 w-100">
            <div className="fw-semibold fs-3">Transactions</div>
            <div>
                <CardGroupTwo />
            </div>

            {products.products.length ? (
                <NewTable
                    receivedData={products.products.map((product) => {
                        return Object.fromEntries(
                            Object.entries(product).slice(0, 8)
                        )
                    })}
                    receivedColumns={columns}
                />
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
    )
}

export default Transactions
