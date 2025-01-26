import { Sidebar } from "./Sider";
import { BeneficiaryCard } from "./BeneficiaryCard";
import { ActionButtons } from "./ActionButton";

import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers/store";  // Assuming you have a Redux store

// Assuming the auth slice is structured this way in your store
interface AuthState {
  user: {
    isAdmin: boolean;
    _id: string;
    name: string;
    username: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  loader: boolean;
  isAdmin: boolean;
}

export function Dashboard() {
  // Adding type for selector using the RootState type
  const selector = useSelector((state: RootState) => state.auth);

  console.log(selector, "sels");

  return (
    <div className="h-screen bg-white">
      <div className="grid lg:grid-cols-[240px_1fr] h-full">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="p-6 h-full">
          <div className="space-y-8 h-full">
            <BeneficiaryCard title="All Time Beneficiary" regions={["Total", "Cambodia", "India"]} />
            <BeneficiaryCard title="Current Month Beneficiary"  regions={["Total", "Cambodia", "India"]} />
            <ActionButtons />
          </div>
        </main>
      </div>
    </div>
  );
}
