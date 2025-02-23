export interface ContributionData {
  author: string;
  commits: {
    [date: string]: {
      [repoName: string]: number;
    };
  };
}

export interface YearData {
  count: number;
  dates: { date: string; count: number }[];
}
