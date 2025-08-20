import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const url = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`${url}/api/users/get-patient`, {
          
          withCredentials: true,
        });
        if (res.data.success) {
          setUserData(res.data.patient);
          setFormData(res.data.patient);
        } else {
          setError(res.data.error || "Failed to fetch profile.");
        }
      } catch (error) {
        if (error.response?.status === 401) {
          setError("Session expired or unauthorized. Please login again.");
        } else {
          setError(error.message || "Failed to fetch profile.");
        }
      }
    };
    fetchUser();
  }, []);

  const bloodGroups = ["A +", "A -", "B +", "B -", "O +", "O -", "AB +", "AB -"];
  const countries = ["Pakistan", "India", "USA", "UK", "Canada"];
  const genders = ["Male", "Female", "Other"];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage" && files && files[0]) {
      setSelectedImage(files[0]);
      setPreviewUrl(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const toggleEdit = async () => {
    if (isEditing) {
      // Save changes
      try {
        const url = import.meta.env.VITE_API_URL;
        const token = localStorage.getItem("token");
        const form = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          if (key !== "profileImage") {
            form.append(key, value);
          }
        });
        if (selectedImage) {
          form.append("profileImage", selectedImage);
        }
        const res = await axios.put(
          `${url}/api/users/update-patient`,
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        if (res.data.success) {
          setUserData(res.data.patient);
          setFormData(res.data.patient);
          setSelectedImage(null);
          setPreviewUrl("");
          setIsEditing(false);
        } else {
          alert(res.data.error || "Failed to update profile.");
        }
      } catch (err) {
        alert(err.response?.data?.error || "Update failed");
      }
    } else {
      setIsEditing(true);
    }
  };

  if (error) {
    return <div className="text-center p-10 text-red-500">{error}</div>;
  }
  if (!formData) {
    return <div className="text-center p-10">Loading profile...</div>;
  }

  return (
    <div className="h-screen w-full mx-auto p-4">
      <div className="bg-white shadow-xl rounded-xl min-h-full mx-auto max-w-8xl">
        {/* Header */}
        <div className="p-6 ">
          <h2 className="text-lg font-semibold text-gray-800">
            Welcome, {formData.name || formData.fullName}
          </h2>
          <p className="text-md text-gray-500">{new Date().toDateString()}</p>
        </div>

        {/* Profile Header */}
        <div className="border-b border-gray-300 rounded-md shadow-lg p-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={previewUrl || formData.profileImage || "/imgs/park.jpeg"}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover"
              />
              {isEditing && (
                <label className="absolute bottom-2 right-2 bg-blue-600 text-white px-2 py-1 rounded cursor-pointer text-xs">
                  Change
                  <input
                    type="file"
                    name="profileImage"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <div>
              <h2 className="font-bold text-gray-800 text-xl">
                {formData.name || formData.fullName}
              </h2>
              <p className="text-lg text-gray-600">{formData.email}</p>
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
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-48 text-sm text-gray-700">
          {/* Name */}
          <div>
            <h2 className="font-bold text-xl">Name</h2>
            {isEditing ? (
              <input
                type="text"
                name="fullName"
                value={formData.fullName || ""}
                onChange={handleChange}
                className="border border-gray-300 outline-none p-2 mt-1 w-full rounded-md"
              />
            ) : (
              <h2 className="text-gray-600 text-xl">{formData.fullName}</h2>
            )}
          </div>

          {/* Phone */}
          <div>
            <h2 className="font-bold text-xl">Phone</h2>
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
                className="border border-gray-300 outline-none p-2 mt-1 w-full rounded-md"
              />
            ) : (
              <h2 className="text-gray-600 text-xl">{formData?.phone}</h2>
            )}
          </div>

          {/* Email */}
          <div>
            <h2 className="font-bold text-xl">Email</h2>
            <h2 className="text-gray-600 text-xl">{formData.email}</h2>
          </div>

          {/* Blood Group */}
          <div>
            <h2 className="font-bold text-xl">Blood Group</h2>
            {isEditing ? (
              <select
                name="bloodGroup"
                value={formData.bloodGroup || ""}
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
                value={formData.language || ""}
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
                value={formData.country || ""}
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
                name="dob"
                value={
                  formData.dob
                    ? new Date(formData.dob).toISOString().split("T")[0]
                    : ""
                }
                onChange={handleChange}
                className="border border-gray-300 p-2 mt-1 w-full rounded-md"
              />
            ) : (
              <h2 className="text-gray-600 text-xl">{
                formData.dob
                  ? (() => {
                      const d = new Date(formData.dob);
                      const day = String(d.getDate()).padStart(2, '0');
                      const month = String(d.getMonth() + 1).padStart(2, '0');
                      const year = d.getFullYear();
                      return `${day}-${month}-${year}`;
                    })()
                  : ""
              }</h2>
            )}
          </div>

          {/* Gender */}
          <div>
            <h2 className="font-bold text-xl">Gender</h2>
            {isEditing ? (
              <select
                name="gender"
                value={formData.gender || ""}
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
                value={formData?.address || ""}
                onChange={handleChange}
                rows={3}
                className="border border-gray-300 p-2 mt-1 w-full rounded-md"
              />
            ) : (
              <h2 className="text-gray-600 text-xl">{formData?.address}</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
