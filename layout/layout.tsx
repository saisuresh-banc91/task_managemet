import { Header, Sidebar } from '@sachethpraveen/components'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../app/hooks'
import { login, logout, selectLog } from '../features/log/logSlice'

const Layout = ({ children }: any) => {
    const dispatch = useAppDispatch()
    const log = useSelector(selectLog)
    const router = useRouter()

    const onClick = useCallback(() => {
        localStorage.clear()
        dispatch(logout())
        router.replace('/')
    }, [])

    const sideClick = useCallback(
        (event: { currentTarget: { id: string } }) => {
            router.replace(`/${event.currentTarget.id}`)
        },
        []
    )

    useEffect(() => {
        if (localStorage.getItem('isLoggedIn') !== 'loggedIn') {
            localStorage.setItem('isLoggedIn', 'loggedOut')
            dispatch(logout())
        } else {
            dispatch(login())
        }
    }, [])

    return (
        <>
            {log.isLoggedIn ? (
                <div>
                    <div className="header">
                        <Header onClick={onClick} />
                    </div>
                    <div className="d-flex">
                        <div>
                            <Sidebar sideClick={sideClick} />
                        </div>
                        {children}
                    </div>
                </div>
            ) : (
                <div>{children}</div>
            )}
        </>
    )
}

export default Layout
