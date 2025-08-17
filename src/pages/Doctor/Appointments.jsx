import React from "react";

const todaysAppointments = [
  {
    id: 1,
    name: "Ali Khan",
    date: "30 July 2025",
    time: "10:00 AM",
    status: "Scheduled",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    reason: "General Checkup",
    age: 29,
  },
  {
    id: 2,
    name: "Sara Ahmed",
    date: "30 July 2025",
    time: "11:30 AM",
    status: "Scheduled",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    reason: "Dental Consultation",
    age: 32,
  },
];

const Appointments = () => {
  return (
    <div className="p-4  ">
      <h1 className="text-3xl font-bold mb-6">Today's Appointments</h1>

      <div className="grid gap-4 md:grid-cols-2">
        {todaysAppointments.map((appt) => (
          <div
            key={appt.id}
            className="bg-white shadow-lg rounded-xl p-5 flex items-center justify-between hover:shadow-xl transition"
          >
            
            <div>
              <h2 className="text-xl font-semibold">{appt.name}</h2>
              <p className="text-gray-600">Date: {appt.date}</p>
              <p className="text-gray-600">Time: {appt.time}</p>
              <p className="text-gray-600">Reason: {appt.reason}</p>
              <p className="text-gray-600">Age: {appt.age}</p>
              <span className="inline-block mt-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
                {appt.status}
              </span>
            </div>

            <img
              src={appt.image}
              alt={appt.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-blue-100 mr-5"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
