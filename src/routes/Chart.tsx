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
          type="line"
          series={[
            {
              name: "Price",
              data: data?.map((price) => price.close),
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
              dropShadow: { enabled: true },
            },
            grid: {
              borderColor: "#7f8fa6",
            },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            xaxis: {
              labels: { show: false },
              axisTicks: { show: false },
              axisBorder: { show: false },
              type: "datetime",
              categories: data?.map((price) => price.time_close),
            },
            yaxis: {
              labels: {
                formatter: (value) => `${value.toFixed(0)}`,
              },
            },
            tooltip: {
              y: {
                formatter: (value) => `$ ${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;