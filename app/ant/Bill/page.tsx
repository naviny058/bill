"use client"
import { Button, InputNumber, Table, Select, Input } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import Invoice from '../Invoice'

interface Services {
  name: string,
  price: number,
  id: number
}
interface Invoice {
  clientName: string,
  clientPhoneNum: number,
  workDone: Services[]
}
const myServices: Services[] = [
  { name: "Bike Wash", price: 50, id: 1 },
  { name: "Break repair", price: 45, id: 2 },
  { name: "Engine repair", price: 550, id: 3 },
]
interface RowData {
  key: number;
  service?: Services;
  price: number;
  isEditing: boolean;
}
function Bill() {
  const [RowData, setRowData] = useState<RowData[]>([])
  const [clientName, setClientName] = useState("")
  const [clientPhoneNum, setClientPhoneNum] = useState<number | null>(null)

  const addServices = () => {
    setRowData(prev => [
      ...prev,
      { key: prev.length, service: undefined, price: 0, isEditing: false }
    ])
  }

  const updateRow = (key: number, updates: Partial<RowData>) => {
    setRowData(prev =>
      prev.map(row => (row.key === key ? { ...row, ...updates } : row))
    )
  }

  const columns: ColumnsType<RowData> = [
    {
      title: "Services 🛠️",
      dataIndex: "service",
      key: "service",
      render: (_: unknown, record: RowData) => (
        <Select
          placeholder="Select Services"
          value={record.service?.id}
          style={{ width: "100%" }}
          options={myServices.map(serv => ({
            label: serv.name,
            value: serv.id
          }))}
          onChange={serviceId => {
            const service = myServices.find(s => s.id === serviceId);
            updateRow(record.key, {
              service,
              price: service?.price
            })
          }}
        />
      )
    },
    {
      title: "Price  ₹",
      dataIndex: "price",
      key: "price",
      render: (_: unknown, record: RowData) =>
        record.isEditing ? (
          <InputNumber
            value={record.price}
            autoFocus
            style={{ width: "100%" }}
            onBlur={() => updateRow(record.key, { isEditing: false })}
            onChange={value => updateRow(record.key, { price: value ?? 0 })}
          />
        ) : (
          <div
            onDoubleClick={() => updateRow(record.key, { isEditing: true })}
            style={{ cursor: "pointer" }}
          >
            {record.price}
          </div>
        )
    }
  ]
  const workDone: Services[] = RowData
    .filter(row => row.service)
    .map(row => ({
      name: row.service!.name,
      price: row.price,
      id: row.service!.id,
    }))

  return (
    <div className='max-w-2xl mx-auto space-y-4'>
      <ClientDetails
        clientName={clientName}
        setClientName={setClientName}
        clientPhoneNum={clientPhoneNum}
        setClientPhoneNum={setClientPhoneNum}
      />
      <div>
        <Button
          onClick={addServices}
          icon={<Plus />}
        >Add Services</Button>
      </div>

      <Table<RowData>
        columns={columns}
        dataSource={RowData}
        pagination={false}
      />
      <div className='relative'>
        {RowData && <span className='p-4 rounded-md absolute right-0 border-2 border-white'>
          {RowData.reduce((acc, data) => (data.price + acc), 0)}
        </span>}
      </div>
      <Invoice
        clientName={clientName}
        clientPhoneNum={clientPhoneNum}
        workDone={workDone}
      />
    </div>
  )
}
function ClientDetails({
  clientName,
  setClientName,
  clientPhoneNum,
  setClientPhoneNum,
}: {
  clientName: string
  setClientName: (val: string) => void
  clientPhoneNum: number | null
  setClientPhoneNum: (val: number | null) => void
}) {

  return (
    <div className='max-w-80! space-y-4!'>
      <Input
        placeholder="Client Name"
        value={clientName}
        onChange={(e) => setClientName(e.target.value)}
      />
      <InputNumber
        maxLength={10}
        style={{ width: 320 }}
        placeholder="Client Phone Number"
        value={clientPhoneNum ?? undefined}
        onChange={(value) => setClientPhoneNum(value)}
      />
    </div>
  )
}
export default Bill