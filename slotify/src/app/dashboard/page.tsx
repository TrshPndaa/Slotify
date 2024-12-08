"use client";

import { useState } from "react";
import { FaHome, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
}

interface BusinessInfo {
  name: string;
  description: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    font: string;
  };
  paymentInfo: {
    accountHolder: string;
    accountNumber: string;
    routingNumber: string;
  };
}

export default function Dashboard() {
  const [services, setServices] = useState<Service[]>([]);
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    name: "Your Business Name",
    description: "Your business description",
    theme: {
      primaryColor: "#EC4899", // pink-600
      secondaryColor: "#F9A8D4", // pink-300
      font: "Inter"
    },
    paymentInfo: {
      accountHolder: "",
      accountNumber: "",
      routingNumber: ""
    }
  });
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [newService, setNewService] = useState<Partial<Service>>({});

  const handleAddService = () => {
    if (!newService.title || !newService.price) return;
    
    setServices([...services, {
      id: Math.random().toString(36).substr(2, 9),
      title: newService.title,
      description: newService.description || "",
      price: Number(newService.price)
    }]);
    setNewService({});
  };

  const handleDeleteService = (id: string) => {
    setServices(services.filter(service => service.id !== id));
  };

  const handleInfoUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingInfo(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Home Button */}
      <div className="fixed top-4 left-4 z-50">
        <Link 
          href="/"
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors text-gray-700"
        >
          <FaArrowLeft size={14} />
          <FaHome size={18} />
          <span>Home</span>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          {isEditingInfo ? (
            <form onSubmit={handleInfoUpdate} className="space-y-4">
              <div>
                <label className="text-black block text-sm font-medium text-gray-700">Business Name</label>
                <input
                  type="text"
                  value={businessInfo.name}
                  onChange={e => setBusinessInfo({...businessInfo, name: e.target.value})}
                  className="mt-1 text-black block w-full rounded-md border border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 px-4 py-2"
                />
              </div>
              <div>
                <label className="text-black block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={businessInfo.description}
                  onChange={e => setBusinessInfo({...businessInfo, description: e.target.value})}
                  className="mt-1 text-black block w-full rounded-md border border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 px-4 py-2"
                  rows={3}
                />
              </div>
              <div>
                <h3 className="text-black text-lg font-medium mb-4">Payment Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-black block text-sm font-medium text-gray-700">Account Holder Name</label>
                    <input
                      type="text"
                      value={businessInfo.paymentInfo.accountHolder}
                      onChange={e => setBusinessInfo({
                        ...businessInfo,
                        paymentInfo: {...businessInfo.paymentInfo, accountHolder: e.target.value}
                      })}
                      className="mt-1 text-black block w-full rounded-md border border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="text-black block text-sm font-medium text-gray-700">Account Number</label>
                    <input
                      type="text"
                      value={businessInfo.paymentInfo.accountNumber}
                      onChange={e => setBusinessInfo({
                        ...businessInfo,
                        paymentInfo: {...businessInfo.paymentInfo, accountNumber: e.target.value}
                      })}
                      className="mt-1 text-black block w-full rounded-md border border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="text-black block text-sm font-medium text-gray-700">Routing Number</label>
                    <input
                      type="text"
                      value={businessInfo.paymentInfo.routingNumber}
                      onChange={e => setBusinessInfo({
                        ...businessInfo,
                        paymentInfo: {...businessInfo.paymentInfo, routingNumber: e.target.value}
                      })}
                      className="mt-1 text-black block w-full rounded-md border border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 px-4 py-2"
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingInfo(false)}
                  className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{businessInfo.name}</h1>
                  <p className="mt-2 text-gray-600">{businessInfo.description}</p>
                  {businessInfo.paymentInfo.accountHolder && (
                    <p className="mt-2 text-gray-600">Payment Account: {businessInfo.paymentInfo.accountHolder}</p>
                  )}
                </div>
                <button
                  onClick={() => setIsEditingInfo(true)}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700"
                >
                  Edit Business Info
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Services</h2>
          
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Service</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <input
                type="text"
                placeholder="Service Title"
                value={newService.title || ""}
                onChange={e => setNewService({...newService, title: e.target.value})}
                className="text-black rounded-md border border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 px-4 py-2"
              />
              <input
                type="number"
                placeholder="Price"
                value={newService.price || ""}
                onChange={e => setNewService({...newService, price: Number(e.target.value)})}
                className="text-black rounded-md border border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 px-4 py-2"
              />
              <textarea
                placeholder="Description"
                value={newService.description || ""}
                onChange={e => setNewService({...newService, description: e.target.value})}
                className="text-black rounded-md border border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 px-4 py-2"
              />
            </div>
            <button
              onClick={handleAddService}
              className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700"
            >
              Add Service
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(service => (
              <div key={service.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-gray-900">{service.title}</h3>
                  <button
                    onClick={() => handleDeleteService(service.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
                <p className="mt-2 text-gray-600">{service.description}</p>
                <p className="mt-2 text-lg font-semibold text-gray-900">£{service.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
