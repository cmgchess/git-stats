import { useState, useEffect } from 'react';
import { ContributionData, YearData } from '../types/Git';
import { handleErrorResponse } from '../api/errorHandler';
import { LAST_YEAR } from '../Constants';

const URL = 'http://localhost:3000/git/daily';

const calcPastYearStart = (): string => {
    const today = new Date();
    today.setDate(today.getDate() - 370);
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
};

const processContributionData = (
    contributionData: ContributionData,
    pastYearStart: string
) => {
    const years = new Set<string>();
    const yearData: { [year: string]: YearData } = {
        [LAST_YEAR]: { count: 0, dates: [] },
    };

    Object.entries(contributionData.commits).forEach(([date, data]) => {
        const year = date.split('/')[0];
        years.add(year);
        if (!yearData[year]) {
            yearData[year] = {
                count: 0,
                dates: [],
            };
        }
        const count = Object.values(data).reduce((prev, next) => prev + next, 0);
        if (date >= pastYearStart) {
            yearData[LAST_YEAR].count += count;
            yearData[LAST_YEAR].dates.push({ date, count });
        }
        yearData[year].count += count;
        yearData[year].dates.push({ date, count });
    });
    Object.values(yearData).forEach((yearInfo) => {
        yearInfo.dates.sort((a, b) => a.date.localeCompare(b.date));
    });
    return { yearData, years };
};

export const useGitData = () => {
    const [loading, setLoading] = useState(false);
    const [contributionData, setContributionData] = useState<ContributionData | null>(null);
    const [yearData, setYearData] = useState<{ [year: string]: YearData }>({ [LAST_YEAR]: { count: 0, dates: [] }, });
    const [uniqueYears, setUniqueYears] = useState<string[]>([]);
    const [error, setError] = useState('');

    const pastYearStart = calcPastYearStart();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await fetch(URL);
                if (!response.ok) {
                    await handleErrorResponse(response);
                }
                const data: ContributionData = await response.json();

                const processedContributionData = processContributionData(
                    data,
                    pastYearStart
                );
                setContributionData(data);
                setYearData(processedContributionData.yearData);
                setUniqueYears([...processedContributionData.years]);
            } catch (e) {
                if (e instanceof Error) setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [pastYearStart]);

    return {
        loading,
        contributionData,
        yearData,
        uniqueYears,
        error,
        pastYearStart
    };
};
