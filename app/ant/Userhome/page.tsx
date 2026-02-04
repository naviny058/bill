"use client"
import { addUser } from "@/app/indexdb";
import Link from "next/link";
import React from "react";
import { useForm, SubmitHandler, Watch } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

type FormValues = {
  name: string;
  phone: string;
  shopName: string;
  shopAddress: string
};

const ShopForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {

    console.log("Form Data:", data);

    const appUser = {
      name: data.name,
      phoneNum: Number(data.phone),
      shopName: data.shopName,
      shopAddress: data.shopAddress
    };
    try {
      await addUser(appUser)
      toast.success("user added successfully")
      console.log(appUser)
    } catch (error) {
      toast.success("failed to save user")
      console.log("failed to save user ", error);
    }
  };

  return (
    <>
      <div className="max-w-3xl mx-auto my-4 space-y-4">
        <h1>Welcome to your Billing App.</h1>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 400 }}>
          <div className="flex items-center justify-between">
            <label>Name</label>
            <input
              placeholder="Enter your Name"
              className="bg-white text-black ml-4"
              type="text"
              {...register("name")}
            />
          </div>

          <div className="flex items-center justify-between">
            <label>Phone Number</label>
            <input
              placeholder="Enter Phone Number"
              className="bg-white text-black ml-4"
              type="tel"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter a valid 10-digit phone number",
                },
              })}
            />
            {errors.phone && <p>{errors.phone.message}</p>}
          </div>

          <div className="flex items-center justify-between">
            <label>Shop Name</label>
            <input
              placeholder="Enter your shop Name"
              className="bg-white text-black ml-4"
              type="text"
              {...register("shopName")}
            />
          </div>

          <div className="flex items-center justify-between">
            <label>Shop Address</label>
            <textarea
              placeholder="Enter your shop Address"
              className="bg-white text-black ml-4"
              {...register("shopAddress")}
            />
          </div>
          <div className="text-right">
            <button className="text-right bg-white text-black rounded-md py-2 px-4" type="submit">Submit</button>
            <br />
            <Link
              href={'/ant/Bill'}
            >
              <button className="text-right bg-white text-black rounded-md py-2 mt-4 px-4" type="submit">Go to Billing page</button>
            </Link>

          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default ShopForm;
