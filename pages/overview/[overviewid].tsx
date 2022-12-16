import { CardGroup, Header, Sidebar } from '@sachethpraveen/components'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect } from 'react'
import { BsPerson } from 'react-icons/bs'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { replace, selectUser } from '../../features/user/userSlice'
import { useRouter } from 'next/router'
import { useLazyGetUserByIdQuery } from '../../features/api/apiProductsSlice'

const overview: React.FC = () => {
    const router = useRouter()
    const userid = router.query.overviewid
    const dispatch = useAppDispatch()
    const { user } = useAppSelector(selectUser)
    const [trigger, { data, isError, isSuccess }, lastPromiseInfo] =
        useLazyGetUserByIdQuery()

    useEffect(() => {
        if (userid) {
            localStorage.setItem('userId', userid!.toString())
        }

        trigger(localStorage.getItem('userId')!, true)
    }, [])

    useEffect(() => {
        if (isSuccess) {
            dispatch(replace(data))
        }
    }, [isSuccess])

    return (
        <>
            <div className="d-flex flex-column vh-100">
                <div className="header">
                    <Header />
                </div>

                <div className="d-flex content">
                    <div>
                        <Sidebar />
                    </div>
                    {isSuccess ? (
                        <div className="d-flex w-100">
                            <div className="businessContainer">
                                <div className="d-flex m-3">
                                    <div className="fs-1">
                                        <BsPerson />
                                    </div>
                                    <div className="ms-3 d-flex flex-column">
                                        <p>{user.email}</p>
                                        <p>{user.phone}</p>
                                    </div>
                                </div>
                                <hr className="m-3" />
                                <div>
                                    <div className="fs-6 fw-semibold ms-3">
                                        Business Info
                                    </div>
                                    <div className="m-3">
                                        <div>CARD91</div>
                                        <div>ISSUER_P</div>
                                    </div>
                                    <div className="m-3">
                                        <div className="fw-semibold">
                                            Username
                                        </div>
                                        <div>{user.username}</div>
                                    </div>
                                    <div className="m-3">
                                        <div className="fw-semibold">
                                            Company
                                        </div>
                                        <div>{user.company.name}</div>
                                    </div>
                                    <div className="m-3">
                                        <div className="fw-semibold">
                                            Website
                                        </div>
                                        <div>{user.domain}</div>
                                    </div>
                                    <div className="m-3">
                                        <div className="fw-semibold">
                                            Registered Address
                                        </div>
                                        <div>{user.address.address}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="overviewContainer">
                                <div className="fs-4 fw-semibold mt-3 ms-3">
                                    Overview
                                </div>
                                <div>
                                    <CardGroup />
                                </div>
                            </div>
                        </div>
                    ) : isError ? (
                        <div className="d-flex justify-content-center w-100">
                            <div className="fs-2">An Error Occurred</div>
                        </div>
                    ) : (
                        <div className="d-flex justify-content-center w-100">
                            <div className="spinner-border"></div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default overview
