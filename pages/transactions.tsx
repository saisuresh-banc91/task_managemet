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
} from '../features/api/apiSlice'
import { nanoid } from '@reduxjs/toolkit'
import { replace, selectProducts } from '../features/products/productsSlice'
import { useSelector } from 'react-redux'

const transactions = () => {
    const dispatch = useAppDispatch()
    // const [products, setProducts] = useState<
    //     | {
    //           brand: string
    //           description: string
    //           discountPercentage: number
    //           id: number
    //           price: number
    //           rating: number
    //           stock: number
    //           title: string
    //       }[]
    //     | undefined
    // >()
    const products = useSelector(selectProducts)
    const { data, isError, isSuccess } = useGetProductsQuery()
    // console.log(useSelector(selectProducts))
    // let filteredProducts:
    //     | {
    //           brand: string
    //           description: string
    //           discountPercentage: number
    //           id: number
    //           price: number
    //           rating: number
    //           stock: number
    //           title: string
    //       }[]
    //     | undefined = data?.products

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
        if (isSuccess) {
            dispatch(replace(data.products))
        }
    }, [isSuccess])

    return (
        <div className="transactions">
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

                    {/* {products ? (
                        <Pagination length={products?.length} />
                    ) : (
                        <Pagination />
                    )} */}

                    {products.products.length ? (
                        <NewTable
                            receivedData={products.products.map((product) => {
                                return Object.fromEntries(
                                    Object.entries(product).slice(0, 8)
                                )
                            })}
                            receivedColumns={columns}
                            // generateKey={nanoid}
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
                    {/* </div> */}
                </div>
            </div>
        </div>
    )
}
// }

export default transactions
