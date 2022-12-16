import { Footer, InputBox } from '@sachethpraveen/components'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useCallback, useEffect, useRef, useState } from 'react'
import users from '../config/config'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { replaceId, selectUser } from '../features/user/userSlice'
import { useRouter } from 'next/router'

const salt = bcrypt.genSaltSync(10)

const Home = () => {
    const [userId, setUser] = useState<number>()
    const [entered, setEntered] = useState(false)
    const [field, setField] = useState('')
    const [isUser, setIsUser] = useState(false)
    const [userError, setUserError] = useState(false)
    const [passError, setPassError] = useState(false)
    const [notFound, setNotFound] = useState(false)
    const [invalid, setInvalid] = useState(false)
    const router = useRouter()

    const onChange = useCallback(
        (event: any) => {
            if (event.currentTarget.id !== 'username') {
                if (event.currentTarget.value.length < 8) {
                    setInvalid(false)
                    setEntered(false)
                } else {
                    setField(event.currentTarget.value)
                    setPassError(false)
                    setEntered(true)
                }
            }
        },
        [userId]
    )

    const keyPress = useCallback(
        (event: any) => {
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
                            // replaceId(userFiltered[0].id)
                            setIsUser(true)
                            setUserError(false)
                            setNotFound(false)
                        } else {
                            setNotFound(true)
                            setUserError(false)
                            setIsUser(false)
                        }
                    } else {
                        setUserError(true)
                        setNotFound(false)
                        setIsUser(false)
                    }
                } else {
                    if (event.currentTarget.value.length < 8) {
                        setPassError(true)
                    }
                }
            }
        },
        [userId]
    )

    const onClick = useCallback(
        (event: any) => {
            if (
                users.filter((user) => {
                    console.log(user)
                    return (
                        bcrypt.compareSync(field, user.password) &&
                        user.id === userId
                    )
                }).length === 1
            ) {
                setInvalid(false)
                localStorage.setItem('userId', userId ? userId.toString() : '')
                localStorage.setItem('isLoggedIn', 'loggedIn')
                router.push('/overview')
            } else {
                setInvalid(true)
            }
        },
        [field]
    )

    useEffect(() => {
        if (localStorage.getItem('isLoggedIn') === 'loggedIn') {
            router.replace('/overview')
        } else {
            localStorage.setItem('isLoggedIn', 'loggedOut')
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
                                userError={userError}
                                passError={passError}
                                invalid={invalid}
                                notFound={notFound}
                            />
                            {entered && (
                                <button
                                    className="login btn btn-dark"
                                    onClick={onClick}
                                >
                                    Login
                                </button>
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

export default Home
