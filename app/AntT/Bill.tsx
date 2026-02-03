"use client"
import { Button, InputNumber, Table, Select } from 'antd'
import { Option } from 'antd/es/mentions'
import { ColumnsType } from 'antd/es/table'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'

interface Services {
  name: string,
  price: number,
  id: number
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
          onChange={serviceId => {
            const service = myServices.find(s => s.id === serviceId);
            updateRow(record.key, {
              service,
              price: service?.price
            })
          }}
        >
          {myServices.map(service => (
            <Option key={service.id} value={service.id}>
              {service.name}
            </Option>
          ))}
        </Select>
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
  return (
    <div className='max-w-2xl mx-auto space-y-4'>
      <Button
        onClick={addServices}
        icon={<Plus />}
      >Add Services</Button>

      <Table<RowData>
        columns={columns}
        dataSource={RowData}
        pagination={false}
      />
    </div>
  )
}

export default Bill