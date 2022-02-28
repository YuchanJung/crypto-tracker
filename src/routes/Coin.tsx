import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

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
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
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

interface RouteParams {
  coinID: string;
}

interface RouteStates {
  name: string;
}

interface CoinInfoData {
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

interface PriceData {
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
  const [loading, setLoading] = useState(true);
  const { coinID } = useParams<RouteParams>();
  const { state } = useLocation<RouteStates>();
  const [coinInfo, setCoinInfo] = useState<CoinInfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();
  useEffect(() => {
    (async () => {
      const infoData = await(
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinID}`)
      ).json();
      const priceData = await(
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinID}`)
      ).json();
      setCoinInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false);
    })();
  }, [coinID]);
  return (
    <Containter>
      <Header>
        <Title>{state?.name ? state.name : loading ? "Loading.." : coinInfo?.name}</Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <OverView>
            <OverViewItem>
              <span>rank:</span>
              <span>{coinInfo?.rank}</span>
            </OverViewItem>
            <OverViewItem>
              <span>symbol:</span>
              <span>${coinInfo?.symbol}</span>
            </OverViewItem>
            <OverViewItem>
              <span>open source:</span>
              <span>{coinInfo?.open_source ? "Yes" : "No"}</span>
            </OverViewItem>
          </OverView>
          <Description>{coinInfo?.description}</Description>
          <OverView>
            <OverViewItem>
              <span>total supply:</span>
              <span>{priceInfo?.total_supply}</span>
            </OverViewItem>
            <OverViewItem>
              <span>max supply:</span>
              <span>{priceInfo?.max_supply}</span>
            </OverViewItem>
          </OverView>
        </>
      )}
    </Containter>
  );
}

export default Coin;
