// import { exec } from "child_process";

// export default function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   const { walletAddress } = req.body;

//   if (!walletAddress) {
//     return res.status(400).json({ error: "Wallet address is required" });
//   }

//   // Replace this with the actual CLI command
//   const command = `reputation-cli dry-run ${walletAddress}`;

//   exec(command, (error, stdout, stderr) => {
//     if (error) {
//       console.error("Error executing command:", error);
//       return res.status(500).json({ error: stderr || "Failed to run CLI command." });
//     }

//     res.status(200).json({ output: stdout });
//   });
// }

// import { NextApiRequest, NextApiResponse } from "next";
// import { exec } from "child_process";

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   const { walletAddress } = req.body;

//   if (!walletAddress || typeof walletAddress !== "string") {
//     return res.status(400).json({ error: "Wallet address is required and must be a string." });
//   }

//   const command = `reputation-cli dry-run ${walletAddress}`;

//   exec(command, (error, stdout, stderr) => {
//     if (error) {
//       console.error("Error executing command:", error);
//       return res.status(500).json({ error: stderr || "Failed to run CLI command." });
//     }

//     res.status(200).json({ output: stdout });
//   });
// }


import { NextApiRequest, NextApiResponse } from "next";
import { exec } from "child_process";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Ensure the request method is POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Extract the wallet address from the request body
  const { walletAddress } = req.body;

  // Validate the wallet address
  if (!walletAddress || typeof walletAddress !== "string") {
    return res.status(400).json({ error: "Wallet address is required and must be a string." });
  }

  // Run the reputation-cli command with the provided wallet address
  const command = `reputation-cli dry-run ${walletAddress}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("Error executing command:", error);
      return res.status(500).json({ error: stderr || "Failed to run CLI command." });
    }

    // Return the output of the CLI command to the frontend
    res.status(200).json({ output: stdout });
  });
}
