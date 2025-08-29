import API from "../../api/api.js";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({});
  const [editing, setEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const bloodGroups = ["A +", "A -", "B +", "B -", "O +", "O -", "AB +", "AB -"];
  const countries = ["Pakistan", "India", "USA", "UK", "Canada", "Australia", "Germany", "France", "Japan", "China"];
  const genders = ["Male", "Female", "Other"];

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await API.get('/users/get-patient');
        console.log('Backend response:', res.data); // Debug log
        if (res.data.success) {
          setUserData(res.data.patient);
          
          // Map backend fields to frontend fields - match backend response structure exactly
          setFormData({
            fullName: res?.data?.patient?.fullName || '',
            email: res?.data?.patient?.email || '',
            dob: res?.data?.patient?.dob || '',
            gender: res?.data?.patient?.gender || '',
            phoneNumber: res?.data?.patient?.phone || res?.data?.patient?.phoneNumber || '',
            address: res?.data?.patient?.address || '',
            bloodGroup: res?.data?.patient?.bloodGroup || '',
            country: res?.data?.patient?.country || '',
            language: res?.data?.patient?.language || ''
          });
          console.log('Form data set:', formData); // Debug log
        } else {
          setError("Failed to load patient data");
        }
      } catch (error) {
        console.log('Error fetching patient data:', error.response?.data || error.message);
        setError("Failed to load patient data");
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  // Debug useEffect to log formData changes
  useEffect(() => {
    console.log('FormData changed:', formData);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear any previous errors when user starts typing
    if (error) setError("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log("Profile image selected:", file);
    if (file) {
      console.log("File details:", {
        name: file.name,
        size: file.size,
        type: file.type
      });
      setProfileImage(file);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      // Validate required fields
      if (!formData.fullName) {
        setError("Full Name is required");
        return;
      }

      const formDataToSend = new FormData();

      // Map frontend fields to backend fields - match backend update structure
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          formDataToSend.append(key, value);
        }
      });

      if (profileImage) {
        formDataToSend.append("profileImage", profileImage);
        console.log("Profile image added to FormData:", profileImage.name, profileImage.size);
      }

      // Debug: Log what's being sent
      console.log('FormData being sent:');
      for (let [key, value] of formDataToSend.entries()) {
        console.log(key, ':', value);
      }

      const res = await API.put('/users/update-patient', formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log('Backend response:', res.data);

      if (res.data.success) {
        setUserData(res.data.patient);
        setEditing(false);
        setProfileImage(null);
        setSuccess("Profile updated successfully!");
        
        // Refresh user data
        const refreshRes = await API.get('/users/get-patient');
        if (refreshRes.data.success) {
          setUserData(refreshRes.data.patient);
        }
      } else {
        setError(res.data.message || "Failed to update profile");
      }
    } catch (error) {
      console.log('Error updating patient data:', error.response?.data || error.message);
      console.log('Full error object:', error);
      setError(error.response?.data?.error || error.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setProfileImage(null);
    setError("");
    setSuccess("");
    // Reset form data to original values
    if (userData) {
      setFormData({
        fullName: userData.fullName || '',
        email: userData.email || '',
        dob: userData.dob || '',
        gender: userData.gender || '',
        phoneNumber: userData.phone || userData.phoneNumber || '',
        address: userData.address || '',
        bloodGroup: userData.bloodGroup || '',
        country: userData.country || '',
        language: userData.language || ''
      });
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex justify-center items-center">
        <p className="text-red-500">{error || "Failed to load patient data"}</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Banner */}
      <div className="relative h-52 w-full">
        <img
          src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Banner"
          className="object-cover w-full h-full rounded-b-xl"
        />
        <img
          src={userData?.profileImage || "/imgs/default-patient.jpg"}
          alt="Profile"
          className="absolute left-10 -bottom-16 w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
        />
      </div>

      {/* Profile Details */}
      <div className="mt-20 px-10 pb-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Patient Profile</h1>
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 cursor-pointer bg-blue-600 hover:bg-blue-800 text-white rounded-lg shadow"
            >
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                className="px-4 py-2 cursor-pointer bg-gray-600 hover:bg-gray-800 text-white rounded-lg shadow"
                disabled={saving}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 cursor-pointer bg-green-600 hover:bg-green-800 text-white rounded-lg shadow disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}
        </div>

        {/* Error and Success Messages */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {success}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow">
          {/* Profile Image Update */}
          {editing && (
            <div className="md:col-span-2">
              <label className="font-semibold block">Profile Image:</label>
              <input 
                type="file" 
                name="profileImage" 
                onChange={handleImageChange} 
                accept="image/*,.jpg,.jpeg,.png,.gif,.webp"
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {profileImage && (
                <p className="text-sm text-green-600 mt-1">
                  ✓ Selected: {profileImage.name} ({(profileImage.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>
          )}

          {/* Full Name */}
          <div>
            <label className="font-semibold">Full Name: *</label>
            {editing ? (
              <input
                type="text"
                name="fullName"
                value={formData?.fullName || ""}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            ) : (
              <p className="text-gray-700">{userData?.fullName}</p>
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
              <p className="text-gray-700">{userData?.dob}</p>
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
                {genders.map((gender) => (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                ))}
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
                name="phoneNumber"
                value={formData?.phoneNumber || ""}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            ) : (
              <p className="text-gray-700">{userData?.phone || userData?.phoneNumber}</p>
            )}
          </div>

          {/* Blood Group */}
          <div>
            <label className="font-semibold">Blood Group:</label>
            {editing ? (
              <select
                name="bloodGroup"
                value={formData?.bloodGroup || ""}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="">Select</option>
                {bloodGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-gray-700">{userData?.bloodGroup}</p>
            )}
          </div>

          {/* Country */}
          <div>
            <label className="font-semibold">Country:</label>
            {editing ? (
              <select
                name="country"
                value={formData?.country || ""}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="">Select</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-gray-700">{userData?.country}</p>
            )}
          </div>

          {/* Language */}
          <div>
            <label className="font-semibold">Language:</label>
            {editing ? (
              <input
                type="text"
                name="language"
                value={formData?.language || ""}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            ) : (
              <p className="text-gray-700">{userData?.language}</p>
            )}
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="font-semibold">Address:</label>
            {editing ? (
              <textarea
                name="address"
                value={formData?.address || ""}
                onChange={handleChange}
                rows={3}
                className="w-full border p-2 rounded"
              />
            ) : (
              <p className="text-gray-700">{userData?.address}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
