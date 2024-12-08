
import Papa from "papaparse";
import { ethers } from "ethers";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Header } from "@/components/header";
import React, { useState, useCallback, FormEvent, useEffect } from "react";

import { toast } from 'react-hot-toast';
import { ChevronDown, Upload, FileText, Wallet, UserPlus, Award, Database } from 'lucide-react';

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';



import dotenv from "dotenv";
require('dotenv').config();



// Load environment variables from .env file
dotenv.config();



import { Toaster, toast } from 'react-hot-toast';

import contractABI from "../contracts/MyContract.json";

import { getTrueNetworkInstance } from "../../true-network/true.config";
import { skillSchema, trustSchema, empowerSchema, repoSchema } from "../../schemas";
import { useRouter } from "next/router";
const inter = Inter({ subsets: ["latin"] });


// GitHub API URL
const GITHUB_API_URL = "https://api.github.com/search/repositories";

export interface AccountType {
  address?: string;
  balance?: string;
  chainId?: string;
  network?: string;
}


declare global {
  interface Window {
    ethereum?: any;
  }
}

const BNB_TESTNET_PARAMS = {
  chainId: "0x61",
  chainName: "Binance Smart Chain Testnet",
  nativeCurrency: {
    name: "Binance Coin",
    symbol: "tBNB",
    decimals: 18,
  },
  rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
  blockExplorerUrls: ["https://testnet.bscscan.com"],
};

const AttestationForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [formData, setFormData] = useState({
    schemaType: "skillSchema",
    proficiencyLevel: "0",
    hoursLearned: "0",
    no_of_publications: "0",
    most_published_year: "0",
    no_of_collaborators: "0",
    fundRaised: "0",
    users: "0",
    stargazers_count: "0",
    forks_count: "0",
    created_at: "0",
    updated_at: "0",
  });
  const [showPopup, setShowPopup] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setShowPopup(true);
  };
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>

    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="schemaType" className="font-medium">
          Schema Type:
        </label>
        <select
          id="schemaType"
          name="schemaType"
          value={formData.schemaType}
          onChange={handleChange}
          className="bg-gray-100 p-2 rounded"
        >
          <option value="skillSchema">Skill Schema</option>
          <option value="trustSchema">Trust Schema</option>
          <option value="empowerSchema">Empower Schema</option>
          <option value="repoSchema">Repo Schema</option>
        </select>
      </div>

      {formData.schemaType === "skillSchema" && (
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="proficiencyLevel" className="font-medium">
              Proficiency Level:
            </label>
            <input
              id="proficiencyLevel"
              type="number"
              name="proficiencyLevel"
              value={formData.proficiencyLevel}
              onChange={handleChange}
              className="bg-gray-100 p-2 rounded"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="hoursLearned" className="font-medium">
              Hours Learned:
            </label>
            <input
              id="hoursLearned"
              type="number"
              name="hoursLearned"
              value={formData.hoursLearned}
              onChange={handleChange}
              className="bg-gray-100 p-2 rounded"
            />
          </div>
        </div>
      )}

      {formData.schemaType === "trustSchema" && (
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="no_of_publications" className="font-medium">
              Number of Publications:
            </label>
            <input
              id="no_of_publications"
              type="number"
              name="no_of_publications"
              value={formData.no_of_publications}
              onChange={handleChange}
              className="bg-gray-100 p-2 rounded"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="most_published_year" className="font-medium">
              Most Published Year:
            </label>
            <input
              id="most_published_year"
              type="number"
              name="most_published_year"
              value={formData.most_published_year}
              onChange={handleChange}
              className="bg-gray-100 p-2 rounded"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="no_of_collaborators" className="font-medium">
              Number of Collaborators:
            </label>
            <input
              id="no_of_collaborators"
              type="number"
              name="no_of_collaborators"
              value={formData.no_of_collaborators}
              onChange={handleChange}
              className="bg-gray-100 p-2 rounded"
            />
          </div>
        </div>
      )}

      {formData.schemaType === "empowerSchema" && (
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="fundRaised" className="font-medium">
              Fund Raised:
            </label>
            <input
              id="fundRaised"
              type="number"
              name="fundRaised"
              value={formData.fundRaised}
              onChange={handleChange}
              className="bg-gray-100 p-2 rounded"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="users" className="font-medium">
              Users:
            </label>
            <input
              id="users"
              type="number"
              name="users"
              value={formData.users}
              onChange={handleChange}
              className="bg-gray-100 p-2 rounded"
            />
          </div>
        </div>
      )}
{formData.schemaType === "repoSchema" && (
  <div className="grid grid-cols-2 gap-6">
    <div className="flex flex-col gap-2">
      <label htmlFor="stars" className="font-medium">
        stars:
      </label>
      <input
        id="repostars"
        type="number"
        name="stargazers_count"
        value={formData.stargazers_count}
        onChange={handleChange}
        className="bg-gray-100 p-2 rounded"
      />
    </div>
    <div className="flex flex-col gap-2">
      <label htmlFor="repoforks" className="font-medium">
        forks:
      </label>
      <input
        id="repoforks"
        type="number"
        name="forks_count"
        value={formData.forks_count}
        onChange={handleChange}
        className="bg-gray-100 p-2 rounded"
      />
    </div>
    <div className="flex flex-col gap-2">
      <label htmlFor="repocreated" className="font-medium">
        created:
      </label>
      <input
        id="repocreated_at"
        type="number"
        name="created_at"
        value={formData.created_at}
        onChange={handleChange}
        className="bg-gray-100 p-2 rounded"
      />
    </div>
    <div className="flex flex-col gap-2">
      <label htmlFor="updated" className="font-medium">
        updates:
      </label>
      <input
        id="repoupdated_at"
        type="number"
        name="updated_at"
        value={formData.updated_at}
        onChange={handleChange}
        className="bg-gray-100 p-2 rounded"
      />
    </div>
  </div>
      )}

<button 
        type="submit" 
        className="bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg"
      >
        Submit Attestation 🌟
      </button>
    </form>

    
      {/* <button
        type = "submit bulk"
        className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
      >
        Submit All Attestations 🌟
      </button>
   */}

    {showPopup && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl text-center">
          <h2 className="text-2xl bg-green font-bold mb-4">Attestation Submitted!</h2>
          <p className="mb-4">Your attestation has been successfully submitted.</p>
          <button 
            onClick={closePopup}
            className="bg-black-500 hover:bg-black-15500 text-white font-medium py-2 px-4 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    )}
  </>
  );
};

const Home = () => {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [data, setData] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  

  const fetchData = async () => {
    if (!contract) return;

    try {
      const result = await contract.registerIssuer(); // Replace with your function name
      setData(result);
    } catch (error) {
      console.error("Error interacting with contract:", error);
    }
  };


  const router = useRouter();
  const [accountData, setAccountData] = useState<AccountType>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [cliOutput, setCliOutput] = useState<string | null>(null);
  const [cliError, setCliError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('single');

  const [csvData, setCsvData] = useState<any[]>([]);


  const _connectToMetaMask = useCallback(async () => {
    const ethereum = window.ethereum;

    if (typeof ethereum !== "undefined") {
      try {
        // Switch to BNB Testnet
        await ethereum.request({
          method: "wallet_addEthereumChain",
          params: [BNB_TESTNET_PARAMS],
        });

        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });

        const address = accounts[0];
        console.log("Connected to MetaMask with address: ", address);

        const chainId = await ethereum.request({ method: "eth_chainId" });
        console.log("Connected to chain ID: ", chainId);

        setAccountData({
          address,
          chainId,
          network: "Binance Smart Chain Testnet",
        });
        
        // const userAccount = await address.getAddress();
        // setAccount(userAccount);
        // setProvider(tempProvider);
        // Setup the contract instance
        // const contractInstance = new ethers.Contract(
        //   "0x1FFF8B6DBc364D2D20072bBd49b15C25BD41725a", // Your contract address
        //   contractABI,
        //   address
        // );
        // setContract(contractInstance);
        toast.success('🦊 MetaMask Connected Successfully!', {
          duration: 4000,
          position: 'top-center',
          style: {
            background: '#4CAF50',
            color: 'white',
            fontWeight: 'bold'
          }
        });


    }
      catch (error: any) {
        
        console.error(`Error connecting to MetaMask: ${error.message ?? error}`);
        alert(`Error connecting to MetaMask: ${error.message ?? error}`);
      }
    } else {
      alert("MetaMask is not installed. Please install it to use this app.");
    }
  }, []);
  const _registerUser = async () => {
    if (contract) {
      try {
        const tx = await contract.registerUser(); // Replace with your actual contract method
        await tx.wait();  // Wait for the transaction to be mined
        console.log("User registered successfully!");
      } catch (error) {
        console.error("Error while calling registerUser:", error);
      }
    } else {
      console.log("Contract is not initialized");
    }
  };
  const handleRunReputationCLI = async () => {
    if (!accountData.address) {
      alert("Please connect to MetaMask first.");
      return;
    }

    setLoading(true);
    setCliOutput(null);
    setCliError(null);

    try {
      const response = await fetch("/api/run-reputation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ walletAddress: accountData.address }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setCliError(errorData.error || "Failed to run reputation CLI.");
        return;
      }

      const data = await response.json();
      setCliOutput(data.output);
    } catch (error) {
      console.error("Error running CLI:", error);
      setCliError("Network or server error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleAttestationSubmit = async (data: any) => {
    try {
      const api = await getTrueNetworkInstance();
      let attestationResult;

      if (data.schemaType === "skillSchema") {
        attestationResult = await skillSchema.attest(api, accountData.address, {
          proficiencyLevel: parseInt(data.proficiencyLevel, 10),
          hoursLearned: parseInt(data.hoursLearned, 10),
        });
      } else if (data.schemaType === "trustSchema") {
        attestationResult = await trustSchema.attest(api, accountData.address, {
          no_of_publications: parseInt(data.no_of_publications, 10),
          most_published_year: parseInt(data.most_published_year, 10),
          no_of_collaborators: parseInt(data.no_of_collaborators, 10),
        });
      } else if (data.schemaType === "empowerSchema") {
        attestationResult = await empowerSchema.attest(api, accountData.address, {
          fundRaised: parseInt(data.fundRaised, 10),
          users: parseInt(data.users),
        });
      } else if (data.schemaType === "repoSchema") {
        attestationResult = await repoSchema.attest(api, accountData.address, {
          stargazers_count: parseInt(data.stargazers_count, 10),
          forks_count: parseInt(data.forks_count,10),
          created_at: parseInt(data.created_at, 10),
          updated_at: parseInt(data.updated_at,10),
        });
      }

      console.log("Attestation Result:", attestationResult);
      await api.network.disconnect();
    } catch (error) {
      console.error("Error during attestation:", error);
    }
  };


const handleCsvFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) return;

  Papa.parse(file, {
    header: true, // Parses CSV into an array of objects using the first row as headers
    skipEmptyLines: true,
    complete: (result) => {
      setCsvData(result.data);
      console.log("Parsed CSV Data:", result.data);
    },
    error: (error) => {
      console.error("Error parsing CSV:", error);
    },
  });
};

const handleCsvPaste = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
  const pastedCsv = event.target.value;
  Papa.parse(pastedCsv, {
    header: true,
    skipEmptyLines: true,
    complete: (result) => {
      setCsvData(result.data);
      console.log("Parsed CSV Data (Pasted):", result.data);
    },
    error: (error) => {
      console.error("Error parsing pasted CSV:", error);
    },
  });
};

const handleIndexingData = () => {
  // Example: Create an index using one of the CSV columns, e.g., 'id'
  const indexedData = csvData.reduce((acc, row, index) => {
    acc[index + 1] = row; // You can change this logic based on your indexing needs
    return acc;
  }, {});
  console.log("Indexed Data:", indexedData);
};


const SubmitAllAttestations = ({
  attestations,
  onSubmitAll,
}: {
  attestations: any[];
  onSubmitAll: () => void;
}) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmitAll = () => {
    handleBulkAttestation(); // Pass the logic to handle batch submission
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="mt-8">
      <button
        onClick={handleSubmitAll}
        className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
      >
        Submit All Attestations 🌟
      </button>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center">
            <h2 className="text-2xl font-bold mb-4">All Attestations Submitted!</h2>
            <p className="mb-4">
              {/* {attestations.size} attestations have been successfully */}
              {/* submitted. */}
            </p>
            <button
              onClick={closePopup}
              className="bg-gray-500 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};



const handleBulkAttestation = async () => {
  if (!accountData.address) {
    alert("Please connect to MetaMask first.");
    return;
  }

  if (csvData.length === 0) {
    alert("No data available to attest. Please upload or paste a CSV first.");
    return;
  }

  try {
    const api = await getTrueNetworkInstance();

    for (const row of csvData) {
      let attestationResult;

      switch (row.schemaType) {
        case "skillSchema":
          attestationResult = await skillSchema.attest(api, accountData.address, {
            proficiencyLevel: parseInt(row.proficiencyLevel, 10),
            hoursLearned: parseInt(row.hoursLearned, 10),
          });
          break;

        case "trustSchema":
          attestationResult = await trustSchema.attest(api, accountData.address, {
            no_of_publications: parseInt(row.no_of_publications, 10),
            most_published_year: parseInt(row.most_published_year, 10),
            no_of_collaborators: parseInt(row.no_of_collaborators, 10),
          });
          break;

        case "empowerSchema":
          attestationResult = await empowerSchema.attest(api, accountData.address, {
            fundRaised: parseInt(row.fundRaised, 10),
            users: parseInt(row.users),
          });
          break;
          case "repoSchema":
          attestationResult = await repoSchema.attest(api, accountData.address, {
            stargazers_count: parseInt(row.stargazers_count, 10),
            forks_count: parseInt(row.forks_count, 10),
            created_at: parseInt(row.created_at,10),
            updated_at: parseInt(row.updated_at, 10),

          });
          break;
        default:
          console.warn(`Unknown schema type: ${row.schemaType}`);
          continue;
      }

      console.log(`Attested row:`, row, `Result:`, attestationResult);
    }

    toast.success("All data attested successfully! ✅");
    await api.network.disconnect();
  } catch (error) {
    console.error("Error during bulk attestation:", error);
    toast.error("Error during bulk attestation. Check console for details.");
  }
};

return (
  <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
    {/* Hero Section */}
    <div className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900">Reputome Dashboard</h1>
            <p className="mt-2 text-lg text-gray-600">Manage your blockchain attestations and reputation</p>
          </div>
          <button
            onClick={connectToMetaMask}
            className="flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
          >
            <Wallet className="w-5 h-5 mr-2" />
            {accountData.address ? 'Connected' : 'Connect Wallet'}
          </button>
        </div>
      </div>
    </div>

    {/* Main Content */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* ... Stats cards ... */}
      </div>

      {/* Attestation Form Section */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('single')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'single'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Single Attestation
            </button>
            <button
              onClick={() => setActiveTab('bulk')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'bulk'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Bulk Upload
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'single' ? (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              {/* Single attestation form content */}
            </form>
          ) : (
            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <span className="text-indigo-600 hover:text-indigo-500">Upload a CSV file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept=".csv"
                        onChange={handleCsvFileChange}
                      />
                    </label>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">or drag and drop</p>
                </div>
              </div>

              <textarea
                placeholder="Or paste your CSV data here..."
                rows={6}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                onChange={handleCsvPaste}
              />

              {csvData.length > 0 && (
                <div className="bg-white p-4 rounded-lg shadow-md mt-4">
                  <h3 className="font-medium mb-2">Parsed Data:</h3>
                  <pre className="text-sm text-gray-800 overflow-auto">
                    {JSON.stringify(csvData, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Reputation Score Section */}
      <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Reputation Score</h2>
          <button
            onClick={handleRunReputationCLI}
            disabled={loading}
            className={`px-6 py-3 rounded-lg font-medium text-white transition-colors ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5" />
              <span>{loading ? "Calculating Score..." : "Calculate Reputation Score"}</span>
            </div>
          </button>
        </div>

        {/* Score Display */}
        {cliOutput && (
          <div className="mt-4 bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your Reputation Scores</h3>
            <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono bg-white p-4 rounded border border-gray-200">
              {cliOutput}
            </pre>
          </div>
        )}

        {/* Error Display */}
        {cliError && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>
              {cliError}
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  </div>
);
};
export default Home;