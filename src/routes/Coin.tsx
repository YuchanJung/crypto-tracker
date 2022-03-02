import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, Route, Switch, useLocation, useParams, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import Chart from "./Chart";
import Price from "./Price";

const Containter = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;


const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.div`
  text-align: center;
`;

const OverView = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  border-radius: 10px;
`;

const OverViewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33%;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin: 20px 0px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  color: ${props => props.isActive ? props.theme.accentColor : props.theme.textColor};
  &:hover{
    background-color: rgba(0, 0, 0, 0.7);
  }
  a {
    display: block;
    padding: 7px 0px;
  }
`;

interface RouteParams {
  coinID: string;
}

interface RouteStates {
  name: string;
}

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  // tags: object; 
  /* 실제론 object가 아니라 object로 이루어진 배열이라 일일이 타입을 또 설명해주어야 함 
  tags: interfaceName[];
  */
  //team: object;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  //links: object;
  //links_extended: object;
  //whitepaper: object;
  first_data_at: string;
  last_data_at: string;
}

interface ITickersData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const { coinID } = useParams<RouteParams>();
  const { state } = useLocation<RouteStates>();
  const priceMatch = useRouteMatch("/:coinID/price");
  const chartMatch = useRouteMatch("/:coinID/chart");
  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    ["info", coinID],
    () => fetchCoinInfo(coinID)
  );
  const { isLoading: tickersLoading, data: ticekrsData } = useQuery<ITickersData>(
    ["tickers", coinID],
    () => fetchCoinTickers(coinID)
  );
  const loading = infoLoading && tickersLoading;
  return (
    <Containter>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading.." : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <OverView>
            <OverViewItem>
              <span>rank:</span>
              <span>{infoData?.rank}</span>
            </OverViewItem>
            <OverViewItem>
              <span>symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverViewItem>
            <OverViewItem>
              <span>open source:</span>
              <span>{infoData?.open_source ? "Yes" : "No"}</span>
            </OverViewItem>
          </OverView>
          <Description>{infoData?.description}</Description>
          <OverView>
            <OverViewItem>
              <span>total supply:</span>
              <span>{ticekrsData?.total_supply}</span>
            </OverViewItem>
            <OverViewItem>
              <span>max supply:</span>
              <span>{ticekrsData?.max_supply}</span>
            </OverViewItem>
          </OverView>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinID}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinID}/price`}>Price</Link>
            </Tab>
          </Tabs>
          <Switch>
            <Route path={`/:coinID/price`}>
              <Price />
            </Route>
            <Route path={`/:coinID/chart`}>
              <Chart />
            </Route>
          </Switch>
        </>
      )}
    </Containter>
  );
}

export default Coin;
