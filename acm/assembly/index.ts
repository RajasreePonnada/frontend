
// // The Algorithm.
// // This is the space to design your reputation algorithm taking in account 
// // multiple schemas across true network to calculate a reputation score for
// // your users & the community. 

// // This is the starting point, calc function.
// // Algorithm Compute Module (ACM) uses this as starting point to execute
// // your reputation algorithm and expects an i64 as result.
// import { Attestations } from "./attestations";

// export function calc(): i64 {
//   const skillMetrics = Attestations.skillSchema;
//   const trustMetrics = Attestations.trustSchema;
//   const empowerMetrics = Attestations.empowerSchema;
//   const repoMetrics = Attestations.repoSchema;

//   // Skill Score
//   const skillScore =
//     skillMetrics.proficiencyLevel * (skillMetrics.hoursLearned / 100); // Normalize skill progression

//   // Trust Factor
//   const trustFactor =
//     trustMetrics.no_of_publications * 4 +
//     trustMetrics.most_published_year * 3 +
//     trustMetrics.no_of_collaborators * 3;

//   // Empowerment Score
//   const empowermentScore =
//     empowerMetrics.fundRaised * 6 + empowerMetrics.users * 4;

//   // Repo Score: Activity and consistency

//   let totalRepoScore = 0;
//   let totalGapPenalty = 0;

//   for (let i = 0; i < repoMetrics.length; i++) {
//     const repo = repoMetrics[i];
//     const starsImpact = repo.stargazers_count * 2; // Weight stars higher
//     const forksImpact = repo.forks_count * 1.5; // Weight forks moderately
//     const activityImpact = 100 / computeInactivityDays(repo.updated_at); // Active repos score higher

//     totalRepoScore += starsImpact + forksImpact + activityImpact;

//     // Calculate the gap penalty
//     if (i > 0) {
//       const previousRepo = repoMetrics[i - 1];
//       const gapPenalty = computeCreationGapPenalty(
//         previousRepo.created_at,
//         repo.created_at
//       );
//       totalGapPenalty += gapPenalty;
//     }

//   const repoScore = totalRepoScore - totalGapPenalty;
  

//   // Weighted Combination
//   const finalReputationScore =
//     skillScore * 2 +
//     trustFactor * 5 +
//     empowermentScore * 1 +
//     repoScore * 3; // RepoSchema has significant importance

//   return finalReputationScore as i64;
// }

// // function computeRepoScore(repoMetrics): number {
// //   if (!repoMetrics || repoMetrics.length === 0) return 0;

// //   let totalRepoScore = 0;
// //   let totalGapPenalty = 0;

// //   for (let i = 0; i < repoMetrics.length; i++) {
// //     const repo = repoMetrics[i];
// //     const starsImpact = repo.stargazers_count * 2; // Weight stars higher
// //     const forksImpact = repo.forks_count * 1.5; // Weight forks moderately
// //     const activityImpact = 100 / computeInactivityDays(repo.updated_at); // Active repos score higher

// //     totalRepoScore += starsImpact + forksImpact + activityImpact;

// //     // Calculate the gap penalty
// //     if (i > 0) {
// //       const previousRepo = repoMetrics[i - 1];
// //       const gapPenalty = computeCreationGapPenalty(
// //         previousRepo.created_at,
// //         repo.created_at
// //       );
// //       totalGapPenalty += gapPenalty;
// //     }
// //   }

// //   return totalRepoScore - totalGapPenalty; // Deduct penalties from the total score
// // }

// function computeInactivityDays(updatedAt: string): number {
//   const lastUpdated = new Date(updatedAt).getTime();
//   const today = new Date().getTime();
//   const daysInactive = Math.max((today - lastUpdated) / (1000 * 60 * 60 * 24), 1);
//   return daysInactive;
// }

// function computeCreationGapPenalty(
//   prevCreatedAt: string,
//   currentCreatedAt: string
// ): number {
//   const prevCreated = new Date(prevCreatedAt).getTime();
//   const currentCreated = new Date(currentCreatedAt).getTime();
//   const gapInDays = (currentCreated - prevCreated) / (1000 * 60 * 60 * 24);

//   if (gapInDays > 365) {
//     return gapInDays * 0.5; // Penalize large gaps more heavily
//   } else {
//     return gapInDays * 0.2; // Smaller penalty for shorter gaps
//   }
// }

// return 

// }

// import { Attestations } from "./attestations";

// export function calc(): i64 {
//   const skillMetrics = Attestations.skillSchema;
//   const trustMetrics = Attestations.trustSchema;
//   const empowerMetrics = Attestations.empowerSchema;
//   const repoMetrics = Attestations.repoSchema; // Assuming this is iterable (e.g., an array or map)

//   // Skill Score
//   const skillScore: i64 =
//     skillMetrics.proficiencyLevel * (skillMetrics.hoursLearned / 100) as i64;

//   // Trust Factor
//   const trustFactor: i64 =
//     trustMetrics.no_of_publications * 4 +
//     trustMetrics.most_published_year * 3 +
//     trustMetrics.no_of_collaborators * 3;

//   // Empowerment Score
//   const empowermentScore: i64 =
//     empowerMetrics.fundRaised * 6 + empowerMetrics.users * 4;

//   // Repo Score
//   // const repoScore: i64 = computeRepoScore(repoMetrics);
  
//   // let totalRepoScore: i64 = 0;
//   // let previousCreated: i64 = 0;

  
//   //   const starsImpact: i64 = repoMetrics.stargazers_count * 2; // Weight stars higher
//   //   const forksImpact: i64 = repoMetrics.forks_count * 1; // Weight forks moderately
//   //   const activityImpact: i64 = computeActivityImpact(repoMetrics.updated_at, repoMetrics.created_at);

//   //   totalRepoScore += starsImpact + forksImpact + activityImpact;

//   //   // Apply gap penalty
//   //   if (previousCreated !== 0) {
//   //     totalRepoScore -= computeGapPenalty(previousCreated, repoMetrics.created_at);
//   //   }

//   //   previousCreated = repoMetrics.created_at;
  
//   // const repoScore: i64 = totalRepoScore;
//   // const repoScore: i64 = 0;
//   // Final Score (weighted sum)
//   const finalReputationScore: i64 =
//     skillScore * 2 + trustFactor * 1 + empowermentScore * 1  ;

//   return finalReputationScore as i64;
// }

// // function computeRepoScore(repoMetrics: REPOSCHEMA[]): i64 {
// //   let totalRepoScore: i64 = 0;
// //   let previousCreated: i64 | null = null;

// //   for (const repo of repoMetrics) {
// //     const starsImpact: i64 = repo.stars * 2; // Weight stars higher
// //     const forksImpact: i64 = repo.forks * 1; // Weight forks moderately
// //     const activityImpact: i64 = computeActivityImpact(repo.lastUpdated, repo.created);

// //     totalRepoScore += starsImpact + forksImpact + activityImpact;

// //     // Apply gap penalty
// //     if (previousCreated !== null) {
// //       totalRepoScore -= computeGapPenalty(previousCreated, repo.created);
// //     }

// //     previousCreated = repo.created;
// //   }

// //   return totalRepoScore;
// // }

// // function computeActivityImpact(lastUpdated: i64, created: i64): i64 {
// //   const timeSinceLastUpdate: i64 = (Date.now() - lastUpdated) / (1000 * 60 * 60 * 24); // Convert ms to days
// //   const repoAge: i64 = (Date.now() - created) / (1000 * 60 * 60 * 24); // Age in days

// //   if (timeSinceLastUpdate > 365) return -10; // Penalize inactive repos
// //   return 1; // Reward older, maintained repos
// // }

// // function computeGapPenalty(prevCreated: i64, currentCreated: i64): i64 {
// //   const gapInDays: i64 = (currentCreated - prevCreated) / (1000 * 60 * 60 * 24); // Convert ms to days
// //   if (gapInDays > 365) return gapInDays / 2; // Penalize large gaps more heavily
// //   return 5; // Smaller penalty for shorter gaps
// // }




// The Algorithm.
// This is the space to design your reputation algorithm taking in account 
// multiple schemas across true network to calculate a reputation score for
// your users & the community. 

// This is the starting point, calc function.
// Algorithm Compute Module (ACM) uses this as starting point to execute
// your reputation algorithm and expects an i64 as result.

import { Attestations } from "./attestations";

export function calc(): i64 {

  const skillMetrics = Attestations.skillSchema;
  const trustMetrics = Attestations.trustSchema;
  const empowerMetrics = Attestations.empowerSchema;
  const repoMetrics = Attestations.repoSchema;
  


  

  const skillScore = skillMetrics.proficiencyLevel * (skillMetrics.hoursLearned / 100); // Normalize skill progression

  const trustFactor = (trustMetrics.no_of_publications * 4) + 
                       (trustMetrics.most_published_year * 3) + 
                       (trustMetrics.no_of_collaborators * 3);

  const empowermentScore = (empowerMetrics.fundRaised * 6) + 
                            (empowerMetrics.users * 4);

    const combinedGameSkillTrustEmpowerment = (
                                skillScore * 3 +
                                trustFactor * 2 +
                                empowermentScore * 1
                              );
//   const crossInfluenceFactor = computeCrossInfluence(

//           skillMetrics.hoursLearned,
//           trustMetrics.no_of_collaborators* 0.1,
//                               empowerMetrics.fundRaised *0.2
//                             );

  const finalReputationScore = combinedGameSkillTrustEmpowerment ;

return finalReputationScore as i64 ;
}


function computeCrossInfluence(
    skillHours: i64, 
    collaborators: i32, 
    fundsRaised: i64
  ): number {
    
    const skillInfluence = skillHours  * 3; // Log scale to dampen outliers
    const trustInfluence = collaborators * 0.2; 
    const financialInfluence = fundsRaised / 1_000_000; // Normalize financial data on a reasonable scale
  
    // const crossFactor =  skillInfluence  + trustInfluence + financialInfluence;
  
    return 1; // Clamp multiplier to avoid excessive reputation inflation
  }