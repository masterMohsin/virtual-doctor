import API from "../../api/api.js";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({});
  const [editing, setEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [degreeCertificate, setDegreeCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Helper function to format consultation hours for display
  const formatConsultationHours = (consultationHours) => {
    console.log('formatConsultationHours called with:', consultationHours); // Debug log
    
    if (!consultationHours || !Array.isArray(consultationHours) || consultationHours.length === 0) {
      console.log('No consultation hours found, returning "Not set"'); // Debug log
      return "Not set";
    }
    
    // Get the first weekday schedule (Mon-Fri)
    const weekdaySchedule = consultationHours.find(schedule => 
      ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(schedule.day)
    );
    
    console.log('Weekday schedule found:', weekdaySchedule); // Debug log
    
    if (weekdaySchedule && weekdaySchedule.start && weekdaySchedule.end) {
      const startTime = convertTo12Hour(weekdaySchedule.start);
      const endTime = convertTo12Hour(weekdaySchedule.end);
      const result = `${startTime} - ${endTime}`;
      console.log('Formatted consultation hours:', result); // Debug log
      return result;
    }
    
    console.log('No valid weekday schedule found, returning "Not set"'); // Debug log
    return "Not set";
  };

  // Helper function to convert 24-hour format to 12-hour format
  const convertTo12Hour = (time24) => {
    if (!time24) return "";
    console.log('Converting time24:', time24); // Debug log
    
    // Handle different time formats
    let hours, minutes;
    if (time24.includes(':')) {
      [hours, minutes] = time24.split(':').map(Number);
    } else {
      // Handle format like "0900" or "900"
      const timeStr = time24.toString().padStart(4, '0');
      hours = parseInt(timeStr.substring(0, 2));
      minutes = parseInt(timeStr.substring(2, 4));
    }
    
    const period = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    const result = `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;
    console.log('Converted to 12-hour:', result); // Debug log
    return result;
  };

  // Helper function to convert 12-hour format to 24-hour format
  const convertTo24Hour = (time12) => {
    if (!time12) return "";
    const timeMatch = time12.match(/(\d{1,2}):?(\d{2})?\s*(am|pm)/i);
    if (!timeMatch) return time12;
    
    let [_, hours, minutes, period] = timeMatch;
    hours = parseInt(hours);
    minutes = minutes ? parseInt(minutes) : 0;
    
    if (period.toLowerCase() === 'pm' && hours !== 12) hours += 12;
    if (period.toLowerCase() === 'am' && hours === 12) hours = 0;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await API.get('/users/get-doctor');
        console.log('Backend response:', res.data); // Debug log
        if (res.data.success) {
          setUserData(res.data.doctor);
          
          // Get consultation hours for editing
          const consultationHours = res.data.doctor.consultationHours || [];
          console.log('Consultation hours:', consultationHours); // Debug log
          const weekdaySchedule = consultationHours.find(schedule => 
            ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(schedule.day)
          );
          console.log('Weekday schedule:', weekdaySchedule); // Debug log
          
          // Map backend fields to frontend fields - match backend response structure
          setFormData({
            fullName: res.data.doctor.name || res.data.doctor.fullName || '', // Backend returns 'name'
            email: res.data.doctor.email || '',
            dateOfBirth: res.data.doctor.dob || res.data.doctor.dateOfBirth || '', // Backend returns 'dob'
            gender: res.data.doctor.gender || '',
            phoneNumber: res.data.doctor.phone || res.data.doctor.phoneNumber || '', // Backend returns 'phone'
            address: res.data.doctor.address || '',
            licenseNumber: res.data.doctor.licenseNumber || '',
            bloodGroup: res.data.doctor.bloodGroup || '',
            specialization: res.data.doctor.specialization || '',
            qualification: res.data.doctor.qualification || '',
            yearsOfExperience: res.data.doctor.yearsOfExperience || '',
            affiliation: res.data.doctor.affiliation || '',
            consultationStart: weekdaySchedule ? convertTo12Hour(weekdaySchedule.start) : '',
            consultationEnd: weekdaySchedule ? convertTo12Hour(weekdaySchedule.end) : ''
          });
          console.log('Form data set:', formData); // Debug log
        } else {
          setError("Failed to load doctor data");
        }
      } catch (error) {
        console.log('Error fetching doctor data:', error.response?.data || error.message);
        setError("Failed to load doctor data");
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

  const handleDegreeChange = (e) => {
    const file = e.target.files[0];
    console.log("Degree certificate selected:", file);
    if (file) {
      console.log("File details:", {
        name: file.name,
        size: file.size,
        type: file.type
      });
      setDegreeCertificate(file);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      // Validate required fields
      if (!formData.fullName || !formData.specialization) {
        setError("Full Name and Specialization are required");
        return;
      }

      // Validate consultation hours format
      if (formData.consultationStart && formData.consultationEnd) {
        const timeFormat = /(\d{1,2}):?(\d{2})?\s*(am|pm)/i;
        if (!timeFormat.test(formData.consultationStart) || !timeFormat.test(formData.consultationEnd)) {
          setError("Please enter consultation hours in the correct format (e.g., 9:00 AM)");
          return;
        }
      }

      const formDataToSend = new FormData();

      // Create consultation hours array for weekdays
      const consultationHours = [];
      if (formData.consultationStart && formData.consultationEnd) {
        const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
        weekdays.forEach(day => {
          consultationHours.push({
            day,
            start: convertTo24Hour(formData.consultationStart),
            end: convertTo24Hour(formData.consultationEnd),
            slotMinutes: 30,
            isClosed: false
          });
        });
      }

      // Map frontend fields to backend fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "consultationStart" || key === "consultationEnd") {
          // Skip these as we handle them separately
          return;
        } else if (value !== null && value !== undefined && value !== '') {
          formDataToSend.append(key, value);
        }
      });

      // Add consultation hours
      if (consultationHours.length > 0) {
        formDataToSend.append("consultationHours", JSON.stringify(consultationHours));
      }

      if (profileImage) {
        formDataToSend.append("profileImage", profileImage);
        console.log("Profile image added to FormData:", profileImage.name, profileImage.size);
      }

      if (degreeCertificate) {
        formDataToSend.append("degreeCertificate", degreeCertificate);
        console.log("Degree certificate added to FormData:", degreeCertificate.name, degreeCertificate.size);
      }

      // Debug: Log what's being sent
      console.log('FormData being sent:');
      for (let [key, value] of formDataToSend.entries()) {
        console.log(key, ':', value);
      }

      const res = await API.put('/users/update-doctor', formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log('Backend response:', res.data);

      if (res.data.success) {
        setUserData(res.data.doctor);
        setEditing(false);
        setProfileImage(null);
        setDegreeCertificate(null);
        setSuccess("Profile updated successfully!");
        
        // Refresh user data
        const refreshRes = await API.get('/users/get-doctor');
        if (refreshRes.data.success) {
          setUserData(refreshRes.data.doctor);
        }
      } else {
        setError(res.data.message || "Failed to update profile");
      }
    } catch (error) {
      console.log('Error updating doctor data:', error.response?.data || error.message);
      console.log('Full error object:', error);
      setError(error.response?.data?.error || error.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setProfileImage(null);
    setDegreeCertificate(null);
    setError("");
    setSuccess("");
    // Reset form data to original values
    if (userData) {
      const consultationHours = userData.consultationHours || [];
      const weekdaySchedule = consultationHours.find(schedule => 
        ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(schedule.day)
      );
      
      setFormData({
        fullName: userData.name || userData.fullName || '', // Backend returns 'name'
        email: userData.email || '',
        dateOfBirth: userData.dob || userData.dateOfBirth || '', // Backend returns 'dob'
        gender: userData.gender || '',
        phoneNumber: userData.phone || userData.phoneNumber || '', // Backend returns 'phone'
        address: userData.address || '',
        licenseNumber: userData.licenseNumber || '',
        bloodGroup: userData.bloodGroup || '',
        specialization: userData.specialization || '',
        qualification: userData.qualification || '',
        yearsOfExperience: userData.yearsOfExperience || '',
        affiliation: userData.affiliation || '',
        consultationStart: weekdaySchedule ? convertTo12Hour(weekdaySchedule.start) : '',
        consultationEnd: weekdaySchedule ? convertTo12Hour(weekdaySchedule.end) : ''
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
        <p className="text-red-500">{error || "Failed to load doctor data"}</p>
      </div>
    );
  }

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
          src={userData?.profileImage || "/imgs/default-doctor.jpg"}
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
              <p className="text-gray-700">{userData?.name || userData?.fullName}</p>
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
                name="dateOfBirth"
                value={formData?.dateOfBirth?.split("T")[0] || ""}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            ) : (
              <p className="text-gray-700">{userData?.dob || userData?.dateOfBirth}</p>
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
                <option value="other">Other</option>
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

          {/* Blood Group */}
          <div>
            <label className="font-semibold">Blood Group:</label>
            {editing ? (
              <input
                type="text"
                name="bloodGroup"
                value={formData?.bloodGroup || ""}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            ) : (
              <p className="text-gray-700">{userData?.bloodGroup}</p>
            )}
          </div>

          {/* Specialization */}
          <div>
            <label className="font-semibold">Specialization: *</label>
            {editing ? (
              <input
                type="text"
                name="specialization"
                value={formData?.specialization || ""}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            ) : (
              <p className="text-gray-700">{userData?.specialization}</p>
            )}
          </div>

          {/* Qualification */}
          <div>
            <label className="font-semibold">Qualification:</label>
            {editing ? (
              <input
                type="text"
                name="qualification"
                value={formData?.qualification || ""}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            ) : (
              <p className="text-gray-700">{userData?.qualification}</p>
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
                min="0"
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
          <div className="md:col-span-2">
            <label className="font-semibold">Consultation Hours (Weekdays):</label>
            {editing ? (
              <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  name="consultationStart"
                    value={formData?.consultationStart || ""}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                    placeholder="Start e.g. 9:00 AM"
                />
                <input
                  type="text"
                  name="consultationEnd"
                    value={formData?.consultationEnd || ""}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                    placeholder="End e.g. 5:00 PM"
                />
                </div>
                <p className="text-xs text-gray-600">
                  💡 Format: 9:00 AM, 2:30 PM, 10am, 6pm (applies to all weekdays Mon-Fri)
                </p>
              </div>
            ) : (
              <div>
              <p className="text-gray-700">
                  {formatConsultationHours(userData?.consultationHours)}
                </p>
                {(!userData?.consultationHours || !Array.isArray(userData?.consultationHours) || userData?.consultationHours.length === 0) && (
                  <p className="text-sm text-orange-600 mt-1">
                    ⚠️ Consultation hours not set. Please edit your profile to set your working hours.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Degree Certificate */}
          <div className="md:col-span-2">
            <label className="font-semibold">Medical Degree Certificate:</label>
            {editing ? (
              <div>
                <input 
                  type="file" 
                  name="degreeCertificate" 
                  onChange={handleDegreeChange} 
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {degreeCertificate && (
                  <p className="text-sm text-green-600 mt-1">
                    ✓ Selected: {degreeCertificate.name} ({(degreeCertificate.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
              </div>
            ) : userData?.degreeCertificate ? (
              <a
                href={userData.degreeCertificate}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View Certificate
              </a>
            ) : (
              <p className="text-gray-700">Not Uploaded</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
