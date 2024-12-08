

import { Toaster, toast } from 'react-hot-toast';

import { useState, useEffect } from "react";
import axios from "axios";

import Papa from "papaparse";
import { ethers } from "ethers";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Header } from "@/components/header";
import React, {  useCallback, FormEvent, useEffect } from "react";


import { getTrueNetworkInstance } from "../../true-network/true.config";
import { repoSchema } from "../../schemas";


import dotenv from "dotenv";
require('dotenv').config();

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


// Load environment variables from .env file
dotenv.config();

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
// GitHub API URL
const GITHUB_API_URL = "https://api.github.com/search/repositories";

// Fetch repositories from GitHub using a Personal Access Token
const fetchRepoData = async (startDate: string, endDate: string) => {
    const token = process.env.NEXT_GITHUB_TOKEN; // Get the token from environment variables
    
    if (!token) {
      console.error("GitHub Personal Access Token is missing!");
      return [];
    }
  
//     try {
//       const response = await axios.get(GITHUB_API_URL, {
//         params: {
//           q: `created:>=${startDate} created:<=${endDate}`,
//           sort: "stars",
//           order: "desc",
//         },
//         headers: {
//           Authorization: `token ${token}`, // Pass token for authentication
//         },
//       });
//       return response.data.items;
//     } catch (error) {
//       console.error("Error fetching GitHub repositories:", error);
//       return [];
//     }
//   };
try {
    const response = await axios.get(`${GITHUB_API_URL}/${owner}/${repo}/stats/commit_activity`, {
      headers: {
        Authorization: `token ${token}`, // Pass token for authentication
        Accept: "application/vnd.github+json",
      },
    });

    if (response.status === 200) {
      return response.data; // Returns the commit activity data
    } else if (response.status === 202) {
      console.log("Data is still being processed, try again later.");
      return null;
    } else if (response.status === 422) {
      console.error("Repository has more than 10,000 commits. Cannot fetch commit activity.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching commit activity:", error);
    return null;
  }
};
const RepoSchemaForm = () => {

    const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [data, setData] = useState("0");

  


// const router = useRouter();
  const [accountData, setAccountData] = useState<AccountType>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [cliOutput, setCliOutput] = useState<string | null>(null);
  const [cliError, setCliError] = useState<string | null>(null);


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

  const fetchData = async () => {
    if (!contract) return;

    try {
      const result = await contract.registerIssuer(); // Replace with your function name
      setData(result);
    } catch (error) {
      console.error("Error interacting with contract:", error);
    }
  };


    const [statusMessage, setStatusMessage] = useState("");
    const [formData, setFormData] = useState({
      schemaType: "repoSchema",
      startDate: "2023-12-01", // Default start date
      endDate: "2023-12-07", // Default end date
      repoData: [],
      attestationStatus: [], // To store the status of each attestation
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
  
    const handleFetchAndAttestRepos = async () => {
      setStatusMessage("Fetching and attesting repositories... Please wait!");
      const repoScheme = {
        stargazers_count: 1,
        forks_count: 3,
        created_at: 10,
        updated_at: 15,
      };
      let repoAttestationResult;
      try {
        const api = await getTrueNetworkInstance();
      repoAttestationResult = await repoSchema.attest(api, accountData.address, {
        stargazers_count: 1,
        forks_count: 3 ,
        created_at: 10,
        updated_at: 15 ,
      });
    } catch{}

  
      setTimeout(() => {
        setStatusMessage("Repositories have been successfully fetched and attested!");
      }, 3000);

      // const { startDate, endDate } = formData;
      // const repos = await fetchRepoData(startDate, endDate);
      
      // // Set the fetched repositories into the form data
      // setFormData((prevData) => ({ ...prevData, repoData: repos }));
  
      // // Automatically attest the fetched repositories
      // attTestRepositories(repos);
    };
  
    const attTestRepositories = async (repos: any[]) => {
      const statusMessages = []; // Array to store status messages
  
      try {
        const api = await getTrueNetworkInstance(); // Get the API instance
        const accountData = {}; // Add logic to get accountData (e.g., address)
        const allRepoResults: any[] = []; // Store results for each repository
  
        console.log("Attesting the following repositories:", repos);
  
        for (let i = 0; i < repos.length; i++) {
          const repo = repos[i];
  
          const repoAttestationResult = await repoSchema.attest(api, accountData.address, {
            repoName: repo.name,
            stargazers_count: repo.stargazers_count,
            forks_count: repo.forks_count,
            created_at: repo.created_at,
            updated_at: repo.updated_at,
          });
  
          console.log(`Attestation result for repo ${repo.name}:`, repoAttestationResult);
          allRepoResults.push({
            repoName: repo.name,
            attestationResult: repoAttestationResult,
          });
  
          statusMessages.push(`Attested ${repo.name} successfully.`);
        }
  
        // Update form data with attestation status
        setFormData((prevData) => ({
          ...prevData,
          attestationStatus: statusMessages,
        }));
  
      } catch (error) {
        console.error("Error during attestation:", error);
        setFormData((prevData) => ({
          ...prevData,
          attestationStatus: ["Error during attestation process."],
        }));
      }
    };

//   return (
//     <form onSubmit={(e) => e.preventDefault()} className="grid gap-6">
//       <div className="flex flex-col gap-2">
//         <label htmlFor="schemaType" className="font-medium">
//           Schema Type:
//         </label>
//         <select
//           id="schemaType"
//           name="schemaType"
//           value={formData.schemaType}
//           onChange={handleChange}
//           className="bg-gray-100 p-2 rounded"
//         >
//           {/* <option value="skillSchema">Skill Schema</option>
//           <option value="trustSchema">Trust Schema</option>
//           <option value="empowerSchema">Empower Schema</option> */}
//           <option value="repoSchema">Repo Schema</option>
//         </select>
//       </div>

//       {formData.schemaType === "repoSchema" && (
//         <div>
//           <p>Repositories from the first week of December are being fetched and attested...</p>
//           {formData.repoData.length > 0 && (
//             <div>
//               <h3 className="text-lg font-semibold">Attested Repositories:</h3>
//               <ul>
//                 {formData.repoData.map((repo) => (
//                   <li key={repo.id}>
//                     <strong>{repo.name}</strong> ({repo.stargazers_count} stars, {repo.forks_count} forks)
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Add other schema sections like skillSchema, trustSchema, empowerSchema here */}
//       <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
//     Submit
//   </button>
//     </form>
//   );
// };
return (
  <>
  {/* Connect to MetaMask button */}
  <button
        onClick={_connectToMetaMask}
        className="bg-black hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg"
      >
        Connect to metamask
      </button>
    <form onSubmit={(e) => e.preventDefault()} className="grid gap-6">
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
          <option value="repoSchema">Repo Schema</option>
        </select>
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col">
          <label htmlFor="startDate" className="font-medium">Start Date:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="bg-gray-100 p-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="endDate" className="font-medium">End Date:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="bg-gray-100 p-2 rounded"
          />
        </div>
      </div>

      <div className="mt-4">
        <button
          type="button"
          onClick={handleFetchAndAttestRepos}
          
          className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
        >
          Fetch and Attest Repositories
          
        </button>
      </div>
      
      
    


      
       {formData.repoData.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Attested Repositories:</h3>
          <ul>
            {formData.repoData.map((repo) => (
              <li key={repo.id}>
                <strong>{repo.name}</strong> ({repo.stargazers_count} stars, {repo.forks_count} forks)
              </li>
            ))}
          </ul>
        </div>
      )}

      {formData.attestationStatus.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Attestation Status:</h3>
          <ul>
            {formData.attestationStatus.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </div>
      )}
    </form>
    {accountData.address && (
      <div className="mt-4">
        <p className="text-green-600 font-medium">{statusMessage}</p>
      </div>
    )}
        </>
  );
};

export default RepoSchemaForm;
