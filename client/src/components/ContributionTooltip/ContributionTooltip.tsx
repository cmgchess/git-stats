import { Tooltip } from 'react-tooltip';

const tooltipStyle = {
  padding: '0.25rem 0.5rem',
  borderRadius: '0.375rem',
  fontWeight: 400,
  fontSize: '0.75rem',
  lineHeight: 5 / 3,
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
};

const ContributionTooltip = ({ id }: { id: string }) => {
  return <Tooltip id={id} noArrow opacity={1} style={tooltipStyle} />;
};

export default ContributionTooltip;
