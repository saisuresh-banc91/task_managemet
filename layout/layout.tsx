import { Header, Sidebar } from '@sachethpraveen/components'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'

const Layout = ({ children }: any) => {
    const router = useRouter()
    const [log, setLog] = useState<boolean>()

    const onClick = useCallback(() => {
        localStorage.clear()
        router.replace('/')
    }, [])

    const sideClick = useCallback(
        (event: { currentTarget: { id: string } }) => {
            router.replace(`/${event.currentTarget.id}`)
        },
        []
    )

    useEffect(() => {
        localStorage.setItem('isLoggedIn', 'loggedOut')
        setLog(false)
    }, [])

    useEffect(() => {
        if (localStorage.getItem('isLoggedIn') === 'loggedIn') {
            setLog(true)
        } else {
            setLog(false)
        }
    }, [localStorage.getItem('isLoggedIn')])

    return (
        <>
            {log ? (
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
