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
              name: "sales",
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
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            xaxis: {
              labels: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
            },
            yaxis: {
              show: false,
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;