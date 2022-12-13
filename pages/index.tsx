import { Footer, InputBox } from '@sachethpraveen/components'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useCallback, useRef, useState } from 'react'
import users from '../config/config'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import Link from 'next/link'

const salt = bcrypt.genSaltSync(10)

export default function Home() {
    const [userId, setUser] = useState(0)
    const [password, setPass] = useState('')
    const [field, setField] = useState('')
    const [isUser, setIsUser] = useState(false)
    const [error, setError] = useState(false)
    const [notFound, setNotFound] = useState(false)
    const [invalid, setInvalid] = useState(false)
    let id = useRef(0).current

    const onClick = useCallback(() => {
        setUser(0)
        setIsUser(false)
    }, [])

    const onChange = useCallback((event: any) => {
        setField(event.currentTarget.value)
    }, [])

    const keyPress = useCallback((event: any) => {
        if (event.key === 'Enter') {
            if (event.currentTarget.id === 'username') {
                const userEntered = event.currentTarget.value
                if (
                    validator.isEmail(userEntered) ||
                    validator.isMobilePhone(userEntered) ||
                    userEntered.length >= 8
                ) {
                    const userFiltered = users.filter((user) => {
                        return (
                            user.email === userEntered ||
                            user.phone === userEntered
                        )
                    })
                    if (userFiltered.length === 1) {
                        setUser(userFiltered[0].id)
                        id = userFiltered[0].id
                        setIsUser(true)
                        setError(false)
                        setNotFound(false)
                    } else {
                        setNotFound(true)
                        setError(false)
                    }
                } else {
                    setError(true)
                    setNotFound(false)
                }
            } else {
                const passwordEntered = event.currentTarget.value
                if (passwordEntered.length < 8) {
                    setError(true)
                    setInvalid(false)
                    setPass('')
                } else {
                    setError(false)
                    if (
                        users.filter((user) => {
                            return (
                                bcrypt.compareSync(
                                    passwordEntered,
                                    user.password
                                ) && user.id === id
                            )
                        }).length === 1
                    ) {
                        setPass(passwordEntered)
                        setInvalid(false)
                    } else {
                        setPass('')
                        setInvalid(true)
                    }
                }
            }
        }
    }, [])

    return (
        <>
            <div className="container d-flex min-vw-100 m-0 p-0">
                <div className="loginBackground"></div>
                <div className="loginInput d-flex flex-column">
                    <div className="loginComponents d-flex flex-column justify-content-center align-items-center flex-grow-1">
                        <div className="fs-3 w-50">CARD91</div>
                        <div className="fs-4 fw-bold mt-3 w-50">Login</div>
                        <div className="w-50">
                            <InputBox
                                keyPress={keyPress}
                                onChange={onChange}
                                isUser={isUser}
                                error={error}
                                invalid={invalid}
                                notFound={notFound}
                                onClick={onClick}
                            />
                            {userId != 0 && (
                                <Link href={`/overview/${userId}`}>
                                    <button
                                        className={
                                            userId && password
                                                ? 'btn btn-dark'
                                                : 'btn btn-dark disabled'
                                        }
                                    >
                                        Login
                                    </button>
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="d-flex flex-column justify-content-end flex-grow-1 mb-2">
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    )
}
