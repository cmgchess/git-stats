import { COLORS } from '../../Constants';

interface RepoCommitSummaryProps {
  repo: string;
  commitCount: number;
  total: number;
}

const ratioDenominator = COLORS.length - 1;

const generateStepColor = (total: number, value: number) => {
  const ratio = total / ratioDenominator;
  let count = 0;
  let current = 0;

  while (current + ratio < value) {
    current += ratio;
    count++;
  }
  return COLORS[count + 1];
};

const RepoCommitSummary = ({
  repo,
  commitCount,
  total,
}: RepoCommitSummaryProps) => {
  const percentage = Math.round((commitCount / total) * 100);
  const backgroundColor = generateStepColor(total, commitCount);
  return (
    <div className="flex items-center">
      <div className="flex-1 min-w-0">
        <span className="text-blue-600 truncate text-sm">{repo}</span>
        <span className="ml-2 text-gray-500 text-xs mt-1 inline-block">
          {commitCount} commit{commitCount > 1 ? 's' : ''}
        </span>
      </div>

      <div className="w-1/3">
        <div className="relative pt-1">
          <div className="h-2 rounded-md">
            <span
              className="block h-full rounded-md"
              style={{ width: `${percentage}%`, backgroundColor }}
            ></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepoCommitSummary;
