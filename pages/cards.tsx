import {
    CardGroupTwo,
    Header,
    NewFilter,
    NewTable,
    Pagination,
    Sidebar,
    Table,
} from '@sachethpraveen/components'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useGetBinsQuery } from '../features/api/apiBinsSlice'
import { nanoid } from '@reduxjs/toolkit'

const cards = () => {
    const { data, isSuccess } = useGetBinsQuery()

    return (
        <div>
            <div className="header">
                <Header />
            </div>
            <div className="d-flex">
                <div>
                    <Sidebar />
                </div>
                <div className="ms-3 me-3 w-100">
                    <div className="fw-semibold fs-3">Cards</div>
                    <div>
                        <CardGroupTwo />
                    </div>
                    {isSuccess ? (
                        <NewTable
                            receivedData={data.map((product: Object) => {
                                return Object.fromEntries(
                                    Object.entries(product).slice(0, 5)
                                )
                            })}
                            receivedColumns={Object.keys(data[0])
                                .slice(0, 5)
                                .map((key) => {
                                    return {
                                        Header: key.toUpperCase(),
                                        accessor: key,
                                        Filter: NewFilter,
                                    }
                                })}
                        />
                    ) : (
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border"></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default cards
