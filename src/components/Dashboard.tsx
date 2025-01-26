import React, { useState, useEffect } from 'react';
import { Shield, Calendar, DollarSign, User, FileText, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers/store';

interface Witness {
  name: string;
  cnic: string;
  phoneNumber: string;
  email: string;
  _id: string;
}

interface LoanApplication {
  _id: string;
  user: string;
  category: string;
  subcategory: string;
  loanAmount: number;
  loanPeriod: number;
  initialDeposit: number;
  witnesses1: Witness[];
  witnesses2: Witness[];
  status: string;
  tokenNumber: string;
  createdAt: string;
}

function App() {
  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<LoanApplication | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const navigate =  useNavigate()
  const auth = useSelector((state: RootState)  => state.auth)
  useEffect(() => {
    if (auth.user?.isAdmin) {
      navigate('/admin/login');
    }
  }, [auth, navigate]);
  useEffect(() => {
    fetchApplications();
  }, []);
  const AdminID = localStorage.getItem("AdminID")

  const fetchApplications = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/application/getAllApplication');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      
      if (result.success) {
        setApplications(result.data);
      } else {
        setError(result.message || 'Failed to fetch applications');
      }
    } catch (err) {
      setError('Error connecting to server. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string, userId: string) => {
    try {
      setProcessing(true);
      const response = await fetch('http://localhost:8000/api/v1/application/loanApprove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: AdminID,
          status: 'APPROVED',
          loadApplicationId: id,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to approve loan');
      }

      const result = await response.json();
      
      if (result.success) {
        // Update the local state to reflect the change
        setApplications(prevApplications =>
          prevApplications.map(app =>
            app._id === id ? { ...app, status: 'APPROVED' } : app
          )
        );
        if (selectedApplication) {
          setSelectedApplication({ ...selectedApplication, status: 'APPROVED' });
        }
        alert('Loan application approved successfully');
      } else {
        throw new Error(result.message || 'Failed to approve loan');
      }
    } catch (err) {
      console.error('Error approving application:', err);
      alert('Failed to approve loan application. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async (id: string, userId: string) => {
    try {
      setProcessing(true);
      const response = await fetch('http://localhost:8000/api/v1/application/loanApprove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: AdminID,
          status: 'REJECTED',
          loadApplicationId: id,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to reject loan');
      }

      const result = await response.json();
      
      if (result.success) {
        // Update the local state to reflect the change
        setApplications(prevApplications =>
          prevApplications.map(app =>
            app._id === id ? { ...app, status: 'REJECTED' } : app
          )
        );
        if (selectedApplication) {
          setSelectedApplication({ ...selectedApplication, status: 'REJECTED' });
        }
        alert('Loan application rejected successfully');
      } else {
        throw new Error(result.message || 'Failed to reject loan');
      }
    } catch (err) {
      console.error('Error rejecting application:', err);
      alert('Failed to reject loan application. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (err) {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500 text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p className="mb-4">{error}</p>
          <button 
            onClick={() => {
              setError(null);
              setLoading(true);
              fetchApplications();
            }}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (selectedApplication) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <button 
            onClick={() => setSelectedApplication(null)}
            className="flex items-center text-green-600 hover:text-green-700 mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Applications
          </button>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Loan Application Details
                </h1>
                <p className="text-gray-600">Token: {selectedApplication.tokenNumber}</p>
              </div>
              <div className="flex space-x-4">
                {selectedApplication.status === 'PENDING' && (
                  <>
                    <button
                      onClick={() => handleApprove(selectedApplication._id, selectedApplication.user)}
                      disabled={processing}
                      className={`flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors ${
                        processing ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <CheckCircle className="w-5 h-5 mr-2" />
                      {processing ? 'Processing...' : 'Approve'}
                    </button>
                    <button
                      onClick={() => handleReject(selectedApplication._id, selectedApplication.user)}
                      disabled={processing}
                      className={`flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors ${
                        processing ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <XCircle className="w-5 h-5 mr-2" />
                      {processing ? 'Processing...' : 'Reject'}
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Loan Details</h2>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <DollarSign className="w-5 h-5 text-green-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">Loan Amount</p>
                        <p className="font-semibold">₹{selectedApplication.loanAmount.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-green-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">Loan Period</p>
                        <p className="font-semibold">{selectedApplication.loanPeriod} {selectedApplication.loanPeriod === 1 ? 'Year' : 'Years'}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-green-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">Category</p>
                        <p className="font-semibold">{selectedApplication.category} - {selectedApplication.subcategory}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">First Witness</h2>
                  {selectedApplication.witnesses1.map((witness) => (
                    <div key={witness._id} className="space-y-3">
                      <div className="flex items-center">
                        <User className="w-5 h-5 text-green-600 mr-3" />
                        <div>
                          <p className="text-sm text-gray-600">Name</p>
                          <p className="font-semibold">{witness.name}</p>
                        </div>
                      </div>
                      <div className="ml-8">
                        <p className="text-sm text-gray-600">CNIC: {witness.cnic}</p>
                        <p className="text-sm text-gray-600">Phone: {witness.phoneNumber}</p>
                        <p className="text-sm text-gray-600">Email: {witness.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Application Status</h2>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className={`px-4 py-2 rounded-full ${
                        selectedApplication.status === 'PENDING' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : selectedApplication.status === 'APPROVED'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {selectedApplication.status}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Submission Date</p>
                      <p className="font-semibold">{formatDate(selectedApplication.createdAt)}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Second Witness</h2>
                  {selectedApplication.witnesses2.map((witness) => (
                    <div key={witness._id} className="space-y-3">
                      <div className="flex items-center">
                        <User className="w-5 h-5 text-green-600 mr-3" />
                        <div>
                          <p className="text-sm text-gray-600">Name</p>
                          <p className="font-semibold">{witness.name}</p>
                        </div>
                      </div>
                      <div className="ml-8">
                        <p className="text-sm text-gray-600">CNIC: {witness.cnic}</p>
                        <p className="text-sm text-gray-600">Phone: {witness.phoneNumber}</p>
                        <p className="text-sm text-gray-600">Email: {witness.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Loan Applications</h1>
            <p className="text-gray-600 mt-2">Manage and review loan applications</p>
          </div>
        </div>

        {applications.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-gray-600">No loan applications found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((application) => (
              <div
                key={application._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => setSelectedApplication(application)}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Token Number</p>
                      <p className="font-semibold">{application.tokenNumber}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm ${
                      application.status === 'PENDING' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : application.status === 'APPROVED'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {application.status}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <DollarSign className="w-5 h-5 text-green-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">Loan Amount</p>
                        <p className="font-semibold">₹{application.loanAmount.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-green-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">Category</p>
                        <p className="font-semibold">{application.category}</p>
                        <p className="text-sm text-gray-500">{application.subcategory}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-green-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">Application Date</p>
                        <p className="font-semibold">{formatDate(application.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <User className="w-5 h-5 text-green-600 mr-2" />
                      <p className="text-sm text-gray-600">
                        {application.witnesses1[0]?.name} & {application.witnesses2[0]?.name}
                      </p>
                    </div>
                    <p className="text-sm text-green-600 font-medium">View Details →</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;