import React from "react";
import { FaCircle } from "react-icons/fa6";
import { BarChart3 } from "lucide-react";
export function BeneficiaryCard({ title, regions }:{
    title:string, regions:string[]
}) {
  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-bold mb-4">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {regions.map((region:any) => (
          <div key={region} className="flex items-center gap-4 p-4 border rounded-lg">
            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
              <FaCircle />
            </div>
            <div>
              <p className="text-sm text-gray-500">{region}</p>
              <p className="text-2xl font-bold">0</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

BeneficiaryCard.defaultProps = {
  icon: "users",
  regions: ["Total", "Region1", "Region2"],
};
