import { scaleTime, extent, scaleLog, line, timeFormat, max, format } from "d3";
import { useCallback } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { VoronoiOverlay } from "./VoronoiOverlay";
import { XAxis } from "./XAxis";
import { YAxis } from "./YAxis";


const xValue = d => d.date;
const yValue = d => d.deathsTotal;

const formatDate = timeFormat("%b %d, %Y");
const formatNumber = format(",");

const margin = {top: 50, right: 40, bottom: 40, left: 70};

const Tooltip = ({activeRow, className}) => (
  <text className={className} x="-10" y={-5} textAnchor="end">{`${activeRow.country}: ${formatNumber(activeRow.deathsTotal)} death${activeRow.deathsTotal !== 1? "s": ""} as of ${formatDate(activeRow.date)}`}</text>
);

export const LineChart = ({data, width, height}) => {
  const [activeRow, setActiveRow] = useState();

   let allData = useMemo(() => {
    let data2 = []
    for(let i = 0; i < data.length; ++i){
      data2.push(data[i]);
    }
    return data2.flat();
  }, []);


  const innerWidth = width - margin.right - margin.left;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = useMemo(() => {
      return scaleTime()
  	.domain(extent(allData, xValue))
  	.range([0, innerWidth])
  }, [innerWidth, xValue, allData]);

  const yScale = useMemo(() => {
    return scaleLog()
  	.domain([1, max(allData, yValue)])
  	.range([innerHeight, 0])
  }, [yValue,innerHeight, allData]);


  const lineGenerator = useMemo(() => {
    return line()
  	.x(d => xScale(xValue(d)))
  	.y(d => yScale(1 + yValue(d)));
  }, [xScale, yScale, xValue, yValue]);

  const handleVoronoiHover = useCallback(setActiveRow,[]);

	return (
  <svg width={width} height={height}>
    <g transform={`translate(${margin.left}, ${margin.top})`}>
      <XAxis xScale={xScale} innerHeight={innerHeight}/>
      <YAxis yScale={yScale} innerWidth={innerWidth}/>
      {
      	data.map((record,i) => (
        	<path key={i} className="line" d={lineGenerator(record)}/>
        ))
      }
      {activeRow ? <>
        <path className="line active" d={lineGenerator(data.find(record => activeRow.country===record.country))}/>
        <g transform={`translate(${lineGenerator.x()(activeRow)}, ${lineGenerator.y()(activeRow)})`}>
          <circle r="5"/>
          <Tooltip className="tooltip-stroke" activeRow={activeRow}/>
          <Tooltip className="tooltip" activeRow={activeRow}/>
        </g>
      </>  : null}
      <text id="title" className="label" transform={`translate(${innerWidth/2},-10)`} textAnchor="middle">Global Coronavirus Deaths Over Time</text>
      <text className="label" transform={`translate(-40,${innerHeight/2}) rotate(-90)`} textAnchor="middle">Cummulative Deaths</text>
      <VoronoiOverlay
        innerHeight={innerHeight}
        innerWidth={innerWidth}
        allData={allData}
        lineGenerator={lineGenerator}
        onHover={handleVoronoiHover}/>
		</g>
  </svg>
  );
};
