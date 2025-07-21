// SelectTimeCard.jsx
import { FaHeart } from "react-icons/fa";

export default function SelectTime({
  doctor = {
    name: "Dr. Shruti Kedia",
    clinic: "Upasana Dental Clinic, salt lake",
    rating: 3.8,
    avatar: "/doctor.jpg",
    stats: [
      { label: "patients", value: "300 +" },
      { label: "Year Exp", value: "15 +" },
      { label: "review", value: "200 +" },
    ],
  },
  slots = [
    { day: "Today, 23 Feb", count: 0 },
    { day: "Tomorrow, 24 Feb", count: 9, highlighted: true },
    { day: "Thu, 25 Feb", count: 10 },
  ],
  nextAvailability = "wed, 24 Feb",
}) {
  return (
    <div className="max-w-md mx-auto p-4">
      {/* header */}
      <button
        aria-label="Back"
        className="mb-2 text-gray-500 hover:text-gray-700"
      >
        ←
      </button>

      {/* doctor card */}
      <div className="relative bg-white rounded-2xl shadow p-4 flex items-center gap-4">
        <img
          src={doctor.avatar}
          alt={doctor.name}
          className="w-20 h-20 rounded-xl object-cover"
        />

        <div className="flex-1">
          <h2 className="text-lg font-semibold">{doctor.name}</h2>
          <p className="text-sm text-gray-500">{doctor.clinic}</p>

          {/* stars */}
          <div className="flex mt-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i <= Math.round(doctor.rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.184c.969 0 1.371 1.24.588 1.81l-3.388 2.463a1 1 0 00-.364 1.118l1.286 3.971c.3.922-.755 1.688-1.54 1.118l-3.388-2.463a1 1 0 00-1.175 0l-3.388 2.463c-.784.57-1.838-.196-1.539-1.118l1.285-3.971a1 1 0 00-.364-1.118L2.04 9.397c-.783-.57-.38-1.81.588-1.81H6.81a1 1 0 00.951-.69l1.287-3.97z" />
              </svg>
            ))}
          </div>
        </div>

        <FaHeart className="text-red-500 text-xl absolute top-4 right-4" />
        <button className="absolute bottom-4 right-4 bg-emerald-500 hover:bg-emerald-600 text-white text-xs px-3 py-1 rounded-md">
          View Profile
        </button>
      </div>

      {/* stat badges */}
      <div className="flex justify-center gap-4 mt-4">
        {doctor.stats.map(({ label, value }) => (
          <div
            key={label}
            className="bg-emerald-50 text-emerald-600 text-center px-3 py-2 rounded-lg shadow-sm"
          >
            <p className="font-semibold leading-none">{value}</p>
            <p className="text-[11px] uppercase tracking-wide">{label}</p>
          </div>
        ))}
      </div>

      {/* slot buttons */}
      <div className="flex justify-center gap-2 mt-6">
        {slots.map(({ day, count, highlighted }) => (
          <button
            key={day}
            disabled={count === 0}
            className={`px-4 py-2 rounded-lg text-xs border
              ${
                highlighted
                  ? "bg-emerald-500 text-white border-emerald-500"
                  : "bg-white text-gray-700 border-gray-200"
              }
              ${count === 0 ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            {day}
            <span className="block text-[10px] mt-0.5">
              {count} slots available
            </span>
          </button>
        ))}
      </div>

      {/* availability section */}
      <div className="mt-8 space-y-3 text-center">
        <p className="text-sm font-medium text-gray-700">
          Today, 23 Feb <span className="text-red-500">No slots available</span>
        </p>

        <p className="w-fit mx-auto bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-xs">
          Next availability on {nextAvailability}
        </p>

        <div className="relative">
          <span className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300"></span>
          </span>
          <span className="relative bg-white px-2 text-xs text-gray-500">
            OR
          </span>
        </div>

        <button className="w-full border border-emerald-500 text-emerald-600 py-2 rounded-lg text-sm font-medium hover:bg-emerald-50">
          Contact Clinic
        </button>
      </div>
    </div>
  );
}
