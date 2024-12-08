import { useState } from "react";
import { getTrueNetworkInstance } from "../../true-network/true.config";


export default function Attestation() {
  const [formData, setFormData] = useState({
    schemaType: "skill",
    proficiencyLevel: "",
    hoursLearned: "",
    no_of_publications: "",
    most_published_year: "",
    no_of_collaborators: "",
    fundRaised: "",
    users: "",
    walletAddress: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const api = await getTrueNetworkInstance();
    const { schemaType, walletAddress, ...inputData } = formData;

    const schemaMap = {
      skill: skillSchema,
      trust: trustSchema,
      empower: empowerSchema,
    };

    const schema = schemaMap[schemaType];

    try {
      const output = await schema.attest(api, walletAddress, inputData);
      console.log("Attestation successful:", output);
      alert("Attestation submitted successfully!");
    } catch (err) {
      console.error("Error attesting:", err);
      alert("Failed to submit attestation.");
    } finally {
      await api.network.disconnect();
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Submit Attestation</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label>
          Schema Type:
          <select name="schemaType" value={formData.schemaType} onChange={handleChange}>
            <option value="skill">Skill</option>
            <option value="trust">Trust</option>
            <option value="empower">Empower</option>
          </select>
        </label>
        <label>
          Wallet Address:
          <input type="text" name="walletAddress" value={formData.walletAddress} onChange={handleChange} required />
        </label>
        {/* Conditionally Render Input Fields */}
        {formData.schemaType === "skill" && (
          <>
            <label>
              Proficiency Level:
              <input type="number" name="proficiencyLevel" value={formData.proficiencyLevel} onChange={handleChange} required />
            </label>
            <label>
              Hours Learned:
              <input type="number" name="hoursLearned" value={formData.hoursLearned} onChange={handleChange} required />
            </label>
          </>
        )}
        {formData.schemaType === "trust" && (
          <>
            <label>
              No. of Publications:
              <input type="number" name="no_of_publications" value={formData.no_of_publications} onChange={handleChange} required />
            </label>
            <label>
              Most Published Year:
              <input type="number" name="most_published_year" value={formData.most_published_year} onChange={handleChange} required />
            </label>
            <label>
              No. of Collaborators:
              <input type="number" name="no_of_collaborators" value={formData.no_of_collaborators} onChange={handleChange} required />
            </label>
          </>
        )}
        {formData.schemaType === "empower" && (
          <>
            <label>
              Fund Raised:
              <input type="number" name="fundRaised" value={formData.fundRaised} onChange={handleChange} required />
            </label>
            <label>
              Users:
              <input type="number" name="users" value={formData.users} onChange={handleChange} required />
            </label>
          </>
        )}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit Attestation
        </button>
      </form>
    </div>
  );
}
