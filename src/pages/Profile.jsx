import React, { useEffect, useState } from "react";

const Profile = () => {
  const defaultData = {
    name: "Mohsin Munir",
    phone: "0301 8943269",
    email: "itzmohsinmunir101@gmail.com",
    bloodGroup: "O +",
    language: "Urdu",
    country: "India",
    dateOfBirth: "1998-05-15",
    gender: "Male",
    address: "123 Main Street, Kasur",
  };

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(defaultData);

  const bloodGroups = ["A +", "A -", "B +", "B -", "O +", "O -", "AB +", "AB -"];
  const countries = ["Pakistan", "India", "USA", "UK", "Canada"];
  const genders = ["Male", "Female", "Other"];

  // Load data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("profileData");
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEdit = () => {
    if (isEditing) {
      // Save to localStorage
      localStorage.setItem("profileData", JSON.stringify(formData));
    }
    setIsEditing(!isEditing);
  };

//   const setDate =  Date.now()

  return (
    <div className="">
        <div className="h-screen bg- w-full mx-auto p-4">
      <div className="bg-white shadow-xl rounded-xl min-h-full w mx-auto max-w-8xl">
        {/* Header */}
        <div className="p-6 ">
          <h2 className="text-lg font-semibold text-gray-800">Welcome, Amanda</h2>
          <p className="text-md text-gray-500">{new Date().toDateString()}</p>
        </div>

        {/* Profile Header */}
        <div className="bg- border-b border-gray-300 rounded-md shadow-lg p-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src="/imgs/park.jpeg"
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover"
            />
            <div>
              <h2 className="font-bold text-gray-800 text-xl">Alexa Rawles</h2>
              <p className="text-lg text-gray-600">alexarawles@gmail.com</p>
            </div>
          </div>
          <button
            onClick={toggleEdit}
            className="bg-blue-600 text-white px-6 py-2 font-semibold cursor-pointer text-xl rounded-md hover:bg-blue-700 transition"
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>

        {/* Info Section */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-48 w-[] mx-auto text-sm text-gray-700">
          {/* Name */}
          <div>
            <h2 className="font-bold text-xl">Name</h2>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-300 outline-none p-2 mt-1 w-full rounded-md"
              />
            ) : (
              <h2 className="text-gray-600 text-xl">{formData.name}</h2>
            )}
          </div>

          {/* Phone */}
          <div>
            <h2 className="font-bold text-xl">Phone number</h2>
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="border border-gray-300 outline-none p-2 mt-1 w-full rounded-md"
              />
            ) : (
              <h2 className="text-gray-600 text-xl">{formData.phone}</h2>
            )}
          </div>

          {/* Email */}
          <div>
            <h2 className="font-bold text-xl">Email</h2>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-300 p-2 mt-1 w-full rounded-md"
              />
            ) : (
              <h2 className="text-gray-600 text-xl">{formData.email}</h2>
            )}
          </div>

          {/* Blood Group */}
          <div>
            <h2 className="font-bold text-xl">Blood Group</h2>
            {isEditing ? (
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="border border-gray-300 p-2 mt-1 w-full rounded-md"
              >
                {bloodGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            ) : (
              <h2 className="text-gray-600 text-xl">{formData.bloodGroup}</h2>
            )}
          </div>

          {/* Language */}
          <div>
            <h2 className="font-bold text-xl">Language</h2>
            {isEditing ? (
              <input
                type="text"
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="border border-gray-300 p-2 mt-1 w-full rounded-md"
              />
            ) : (
              <h2 className="text-gray-600 text-xl">{formData.language}</h2>
            )}
          </div>

          {/* Country */}
          <div>
            <h2 className="font-bold text-xl">Country</h2>
            {isEditing ? (
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="border border-gray-300 p-2 mt-1 w-full rounded-md"
              >
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            ) : (
              <h2 className="text-gray-600 text-xl">{formData.country}</h2>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <h2 className="font-bold text-xl">Date of Birth</h2>
            {isEditing ? (
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="border border-gray-300 p-2 mt-1 w-full rounded-md"
              />
            ) : (
              <h2 className="text-gray-600 text-xl">{formData.dateOfBirth}</h2>
            )}
          </div>

          {/* Gender */}
          <div>
            <h2 className="font-bold text-xl">Gender</h2>
            {isEditing ? (
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="border border-gray-300 p-2 mt-1 w-full rounded"
              >
                {genders.map((gender) => (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
            ) : (
              <h2 className="text-gray-600 text-xl">{formData.gender}</h2>
            )}
          </div>

          {/* Address */}
          <div className="sm:col-span-2">
            <h2 className="font-bold text-xl">Address</h2>
            {isEditing ? (
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className="border border-gray-300 p-2 mt-1 w-full rounded-md"
              />
            ) : (
              <h2 className="text-gray-600 text-xl">{formData.address}</h2>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Profile;
