import React, { useState } from "react";
import Link from "next/link";
import {server_url} from "./_Env"
// layout for page

import Auth from "layouts/Auth.js";
import axios from "axios"
import { useRouter } from 'next/router'
import { toast, ToastContainer } from 'react-nextjs-toast'

export default function Register() {
  const router = useRouter()

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const handleRegister = () => {
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 
    const emailstate = email.match(pattern)
    if (!firstname) {
      toast.notify('Input the firstname', {
          duration: 5,
          type: "error"
        })
      return
    }

    if (!lastname) {
      toast.notify('Input the lastname', {
          duration: 5,
          type: "error"
        })
      return
    }

    if (!email) {
      toast.notify('Input the email', {
          duration: 5,
          type: "error"
        })
      return
    }

    if (emailstate === null) {
      toast.notify('Email is incorrect', {
          duration: 5,
          type: "error"
        })
      return
    }
    
    if (!password) {
      toast.notify('Input the password', {
          duration: 5,
          type: "error"
        })
      return
    }

    if (password.length < 8) {
      toast.notify('Length must be 8 more', {
          duration: 5,
          type: "error"
        })
      return
    }

    const data = {
      firstname,
      lastname,
      email,
      password
    }

    axios.post(`${server_url}/users`, data)
    .then((response) => {
      toast.notify('Registery Success!', {
        duration: 5,
        type: "success"
      })
      router.push('/login')
    }).catch((e) => {
      toast.notify('Network Error', {
        duration: 5,
        type: "error"
      })
    })
  }
  return (
    <>
      
      <div className="container mx-auto px-4 h-full">
        
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-9/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <ToastContainer align={"right"} />
              <div className="flex">
                <div className="relative w-1/2 mb-3 mr-3">
                  <img alt="..." src="/img/left.svg" />
                </div>
                <div className="relative w-1/2 mb-3 mr-3">
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0 mt-16">
                    <div className="text-blueGray-400 text-center mb-3 font-bold">
                      <h1 className="mt-4 text-3xl text-black">Create Account</h1>
                    </div>
                    <div>
                      <div className="flex">
                        <div className="relative w-1/2 mb-3 mr-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Firstname
                          </label>
                          <input
                            value={firstname}
                            type="text"
                            name='firstname'
                            id='firstname'
                            onChange={e => setFirstname(e.target.value)}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="First Name"
                          />
                        </div>

                        <div className="relative w-1/2 mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Lastname
                          </label>
                          <input
                            type="text"
                            value={lastname}
                            name='lastname'
                            id='lastname'
                            onChange={e => setLastname(e.target.value)}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Last Name"
                          />
                        </div>
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          value={email}
                          name='email'
                          id='email'
                          onChange={e => setEmail(e.target.value)}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="JohnSmith@email.com"
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          value={password}
                          name='password'
                          id='password'
                          onChange={e => setPassword(e.target.value)}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Password(Min 8 Characters)"
                        />
                      </div>

                      <div className="text-center mt-6">
                      
                        <button
                          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="button"
                          onClick={handleRegister}
                        >
                          Sign Up
                        </button>
                      </div>

                      <hr className="mt-6 border-b-1 border-blueGray-300" />

                      <div className="rounded-t mb-0 px-6 py-6">
                        <div className="btn-wrapper text-center mt-1 ">
                          <button
                            className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                            type="button"
                          >
                            <img alt="..." className="w-5 mr-1" src="/img/google.svg" />
                          </button>
                          <button
                            className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                            type="button"
                          >
                            <img alt="..." className="w-5" src="/img/apple.svg" />
                          </button>
                          <button
                            className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                            type="button"
                          >
                            <img alt="..." className="w-5 mr-1" src="/img/facebook.jpg" />
                          </button>
                        </div>
                        <div className="text-center mb-3 mt-3">
                          <h6 className="text-blueGray-500 text-sm font-bold">
                            Already got an account? <Link href="/login"><a>Login Now</a></Link>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Register.layout = Auth;
