import { useState, useEffect } from "react";
import axios from "axios";



import { getTrueNetworkInstance } from "../../true-network/true.config";
import { repoSchema } from "../../schemas";


import dotenv from "dotenv";
require('dotenv').config();



// Load environment variables from .env file
dotenv.config();
// GitHub API URL
const GITHUB_API_URL = "https://api.github.com/search/repositories";

// Fetch repositories from GitHub using a Personal Access Token
const fetchCommitActivity = async (owner: string, repo: string) => {
    const token = process.env.NEXT_GITHUB_TOKEN; // GitHub token for authentication
  
    if (!token) {
      console.error("GitHub Personal Access Token is missing!");
      return null;
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
//   const RepoSchemaForm = () => {
//     const [formData, setFormData] = useState({
//       schemaType: "repoSchema",
//       startDate: "2023-12-01", // Default start date
//       endDate: "2023-12-07", // Default end date
//       repoData: [],
//       attestationStatus: [], // To store the status of each attestation
//     });
  
//     const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
//       const { name, value } = e.target;
//       setFormData((prevData) => ({ ...prevData, [name]: value }));
//     };
  
//     const handleFetchAndAttestRepos = async () => {
//       const { startDate, endDate } = formData;
//       const repos = await fetchRepoData(startDate, endDate);
  
//       // Set the fetched repositories into the form data
//       setFormData((prevData) => ({ ...prevData, repoData: repos }));
  
//       // Automatically attest the fetched repositories
//       attTestRepositories(repos);
//     };
  
//     const attTestRepositories = async (repos: any[]) => {
//       const statusMessages = []; // Array to store status messages
  
//       try {
//         const api = await getTrueNetworkInstance(); // Get the API instance
//         const accountData = {}; // Add logic to get accountData (e.g., address)
//         const allRepoResults: any[] = []; // Store results for each repository
  
//         console.log("Attesting the following repositories:", repos);
  
//         for (let i = 0; i < repos.length; i++) {
//           const repo = repos[i];
  
//           const repoAttestationResult = await repoSchema.attest(api, accountData.address, {
//             repoName: repo.name,
//             stargazers_count: repo.stargazers_count,
//             forks_count: repo.forks_count,
//             created_at: repo.created_at,
//             updated_at: repo.updated_at,
//           });
  
//           console.log(`Attestation result for repo ${repo.name}:`, repoAttestationResult);
//           allRepoResults.push({
//             repoName: repo.name,
//             attestationResult: repoAttestationResult,
//           });
  
//           statusMessages.push(`Attested ${repo.name} successfully.`);
//         }
  
//         // Update form data with attestation status
//         setFormData((prevData) => ({
//           ...prevData,
//           attestationStatus: statusMessages,
//         }));
  
//       } catch (error) {
//         console.error("Error during attestation:", error);
//         setFormData((prevData) => ({
//           ...prevData,
//           attestationStatus: ["Error during attestation process."],
//         }));
//       }
//     };


// return (
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
//           <option value="repoSchema">Repo Schema</option>
//         </select>
//       </div>

//       <div className="flex gap-4">
//         <div className="flex flex-col">
//           <label htmlFor="startDate" className="font-medium">Start Date:</label>
//           <input
//             type="date"
//             id="startDate"
//             name="startDate"
//             value={formData.startDate}
//             onChange={handleChange}
//             className="bg-gray-100 p-2 rounded"
//           />
//         </div>
//         <div className="flex flex-col">
//           <label htmlFor="endDate" className="font-medium">End Date:</label>
//           <input
//             type="date"
//             id="endDate"
//             name="endDate"
//             value={formData.endDate}
//             onChange={handleChange}
//             className="bg-gray-100 p-2 rounded"
//           />
//         </div>
//       </div>

//       <div className="mt-4">
//         <button
//           type="button"
//           onClick={handleFetchAndAttestRepos}
//           className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
//         >
//           Fetch and Attest Repositories
//         </button>
//       </div>

//       {formData.repoData.length > 0 && (
//         <div className="mt-6">
//           <h3 className="text-lg font-semibold">Attested Repositories:</h3>
//           <ul>
//             {formData.repoData.map((repo) => (
//               <li key={repo.id}>
//                 <strong>{repo.name}</strong> ({repo.stargazers_count} stars, {repo.forks_count} forks)
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {formData.attestationStatus.length > 0 && (
//         <div className="mt-6">
//           <h3 className="text-lg font-semibold">Attestation Status:</h3>
//           <ul>
//             {formData.attestationStatus.map((message, index) => (
//               <li key={index}>{message}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </form>
//   );
// };


const RepoCommitActivity = () => {
    const [repoData, setRepoData] = useState(null);
    const [statusMessage, setStatusMessage] = useState("");
  
    useEffect(() => {
      const owner = "RajasreePonnada"; // Replace with the repository owner's username
      const repo = "ZK"; // Replace with the repository name
  
      const fetchData = async () => {
        setStatusMessage("Fetching weekly commit activity...");
  
        const commitActivity = await fetchCommitActivity(owner, repo);
  
        if (commitActivity) {
          setRepoData(commitActivity);
          setStatusMessage("Commit activity data fetched successfully!");
        } else {
          setStatusMessage("Fetching commit activity.");
          setStatusMessage("Attested!, now find Repuatation Score")
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <div>
        <h1>Repository Commit Activity</h1>
        <p>{statusMessage}</p>
  
        {repoData && (
          <div>
            <h3>Weekly Commit Activity:</h3>
            <ul>
              {repoData.map((weekData: any, index: number) => (
                <li key={index}>
                  Week {index + 1}: Additions: {weekData.additions}, Deletions: {weekData.deletions}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };
  
  export default RepoCommitActivity;
