import {Chart, type ChartWrapperOptions} from 'react-google-charts';

const BarChart: React.FC<{data: (string | number)[][]; options?: ChartWrapperOptions['options']}> = ({data, options}) => {
	return (<>
		<style>{`
		@media (prefers-color-scheme: dark) {
			[id^="reactgooglegraph"] text {
				fill: var(--color-white);
			}

			[id^="reactgooglegraph"] .google-visualization-tooltip > path {
				fill: var(--color-slate-800);
			}
		}
		`}</style>
		<div className='-mt-4 mb-12'>
			<Chart
				chartType='BarChart'
				data={data}
				options={{
					legend: {
						position: 'none',
					},
					hAxis: {
						title: data[0][1] as string,
						ticks: [],
					},
					annotations: {
						alwaysOutside: true,
					},
					backgroundColor: 'transparent',
					focusTarget: 'category',
					colors: ['#e7000b'],
					height: Math.max(data.length * 30, 200),
					chartArea: {
						height: '80%',
					},
					...options,
				}}
			/>
		</div>
	</>);
};

export default BarChart;
