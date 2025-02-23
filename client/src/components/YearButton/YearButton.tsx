import { LAST_YEAR } from '../../Constants';

interface YearButtonProps {
  year: string;
  selectedYear: string;
  onClick: (year: string) => void;
}

const YearButton = ({ year, selectedYear, onClick }: YearButtonProps) => {
  return (
    <button
      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer
                    ${
                      selectedYear === year
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
      onClick={() => onClick(year)}
    >
      {year === LAST_YEAR ? 'Last Year' : year}
    </button>
  );
};

export default YearButton;
