import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinID: string;
}

function Chart({ coinID }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinID], () =>
    fetchCoinHistory(coinID)
  );
  return (
    <div>
      {isLoading ? (
        "Loading Charts..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: data?.map((d) => ({
                x: new Date(Date.parse(d.time_open)),
                y: [d.open, d.high, d.low, d.close],
              })),
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              background: "transparent",
              height: 500,
              width: 500,
            },
            grid: {
              borderColor: "#7f8fa6",
            },
            stroke: {
              width: 1,
            },
            xaxis: {
              labels: { show: false },
              axisBorder: { show: false },
              axisTicks: { show: false },
              type: "datetime",
              categories: data?.map((d) => d.time_close),
            },
            yaxis: {
              labels: {
                formatter: (value) => `${value.toFixed(0)}`,
              },
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#44bd32",
                  downward: "#8c7ae6",
                },
              },
            },
            tooltip: {
              y: {
                formatter: (value => value.toFixed(2))
              }, /* do not work..*/
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;