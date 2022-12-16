import {
    Header,
    NewFilter,
    NewTable,
    Pagination,
    Sidebar,
    Table,
} from '@sachethpraveen/components'
import React, { useCallback, useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useGetBinsQuery } from '../features/api/apiBinsSlice'
import { nanoid } from '@reduxjs/toolkit'
import { useForm } from 'react-hook-form'
import { useAppDispatch } from '../app/hooks'
import { useSelector } from 'react-redux'
import { add, replace, selectBins } from '../features/bins/binsSlice'
import { useRouter } from 'next/router'

const Modal: React.FC = () => {
    const { data, isSuccess } = useGetBinsQuery()
    const bins = useSelector(selectBins)
    const [existError, setExist] = useState(false)
    const [success, setSuccess] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm()

    const dispatch = useAppDispatch()

    const checkData = useCallback(
        (details: any) => {
            console.log(details)
            console.log(bins)
            console.log(errors)

            if (
                bins.filter((bin) => {
                    return bin.id == details.id
                }).length > 0
            ) {
                setExist(true)
                setTimeout(() => {
                    setExist(false)
                }, 2000)
            } else {
                setSuccess(true)
                dispatch(add(details))
                setTimeout(() => {
                    setSuccess(false)
                }, 2000)
                reset()
            }
        },
        [bins]
    )

    return (
        <div className="w-100">
            <button
                type="button"
                className="btn btn-dark"
                data-bs-toggle="modal"
                data-bs-target="#addModal"
            >
                Add a new BIN
            </button>
            {/* Modal */}
            {isSuccess && (
                <div
                    className={
                        existError || errors ? 'modal fade show' : 'modal fade'
                    }
                    id="addModal"
                    tabIndex={-1}
                    aria-labelledby="addModalLabel"
                    aria-hidden="true"
                    style={existError || errors ? {} : { display: 'none' }}
                >
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1
                                    className="modal-title fs-5"
                                    id="addModalLabel"
                                >
                                    Add a new BIN
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form
                                    className="d-flex flex-column align-items-center"
                                    onSubmit={handleSubmit(
                                        (details: Object) => {
                                            checkData(details)
                                        }
                                    )}
                                >
                                    <div className="d-flex flex-column align-items-center w-50 p-4">
                                        {Object.keys(data[0])
                                            .slice(0, 5)
                                            .map((head) => {
                                                return (
                                                    <div
                                                        className="d-flex flex-column w-100"
                                                        key={nanoid()}
                                                    >
                                                        <div className="w-100 d-flex justify-content-between mt-2 mb-2 ">
                                                            <label>
                                                                {`${head.toUpperCase()}:`}
                                                            </label>
                                                            {typeof data[0][
                                                                head as keyof typeof data[0]
                                                            ] === 'number' ? (
                                                                <input
                                                                    {...register(
                                                                        `${head}`,
                                                                        {
                                                                            required:
                                                                                true,
                                                                            pattern:
                                                                                /\d+/,
                                                                        }
                                                                    )}
                                                                    className="w-50"
                                                                    id={`${head}`}
                                                                />
                                                            ) : head ===
                                                              'description' ? (
                                                                <textarea
                                                                    {...register(
                                                                        `${head}`,
                                                                        {
                                                                            required:
                                                                                true,
                                                                            pattern:
                                                                                /^[a-zA-Z]+$/,
                                                                        }
                                                                    )}
                                                                    className="h-50 w-50"
                                                                />
                                                            ) : (
                                                                <input
                                                                    {...register(
                                                                        `${head}`,
                                                                        {
                                                                            required:
                                                                                true,
                                                                            pattern:
                                                                                /^[a-zA-Z]+$/,
                                                                        }
                                                                    )}
                                                                    className="w-50"
                                                                />
                                                            )}
                                                        </div>
                                                        {errors[head]?.type ===
                                                            'required' && (
                                                            <p className="text-danger">
                                                                {`${head.toUpperCase()}`}{' '}
                                                                is required
                                                            </p>
                                                        )}
                                                        {errors[head]?.type ===
                                                            'pattern' && (
                                                            <p className="text-danger">
                                                                Please enter
                                                                valid{' '}
                                                                {`${head.toUpperCase()}`}
                                                            </p>
                                                        )}
                                                    </div>
                                                )
                                            })}
                                    </div>
                                    <div className="d-flex w-100 justify-content-end align-items-center mt-3">
                                        <button
                                            type="button"
                                            className="btn btn-secondary me-3"
                                            data-bs-dismiss="modal"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-dark me-3"
                                        >
                                            Add BIN
                                        </button>
                                    </div>
                                    {existError && (
                                        <p className="text-danger">
                                            ID already exists!
                                        </p>
                                    )}
                                    {success && (
                                        <p className="text-success">
                                            BIN added successfully!
                                        </p>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

const Bins: React.FC = () => {
    const { data, isError, isSuccess } = useGetBinsQuery()
    const dispatch = useAppDispatch()
    const router = useRouter()
    const bins = useSelector(selectBins)
    const [records, setRecords] = useState<Object[]>()

    useEffect(() => {
        if (localStorage.getItem('isLoggedIn') === 'loggedIn') {
            if (isSuccess) {
                dispatch(replace(data))
            }
        } else {
            console.log(router)
            router.replace('/')
        }
    }, [isSuccess])

    useEffect(() => {
        setRecords(bins)
    }, [bins])

    const onClick = useCallback(() => {
        localStorage.clear()
        router.push('/')
    }, [])

    return (
        <>
            <div className="me-4 ms-4 w-100">
                <div className="fw-semibold fs-3 mb-5">Bins</div>
                <Modal />
                {records?.length ? (
                    <div>
                        <NewTable
                            receivedData={records}
                            receivedColumns={Object.keys(bins[0])
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
        </>
    )
}

export default Bins
