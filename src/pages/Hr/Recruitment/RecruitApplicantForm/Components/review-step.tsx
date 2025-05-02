import React from 'react';
import axiosInstance from '@/lib/axios';
import { useNavigate, useParams } from 'react-router-dom';

const ReviewStep = ({formData, onSubmit}) => {
  console.log(formData.GeneralInformation)

  // const {id} = useParams()
  // const navigate = useNavigate()

  // const flatData = {
  //   ...formData.personalDetails,
  //   ...formData.contact,
  //   ...formData.demography

  // };

  // flatData.vacancyId = id

  // const handleSubmit =  async() =>{
  //   flatData.status = "applied"
  //   const response = await axiosInstance.post(`/hr/applicant`, flatData);
  //   console.log(response)
  //   navigate(``)
  // }
  return (
    <div>
      <div className="w-full mx-auto px-6 py-10 bg-white shadow-lg rounded-xl space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Review Application</h1>

      {/* Profile Picture */}
      <div className="flex items-center gap-4">
        <img
          src="#" // profilePictureUrl
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border"
        />
        <div className="text-gray-700 text-lg font-semibold">[Full Name]</div>
      </div>

      {/* Personal Details */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Personal Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          {/* <p>Title: <span className="font-medium">{formData.GeneralInformation}</span></p> */}
          <p>Name: <span className="font-medium">[firstName initial lastName]</span></p>
          <p>Date of Birth: <span className="font-medium">[dateOfBirth]</span></p>
          <p>NI Number: <span className="font-medium">[nationalInsuranceNumber]</span></p>
          <p>NHS Number: <span className="font-medium">[nhsNumber]</span></p>
        </div>
      </section>

      {/* Application Details */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Application Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <p>Applied On: <span className="font-medium">[applicationDate]</span></p>
          <p>Available From: <span className="font-medium">[availableFromDate]</span></p>
          <p>Employment Type: <span className="font-medium">[employmentType]</span></p>
          <p>Position: <span className="font-medium">[position]</span></p>
          <p>Source: <span className="font-medium">[source]</span></p>
          <p>Branch: <span className="font-medium">[branch]</span></p>
        </div>
      </section>

      {/* Contact Information */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <p>Email: <span className="font-medium">[email]</span></p>
          <p>Mobile Phone: <span className="font-medium">[mobilePhone]</span></p>
          <p>Home Phone: <span className="font-medium">[homePhone]</span></p>
          <p>Other Phone: <span className="font-medium">[otherPhone]</span></p>
          <p>Address: <span className="font-medium">[address], [cityOrTown], [stateOrProvince], [postCode], [country]</span></p>
        </div>
      </section>

      {/* Demographic Information */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Demographic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <p>Gender: <span className="font-medium">[gender]</span></p>
          <p>Marital Status: <span className="font-medium">[maritalStatus]</span></p>
          <p>Ethnic Origin: <span className="font-medium">[ethnicOrigin]</span></p>
        </div>
      </section>

      {/* Disability Information */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Disability Information</h2>
        <div className="space-y-2 text-gray-700">
          <p>Has Disability: <span className="font-medium">[Yes/No]</span></p>
          <p>Details: <span className="font-medium">[disabilityDetails]</span></p>
          <p>Needs Adjustment: <span className="font-medium">[Yes/No]</span></p>
          <p>Adjustment Details: <span className="font-medium">[reasonableAdjustmentDetails]</span></p>
        </div>
      </section>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-6">
        <button className="px-4 py-2 border border-supperagent text-supperagent rounded-md hover:bg-gray-100">
          Back
        </button>
        <button onClick={onSubmit} className="px-4 py-2 bg-supperagent text-white rounded-md hover:bg-purple-700">
          Submit
        </button>
      </div>
    </div>
  

    </div>
  );
};

export default ReviewStep;