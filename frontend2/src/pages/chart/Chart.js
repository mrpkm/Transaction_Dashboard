import React, { useEffect } from 'react'
import { XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries, VerticalBarSeries } from 'react-vis';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getGraphAsync, transactionSelector } from '../../redux/reducer/transactionReducer';

const Chart = () => {
  const dispatch = useDispatch();
  const { graph, month } = useSelector(transactionSelector);
  useEffect(() => {
    dispatch(getGraphAsync({ month }))
  }, [dispatch, month])
  // console.log(graph);

  return (
    <div className="chart-container">
      <XYPlot margin={{ bottom: 70 }} xType="ordinal" width={500} height={300}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis
          tickLabelAngle={-45}
          style={{ text: { stroke: 'none', fill: 'blue' } }}
        />
        <YAxis
          tickValues={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          style={{ text: { stroke: 'none', fill: 'blue' } }}
        />
        <VerticalBarSeries
          data={graph?.data}
          barWidth={0.5}
          color="#6CE5E8"
        />
      </XYPlot>
    </div>
  );
};

export default Chart