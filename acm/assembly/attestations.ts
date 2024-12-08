
// Auto Generated File.
// Created using Reputation CLI from True Network.
// To update the classes, use the "reputation-cli acm-prepare" at the root directory that contains "true-network".

@inline
function readMemory<T>(index: usize): T {
  return load<T>(index);
}


class SKILLSCHEMA {
  proficiencyLevel: u32;
  hoursLearned: u64;

  constructor() {
    this.proficiencyLevel = readMemory<u32>(0);
    this.hoursLearned = readMemory<u64>(4);
  }
}


class TRUSTSCHEMA {
  no_of_publications: u32;
  no_of_collaborators: u32;
  most_published_year: u32;

  constructor() {
    this.no_of_publications = readMemory<u32>(12);
    this.no_of_collaborators = readMemory<u32>(16);
    this.most_published_year = readMemory<u32>(20);
  }
}


class REPOSCHEMA {
  updated_at: u32;
  stargazers_count: u32;
  forks_count: u32;
  created_at: u32;

  constructor() {
    this.updated_at = readMemory<u32>(24);
    this.stargazers_count = readMemory<u32>(28);
    this.forks_count = readMemory<u32>(32);
    this.created_at = readMemory<u32>(36);
  }
}


class EMPOWERSCHEMA {
  users: u64;
  fundRaised: u64;

  constructor() {
    this.users = readMemory<u64>(40);
    this.fundRaised = readMemory<u64>(48);
  }
}


export class Attestations {
  static skillSchema: SKILLSCHEMA = new SKILLSCHEMA();
  static trustSchema: TRUSTSCHEMA = new TRUSTSCHEMA();
  static repoSchema: REPOSCHEMA = new REPOSCHEMA();
  static empowerSchema: EMPOWERSCHEMA = new EMPOWERSCHEMA();
}
