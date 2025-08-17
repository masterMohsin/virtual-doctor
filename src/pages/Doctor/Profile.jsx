import axios from "axios";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({});
  const [editing, setEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const url = import.meta.env.VITE_API_URL;
        const res = await axios.get(`${url}/api/users/get-doctor`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setUserData(res.data.doctor);
          setFormData(res.data.doctor);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSave = async () => {
    try {
      const url = import.meta.env.VITE_API_URL;
      const formDataToSend = new FormData();

      for (let key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      if (profileImage) {
        formDataToSend.append("profileImage", profileImage);
      }

      const res = await axios.put(`${url}/api/users/update-doctor`, formDataToSend, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        setUserData(res.data.doctor);
        setEditing(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!userData) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Banner */}
      <div className="relative h-52 w-full">
        <img
          src="https://assets.smfgindiacredit.com/sites/default/files/Most_Beautiful_Unbelievable_Places_to_See_in_India_Banner_0.jpg"
          alt="Banner"
          className="object-cover w-full h-full rounded-b-xl"
        />
        <img
          src={userData?.profileImage || "https://randomuser.me/api/portraits/men/75.jpg"}
          alt="Profile"
          className="absolute left-10 -bottom-16 w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
        />
      </div>

      {/* Profile Details */}
      <div className="mt-20 px-10 pb-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Doctor Profile</h1>
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow"
            >
              Edit Profile
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded-lg shadow"
            >
              Save Changes
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow">
          {/* Profile Image Update */}
          {editing && (
            <div className="md:col-span-2">
              <label className="font-semibold block">Profile Image:</label>
              <input type="file" name="profileImage" onChange={handleImageChange} />
            </div>
          )}

          {/* Name */}
          <div>
            <label className="font-semibold">Full Name:</label>
            {editing ? (
              <input
                type="text"
                name="name"
                value={formData?.name || ""}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            ) : (
              <p className="text-gray-700">{userData?.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="font-semibold">Email:</label>
            <p className="text-gray-700">{userData?.email}</p>
          </div>

          {/* DOB */}
          <div>
            <label className="font-semibold">Date of Birth:</label>
            {editing ? (
              <input
                type="date"
                name="dob"
                value={formData?.dob?.split("T")[0] || ""}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            ) : (
              <p className="text-gray-700">{userData?.dob?.split("T")[0]}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="font-semibold">Gender:</label>
            {editing ? (
              <select
                name="gender"
                value={formData?.gender || ""}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            ) : (
              <p className="text-gray-700">{userData?.gender}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="font-semibold">Phone Number:</label>
            {editing ? (
              <input
                type="text"
                name="phone"
                value={formData?.phone || ""}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            ) : (
              <p className="text-gray-700">{userData?.phone}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="font-semibold">Address:</label>
            {editing ? (
              <input
                type="text"
                name="address"
                value={formData?.address || ""}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            ) : (
              <p className="text-gray-700">{userData?.address}</p>
            )}
          </div>

          {/* License */}
          <div>
            <label className="font-semibold">Medical License No:</label>
            {editing ? (
              <input
                type="text"
                name="licenseNumber"
                value={formData?.licenseNumber || ""}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            ) : (
              <p className="text-gray-700">{userData?.licenseNumber}</p>
            )}
          </div>

          {/* Specialization */}
          <div>
            <label className="font-semibold">Specialization:</label>
            {editing ? (
              <input
                type="text"
                name="specialization"
                value={formData?.specialization || ""}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            ) : (
              <p className="text-gray-700">{userData?.specialization}</p>
            )}
          </div>

          {/* Years of Experience */}
          <div>
            <label className="font-semibold">Years of Experience:</label>
            {editing ? (
              <input
                type="number"
                name="yearsOfExperience"
                value={formData?.yearsOfExperience || ""}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            ) : (
              <p className="text-gray-700">{userData?.yearsOfExperience} Years</p>
            )}
          </div>

          {/* Hospital Affiliation */}
          <div>
            <label className="font-semibold">Hospital Affiliation:</label>
            {editing ? (
              <input
                type="text"
                name="affiliation"
                value={formData?.affiliation || ""}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            ) : (
              <p className="text-gray-700">{userData?.affiliation}</p>
            )}
          </div>

          {/* Consultation Hours */}
          <div>
            <label className="font-semibold">Consultation Hours:</label>
            {editing ? (
              <input
                type="text"
                name="consultationHours"
                value={formData?.consultationHours || ""}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="e.g. 9 AM - 3 PM"
              />
            ) : (
              <p className="text-gray-700">{userData?.consultationHours}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
