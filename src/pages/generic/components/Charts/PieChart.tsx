import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { TransformedData } from 'pages/home/Home/store/HomeTypes';
import { formatCurrency } from 'pages/generic/helpers/FormatHelpers';
import './style.css';

interface PieChartProps {
  data: TransformedData[];
  title: string;
}

const PieChart = ({ data, title }: PieChartProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const totalAmount = data.reduce((total, item) => total + item.amount, 0);
  const currencyCode = localStorage.getItem('currency') ?? 'INR';
  const formattedTotalAmount = formatCurrency(totalAmount, currencyCode); 
  const zeroCurrency = formatCurrency(0,currencyCode)
  const color = d3.scaleOrdinal<string>()
    .domain(data.map(d => d.transaction_type))
    .range(d3.schemeSet2);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    

    const width = 350;
    const height = 420;
    const margin = { top: 20, right: 40, bottom: 40, left: 40 }; 
    const radius = Math.min(width, height - 100) / 2 - margin.left;
    const innerRadius = radius * 0.5;
    const outerCircleWidth = 30; 
    const outerCircleColor = '#DDDDDD'; 

    const chart = svg.append('g')
      .classed('chart-group', true)
      .attr('transform', `translate(${width / 2},${(height + margin.top - margin.bottom) / 2})`); 

    const pie = d3.pie<TransformedData>()
      .value(d => d.amount);

    const arc = d3.arc<d3.PieArcDatum<TransformedData>>()
      .innerRadius(totalAmount === 0 ? radius - outerCircleWidth : innerRadius) 
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

    if (totalAmount === 0) {
      chart.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', radius - outerCircleWidth / 2)
        .attr('fill', 'transparent')
        .attr('stroke', outerCircleColor)
        .attr('stroke-width', outerCircleWidth);

      chart.append('text')
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('font-size', '20px')
        .text(zeroCurrency);
    } else {
      chart.append('text')
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('font-size', '20px')
        .text(formattedTotalAmount);
    }

    const legend = svg.append('g')
      .classed('legend-group', true)
      .attr('transform', `translate(${width - 180}, ${height - 70})`);

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
      .text(d => `${d.transaction_type}: ${formatCurrency(d.amount, currencyCode)}`);
  }, [data, color, formattedTotalAmount]);

  return (
    <div>
      <div className="chart-title">{title}</div>
      <svg className='pie' ref={svgRef} width="400" height="450"></svg>
    </div>
  );
};

export default PieChart;
