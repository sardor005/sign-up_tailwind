import React, { useState } from "react";

import Link from "next/link";
import axios from "axios"
import { useRouter } from 'next/router'
import { toast, ToastContainer } from 'react-nextjs-toast'
// layout for page

import Auth from "layouts/Auth.js";
import {server_url} from "./_Env"

export default function Login() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 
    const emailstate = email.match(pattern)

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
      email,
      password
    }
    axios.post(`${server_url}/users/authenticate`, data)
    .then((response) => {
      toast.notify('Login Success!', {
        duration: 5,
        type: "success"
      })
      router.push('/landing')
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
              <div className="flex">
                <div className="relative w-1/2 mb-3 mr-3">
                  <img alt="..." src="/img/left.svg" />
                </div>
                <div className="relative w-1/2 mb-3 mr-3">
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0 mt-16">
                    <ToastContainer align={"right"} />
                    <div className="text-blueGray-400 text-center mb-3 font-bold">
                      <h1 className="mt-6 text-3xl text-black">Login Account</h1>
                    </div>
                      <div>
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
                          placeholder="Password"
                        />
                      </div>
                      
                      <div className="text-center mt-6">
                        <button
                          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="button"
                          onClick={handleLogin}
                        >
                          Sign In
                        </button>
                      </div>
                    </div>
                    <hr className="border-b-1 mt-6 border-blueGray-300" />

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
                          <Link href="/register"><a>Create a new account</a></Link>
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
    </>
  );
}

Login.layout = Auth;
