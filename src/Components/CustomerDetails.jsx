// src/Components/CustomerDetails.js

import React from 'react';

const CustomerDetails = ({ customers }) => {
  if (customers.length === 0) {
    return <div>No customers found</div>;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h3 className="text-2xl font-semibold mb-4">Customer Information</h3>
      {customers.map((customer) => (
        <div key={customer.id} className="border-b border-gray-200 mb-6">
          <div className="space-y-2">
            <p><strong>Name:</strong> {customer.first_name} {customer.last_name}</p>
            <p><strong>Email:</strong> {customer.email}</p>
            <p><strong>Phone:</strong> {customer.phone_number}</p>
            <p><strong>Address:</strong> {customer.address}, {customer.city}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerDetails;
