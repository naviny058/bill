"use client";

import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { addInvoice, getUsers } from "../indexdb";

interface Services {
  name: string
  price: number
  id: number
}

interface InvoiceProps {
  clientName: string
  clientPhoneNum: number | null
  workDone: Services[]
}
type AppUser = {
  id: number;
  name: string;
  phoneNum: number;
  shopName: string;
  shopAddress: string
};
function Invoice({ clientName, clientPhoneNum, workDone }: InvoiceProps) {
  const [users, setUsers] = useState<AppUser[]>([]);
  const invoiceRef = useRef(null);
  const [showInvoice, setShowInvoice] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);
  const handleGenerateBill = async () => {
    setShowInvoice(true)
    const invoiceData = {
      clientName,
      phoneNum: clientPhoneNum,
      workDone,
    };
    console.log({ clientName, clientPhoneNum, workDone })
    try {
      await addInvoice(invoiceData);
      console.log("Invoice saved to IndexedDB:", invoiceData);
      setShowInvoice(true);
    } catch (error) {
      console.error("Failed to save invoice", error);
    }
  };

  const handleDownload = async () => {
    if (!invoiceRef.current) return;

    const canvas = await html2canvas(invoiceRef.current, {
      scale: 2,
      backgroundColor: "#ffffff",
    })

    const link = document.createElement("a");
    link.download = "invoice.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }


  return (
    <div><h2>Invoice</h2>
      <button onClick={() => handleGenerateBill()}>generate Bill</button>
      {showInvoice && (
        <>
          <div
            ref={invoiceRef}
            style={{
              backgroundColor: "#ffffff",
              color: "#000000",
              width: "440px"
            }}
            className='invoice p-4'>
            <h2 className='text-center my-7'>{users[users.length - 1].shopName || "Near Hospital chouk,Binugarh,Hazaribag"}</h2>
            <div className="grid grid-cols-2 my-20 justify-between">
              <div className='max-w-32'>
                {users[users.length - 1].shopAddress}
              </div>
              <div className='flex flex-col text-right'>
                <span>{users[users.length - 1].name || "Plana Naam"}</span>
                <span>{users[users.length - 1].phoneNum || "No number Given"}</span>
              </div>
            </div>

            <div className='my-4'>
              <div
                style={{
                  backgroundColor: "#d1d5db"
                }}
                className=''>customer Details</div>
              <div>
                <p><strong>Client:</strong> <span>{clientName}</span> </p>
                <p><strong>Phone:</strong><span>{clientPhoneNum}</span></p>

              </div>
            </div>
            <div className=''>
              <table className='w-full border-collapse'>
                <thead>
                  <tr style={{
                    backgroundColor: "#d1d5db"
                  }} className=''>
                    <th className='text-left font-medium py-2'>Services Name</th>
                    <th className='text-right  font-medium py-2'>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    workDone.map(services => (
                      <tr key={services.id}>
                        <td>{services.name}</td>
                        <td className='text-right'>₹ {services.price}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              <hr className="my-4" />
              <div className='text-right w-full'>₹
                {workDone.reduce((acc, data) => (data.price + acc), 0)}
              </div>
            </div>
            <div className='text-center'>Thank you for visiting us</div>

          </div>
          <button className="bg-black text-white py-2 px-4 rounded-md" onClick={handleDownload}>download invoice</button>
        </>
      )
      }
    </div>
  )
}

export default Invoice