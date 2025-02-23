import HeatMap from '@uiw/react-heat-map';
import dayjs from 'dayjs';
import { YearData } from '../../types/Git';
import ContributionTooltip from '../ContributionTooltip/ContributionTooltip';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { COLORS, LAST_YEAR } from '../../Constants';
dayjs.extend(advancedFormat);

interface ContributionGraphProps {
  year: string;
  yearData: YearData;
  pastYearStart: string;
  onContributionClick: (date: string, count: number) => void;
}

const today = dayjs();

const getTooltipContent = (date: string, count: number) => {
  const contributionText =
    count === 1
      ? '1 contribution'
      : count > 1
        ? `${count} contributions`
        : 'No contributions';
  return `${contributionText} on ${dayjs(date).format('MMMM Do')}`;
};

const ContributionGraph = ({
  year,
  yearData,
  pastYearStart,
  onContributionClick,
}: ContributionGraphProps) => {
  return (
    <>
      <h2 className="text-normal mb-2">
        {yearData.count} contribution{yearData.count > 1 ? 's' : ''} in{' '}
        {year === LAST_YEAR ? 'the last year' : year}
      </h2>
      <div>
        <HeatMap
          value={yearData.dates}
          space={3}
          rectSize={10}
          width={720}
          legendCellSize={0}
          weekLabels={['', 'Mon', '', 'Wed', '', 'Fri', '']}
          startDate={
            year === LAST_YEAR
              ? new Date(pastYearStart)
              : new Date(`${year}/01/01`)
          }
          rectProps={{
            rx: 2,
          }}
          style={
            {
              fontSize: '12px',
              fontWeight: 400,
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
            } as React.CSSProperties
          }
          panelColors={yearData.count > 0 ? COLORS : [COLORS[0]]}
          rectRender={(props, data) => {
            if (year !== LAST_YEAR && !data.date.startsWith(year))
              return <rect />;
            const date = dayjs(data.date);
            if (year === LAST_YEAR && date.isAfter(today)) return <rect />;
            return (
              <rect
                {...props}
                onClick={() => {
                  onContributionClick(
                    date.format('YYYY/MM/DD'),
                    data.count ?? 0
                  );
                }}
                data-tooltip-id="rect-tooltip"
                data-tooltip-content={getTooltipContent(data.date, data.count)}
              />
            );
          }}
        />
      </div>
      <ContributionTooltip id={'rect-tooltip'} />
    </>
  );
};

export default ContributionGraph;
