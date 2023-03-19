import {Delaunay} from "d3";
import { useMemo } from "react";

export const VoronoiOverlay = ({innerWidth, innerHeight, allData, lineGenerator, onHover}) => {

   return useMemo(() => {

        const points = allData.map(d => [lineGenerator.x()(d), lineGenerator.y()(d)]);
        const delaunay = Delaunay.from(points);
        const voronoi = delaunay.voronoi([0,0, innerWidth, innerHeight]);

        return <g className="voronoi">
                {
                points.map((point, i) => (<path onMouseEnter={() => onHover(allData[i])} key={i} d={voronoi.renderCell(i)}/>))
                }
            </g>
    }, [allData, lineGenerator, innerHeight, innerWidth, onHover]);
}
