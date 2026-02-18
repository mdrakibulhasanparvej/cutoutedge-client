const StatsCard = ({ title, value, icon: Icon, color, trend }) => (
  <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-2xl md:text-3xl font-bold mt-1 text-gray-900">
          {value}
        </p>
      </div>

      <div className={`p-3 md:p-4 rounded-xl ${color} bg-opacity-90`}>
        <Icon size={26} className="text-white" />
      </div>
    </div>

    {trend && (
      <div className="mt-3 text-xs flex items-center gap-1">
        <FiArrowUpRight
          size={14}
          className={trend.positive ? "text-green-600" : "text-red-600"}
        />
        <span className={trend.positive ? "text-green-600" : "text-red-600"}>
          {trend.value}
        </span>
        <span className="text-gray-500">vs yesterday</span>
      </div>
    )}
  </div>
);

export default StatsCard;