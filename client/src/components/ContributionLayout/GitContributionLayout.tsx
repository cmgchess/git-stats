import { useState } from 'react';
import ContributionGraph from '../ContributionGraph/ContributionGraph';
import Loader from '../Loader/Loader';
import { LAST_YEAR } from '../../Constants';
import YearButton from '../YearButton/YearButton';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useGitData } from '../../hooks/useGitData';
import CommitList from '../CommitList/CommitList';

export default function GitContributionLayout() {
  const {
    loading,
    contributionData,
    yearData,
    uniqueYears,
    error,
    pastYearStart,
  } = useGitData();

  const [selectedYear, setSelectedYear] = useState(LAST_YEAR);
  const [selectedContribution, setSelectedContribution] = useState<{
    date: string;
    count: number;
  } | null>(null);

  const handleContributionClick = (date: string, count: number) => {
    setSelectedContribution({ date, count });
  };

  const handleYearButtonClick = (year: string) => {
    setSelectedContribution(null);
    setSelectedYear(year);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-x-auto">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Commit Heatmap</h2>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-8">
          {uniqueYears.map((year) => (
            <YearButton
              key={year}
              year={year}
              selectedYear={selectedYear}
              onClick={handleYearButtonClick}
            />
          ))}
          <YearButton
            key="lastYear"
            year="lastYear"
            selectedYear={selectedYear}
            onClick={handleYearButtonClick}
          />
        </div>
        {error && <ErrorMessage message={error} />}
        {!error && (
          <>
            <div className="h-40 rounded-lg flex flex-col justify-center">
              {loading ? (
                <Loader />
              ) : (
                <ContributionGraph
                  pastYearStart={pastYearStart}
                  yearData={yearData[selectedYear]}
                  year={selectedYear}
                  onContributionClick={handleContributionClick}
                />
              )}
            </div>
            {contributionData && selectedContribution && (
              <>
                <h2 className="text-normal mb-3">Contribution activity</h2>
                <CommitList
                  contributionData={contributionData}
                  date={selectedContribution.date}
                  count={selectedContribution.count}
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
