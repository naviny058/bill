import Bill from './ant/Bill/page'
import ShopForm from "./ant/Userhome/page";

export default function Home() {

  return (
    <>
      <div className="bg-gray-950 text-white max-w-6xl mx-auto p-4">
        <h1 className="my-2.5 text-center text-2xl">Billing System</h1>
        <div>
          <ShopForm />
          {/* <Bill /> */}
        </div>
      </div>
    </>
  );
}
