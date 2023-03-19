import { useRef, useEffect } from "react";
import { select, axisBottom } from "d3";

export const XAxis = ({xScale, innerHeight}) => {
  const ref = useRef(null);
  useEffect(() => {
  	const xAxisG = select(ref.current);
    const xAxis = axisBottom(xScale).tickSize(-innerHeight).tickPadding(10);
    xAxisG.call(xAxis);
  }, []);
	return <g ref={ref} transform={`translate(0, ${innerHeight})`}/>
}
