import {
    CardGroupTwo,
    Header,
    NewFilter,
    NewTable,
    Pagination,
    Sidebar,
    Table,
} from '@sachethpraveen/components'
import React, { useCallback, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useGetBinsQuery } from '../features/api/apiBinsSlice'
import { nanoid } from '@reduxjs/toolkit'
import { useRouter } from 'next/router'
import { useAppDispatch } from '../app/hooks'

const Cards = () => {
    const { data, isSuccess, isLoading } = useGetBinsQuery()
    const router = useRouter()
    const dispatch = useAppDispatch()

    const onClick = useCallback(() => {
        localStorage.clear()
        router.push('/')
    }, [])

    useEffect(() => {
        if (localStorage.getItem('isLoggedIn') === 'loggedOut') {
            router.replace('/')
        }
    }, [])

    return (
        <>
            {isSuccess ? (
                <div className="ms-3 me-3 w-100">
                    <div className="fw-semibold fs-3">Cards</div>
                    <div>
                        <CardGroupTwo />
                    </div>

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
                </div>
            ) : (
                <div className="d-flex justify-content-center w-100">
                    <div className="spinner-border"></div>
                </div>
            )}
        </>
    )
}

export default Cards
