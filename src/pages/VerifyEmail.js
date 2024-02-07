import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendOTP,signUp } from '../services/operations/authAPI';
import { BiArrowBack } from "react-icons/bi"
import { Link } from 'react-router-dom';
import OtpInput from "react-otp-input";
const VerifyEmail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const[otp,setOTP] = useState("");
    const {signupData,loading} = useSelector((state)=>state.auth);


    useEffect(()=>
    {
        if(!signupData)
        {
            navigate("/signup");
        }
    },[]);

    const handleOnSubmit = (e)=>
    {
        e.preventDefault();
        const {accountType,firstName,lastName,password,confirmPassword,email} = signupData;
       
        dispatch(signUp(accountType,firstName,lastName,email,password,confirmPassword,otp,navigate));
    }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
    {
        loading?
        (
            <div className='spinner'>Loading...</div>
        ):
        (
            <div className="max-w-[500px] p-4 lg:p-8">
                <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">Verify Email</h1>
                <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">A Verification ode has been sent to You.Enter the Code Below.</p>
                <form onSubmit={handleOnSubmit}>
                    <OtpInput
                    value={otp}
                    onChange={setOTP}
                    numInputs={6}
                    renderInput={(props) => (
                    <input
                    {...props}
                    placeholder="-"
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                    />
                    )}
                    containerStyle={{
                        justifyContent: "space-between",
                        gap: "0 6px",
                    }}
                    ></OtpInput>
                    <button
                    type="submit"
                    className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900">
                    Verify Email
                    </button>
                </form>

                <div>
                    <div className="mt-6 flex items-center justify-between">
                        <Link to="/login">
                        <p className="flex items-center gap-x-2 text-richblack-5">
                            <BiArrowBack /> Back To Login
                        </p>
                        </Link>
                    </div>
                    
                    <button
                    className="flex items-center text-blue-100 gap-x-2"
                    onClick={()=>dispatch(sendOTP(signupData.email,navigate))}>
                        Resend It
                    </button>
                </div>
            </div>
        )
    }
    </div>
  )
}

export default VerifyEmail;