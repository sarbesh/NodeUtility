import React from "react";

import ChartBar from './ChartBar';
import './Chart.css';


/**
 * Represents a data point to be plotted on the chart.
 * @typedef {Object} dataPoint
 * @property {string} label - The label for the data point.
 * @property {number} value - The value of the data point.
 */


/**
 * A functional component that renders a chart using the given data points.
 * 
 * @param {Object} props - The props object for the Chart component.
 * @param {Array<dataPoint>} props.dataPoints - An array of data points to be plotted on the chart.
 * 
 * @returns {JSX.Element} A JSX element representing the chart.
 */
const Chart = props => {

    const dataPointValues = props.dataPoints.map(dataPoint => dataPoint.value);
    const totalmaxValue = Math.max(...dataPointValues);

    return <div className="chart">
        {
            props.dataPoints.map(dataPoint =>
                <ChartBar
                    key={dataPoint.label}
                    value={dataPoint.value}
                    max={totalmaxValue}
                    label={dataPoint.label}
                />
            )
        }
    </div>
};

export default Chart;