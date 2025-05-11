
import { BarChart, ShoppingCart, Users, DollarSign } from "lucide-react";

type StatsCardProps = {
  title: string;
  value: string | number;
  trend: number;
  icon: React.ReactNode;
  iconBg: string;
};

const StatsCard = ({ title, value, trend, icon, iconBg }: StatsCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${iconBg}`}>
          {icon}
        </div>
      </div>
      <div className="mt-4">
        <span
          className={`text-sm ${
            trend > 0
              ? "text-emerald-600"
              : trend < 0
              ? "text-red-500"
              : "text-slate-500"
          }`}
        >
          {trend > 0 ? "+" : ""}{trend}% from last month
        </span>
      </div>
    </div>
  );
};

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Total Revenue"
        value="$12,628.45"
        trend={8.5}
        icon={<DollarSign className="text-emerald-600" size={24} />}
        iconBg="bg-emerald-100"
      />
      <StatsCard
        title="Orders"
        value="156"
        trend={4.2}
        icon={<ShoppingCart className="text-blue-600" size={24} />}
        iconBg="bg-blue-100"
      />
      <StatsCard
        title="Customers"
        value="2,845"
        trend={12.9}
        icon={<Users className="text-purple-600" size={24} />}
        iconBg="bg-purple-100"
      />
      <StatsCard
        title="Conversion Rate"
        value="3.24%"
        trend={-1.8}
        icon={<BarChart className="text-orange-600" size={24} />}
        iconBg="bg-orange-100"
      />
    </div>
  );
};

export default DashboardStats;
