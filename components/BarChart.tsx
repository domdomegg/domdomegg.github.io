import {Chart, type ChartWrapperOptions} from 'react-google-charts';

const BarChart: React.FC<{data: (string | number)[][]; options?: ChartWrapperOptions['options']}> = ({data, options}) => {
	return (
		<div className='-mt-8 mb-12'>
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
					colors: ['#ff5f66'],
					...options,
				}}
			/>
		</div>
	);
};

export default BarChart;
