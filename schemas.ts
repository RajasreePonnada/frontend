import {Hash, Schema, U32, U64} from "@truenetworkio/sdk"

export const skillSchema = Schema.create({
    // skillName: Text,
    proficiencyLevel: U32,
    hoursLearned: U64,
    // mentorAddress: Text
})

export const trustSchema = Schema.create({
    // researcherName: Text,
    no_of_publications: U32,
    most_published_year: U32,
    no_of_collaborators: U32,
})





export const empowerSchema = Schema.create({
    // projectname: Text,
    fundRaised: U64,
    users: U64,
})


export const repoSchema = Schema.create({
    stargazers_count: U32,
    forks_count: U32,
    created_at: U32,
    updated_at: U32,
})