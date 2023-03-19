import { useRef, useEffect } from "react";
import { axisLeft, select } from "d3";

export const YAxis = ({yScale, innerWidth}) => {
  const ref = useRef(null);
  useEffect(() => {
  	const yAxisG = select(ref.current);
    const yAxis = axisLeft(yScale).tickSize(-innerWidth).tickPadding(5).ticks(15, "~s");
    yAxisG.call(yAxis);
  }, []);
	return <g ref={ref} transform={`translate(0, 0)`}></g>
};
