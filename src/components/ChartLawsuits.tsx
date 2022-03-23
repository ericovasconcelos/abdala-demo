import React from 'react';
import dynamic from "next/dynamic";
import { theme } from '@chakra-ui/react';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false, });

interface ChartLawsuitsProps {
    seriesData: Array<number>;
    categoriesData: Array<String>;
    isDate?: boolean;
    type: "area" | "line" | "bar" | "histogram" | "pie" | "donut" | "radialBar" | "scatter" | "bubble" | "heatmap" | "treemap" | "boxPlot" | "candlestick" | "radar" | "polarArea" | "rangeBar" | undefined;
}

const ChartLawsuits = ({seriesData, categoriesData, type, isDate}:ChartLawsuitsProps) => {
    const options = {
        grid: {
            show: false
        },
        chart: {
            toolbar: {
                show: false
            },
            zoom: {
                enabled: true
            },
            foreColor: theme.colors.gray[500]
        },
        tooltip: {
            enabled: true,
            x: {
                format: "yyyy",
                foreColor: theme.colors.gray[500]
            },
            theme: "dark",
        },
        plotOptions: {
            bar: {
                horizontal: true,
            },
            area: {
                fillTo: 'origin',
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            type: isDate? 'datetime' as 'datetime' : 'category',
            axisBorder: {
                color: theme.colors.gray[600]
            },
            axisTicks: {
                color: theme.colors.gray[600]
            },
            categories: categoriesData,
        },
        
        fill: (type==='area') ? {
            opacity: 0.7,
            type: 'gradient',
            gradient: {
                shade: 'dark',
                opacityFrom: 0.7,
                opacityTo: 0.3
            }
        }:
        {},
    }

    const series = [
        { name: 'Quantidade', data: seriesData },
    ]
    return (  <Chart options={options} series={series} type={type} height={160} /> );

}

export default ChartLawsuits;
