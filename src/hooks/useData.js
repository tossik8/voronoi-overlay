import { useState, useEffect } from 'react';
import { csv, timeParse } from 'd3';

const csvUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv';

const parseDate = timeParse("%m/%d/%y")

const transform = rawData => {
  const countriesData = rawData.filter(d => d["Province/State"] === "");
  const dates = rawData.columns.slice(4, 104);
  return countriesData.map(country => {
    const object = dates.map(date => ({
        date: parseDate(date),
        deathsTotal: +country[date],
        country: country["Country/Region"]
    }));
    object.country = country["Country/Region"];
    return object;
  });
};

export const useData = () => {
  const [data, setData] = useState();

  useEffect(() => {
    csv(csvUrl).then((rawData) => {
      setData(transform(rawData));
    });
  }, []);

  return data;
};
