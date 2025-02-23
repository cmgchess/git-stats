import { ContributionData } from '../../types/Git';
import dayjs from 'dayjs';
import TimelineBadge from '../TimelineBadge/TimelineBadge';
import Fold from '../Fold/Fold';
import { useState } from 'react';
import RepoCommitSummary from '../RepoCommitSummary/RepoCommitSummary';

interface CommitListProps {
  date: string;
  count: number;
  contributionData: ContributionData;
}

const CommitList = ({ date, count, contributionData }: CommitListProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const commits = contributionData.commits[date] || {};
  const repoCount = Object.keys(commits).length;
  const formattedDate = dayjs(date).format('MMMM D, YYYY').split(', ');

  const handleToggle = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <>
      <h3 className="text-base mb-3 flex items-center">
        <span className="pl-2 pr-3">
          <span className="text-black text-xs font-semibold">
            {formattedDate[0]},{' '}
          </span>
          <span className="text-gray-500 text-xs font-semibold">
            {formattedDate[1]}
          </span>
        </span>
        <span className="border-b border-gray-300 flex-grow ml-2"></span>
      </h3>
      {!count && (
        <p className="text-gray-500 pt-3 text-sm text-center">
          {contributionData.author} had no activity during this period.
        </p>
      )}
      {count > 0 && (
        <>
          <div className="flex items-center space-x-2 justify-between">
            <TimelineBadge />
            <span
              onClick={handleToggle}
              className="select-none text-gray-800 hover:text-sky-600 cursor-pointer text-base leading-5 font-normal flex-grow"
            >
              Created {count} commit{count > 1 ? 's' : ''} in {repoCount}{' '}
              repositor
              {repoCount > 1 ? 'ies' : 'y'}
            </span>
            <Fold isExpanded={isExpanded} onToggle={handleToggle} />
          </div>
          {isExpanded && (
            <div className="mt-3 ml-10">
              {Object.entries(commits)
                .sort((a, b) => b[1] - a[1])
                .map(([repo, commitCount]) => (
                  <RepoCommitSummary
                    key={repo}
                    repo={repo}
                    commitCount={commitCount}
                    total={count}
                  />
                ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CommitList;
