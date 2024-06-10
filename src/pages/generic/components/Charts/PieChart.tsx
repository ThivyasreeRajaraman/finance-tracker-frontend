import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { TransformedData } from 'pages/home/Home/store/HomeTypes';
import './style.css'

interface PieChartProps {
  data: TransformedData[];
  title: string;
}

const PieChart = ({ data, title }: PieChartProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const totalAmount = data.reduce((total, item) => total + item.amount, 0);
  const color = d3.scaleOrdinal<string>()
    .domain(data.map(d => d.transaction_type))
    .range(d3.schemeSet2);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 350;
    const height = 420;
    const margin = 40;
    const radius = Math.min(width, height - 100) / 2 - margin;
    const innerRadius = radius * 0.5;

    const chart = svg.append('g')
    .classed('chart-group', true)
      .attr('transform', `translate(${width / 2},${(height - margin) / 2 - 50})`); 

    const pie = d3.pie<TransformedData>()
      .value(d => d.amount);

    const arc = d3.arc<d3.PieArcDatum<TransformedData>>()
      .innerRadius(innerRadius)
      .outerRadius(radius);

    const data_ready = pie(data);

    chart.selectAll('path')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.transaction_type))
      .attr('stroke', 'white')
      .style('stroke-width', '2px')
      .style('opacity', 0.7);

    chart.append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('font-size', '20px')
      .text(totalAmount);

    const legend = svg.append('g')
    .classed('legend-group', true)
      .attr('transform', `translate(${width - 180}, ${height - 90})`);

    const legendItems = legend.selectAll('.legend-item')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'legend-item')
      .attr('transform', (_, i) => `translate(0, ${i * 20})`); 

    legendItems.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 10)
      .attr('height', 10)
      .attr('fill', d => color(d.transaction_type));

    legendItems.append('text')
      .attr('x', 15)
      .attr('y', 10)
      .attr('text-anchor', 'start')
      .text(d => `${d.transaction_type}: ${d.amount}`);
  }, [data, color, totalAmount]);

  return (
    <div>
      <div className="chart-title">{title}</div>
      <svg className='pie' ref={svgRef} width="400" height="450"></svg>
    </div>
  );
};

export default PieChart;
