const appUser = {
  name: "Jhone due",
  phoneNum: 333233454,
  shopName: "My shop"
}
const myServices = [
  { name: "Bike Wash", price: 50, id: 1 },
  { name: "Break repair", price: 45, id: 2 },
  { name: "Engine repair", price: 550, id: 3 },
]
const ser = {
  clientName: "Saroj",
  phoneNum: 334323456,
  workDone: [
    { name: "Break repair", price: 45, id: 2 },
    { name: "Engine repair", price: 550, id: 3 },
  ]
}
const price = ser.workDone.reduce(
  (acc, services) => (services.price + acc), 0)
console.log(price)