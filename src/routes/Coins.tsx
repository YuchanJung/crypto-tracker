import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";

const Containter = styled.div`
  padding: 0px 20px;
  max-width: 420px;
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

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  /*padding: 20px; */
  margin-bottom: 10px;
  border-radius: 15px;
  border: 1px solid white;
  a {
    display: flex;
    align-items: center;
    padding: 20px; /* 패딩 위치를 어디에 넣냐에 따라 링크 클릭 범위가 달라짐 */
    transition: color 0.2s ease-in;
    /* display: block; /* 글씨 밖까지 클릭되게 함 */
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const LogoImg = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  /* const [coins, setCoins] = useState<ICoin[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const json = await(
        await fetch(`https://api.coinpaprika.com/v1/coins`)
      ).json();
      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
  }, []); */
  return (
    <Containter>
      <Helmet>
        <title>Coins</title>
      </Helmet>
      <Header>
        <Title>Coins</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name, symbol: coin.symbol },
                }}
              >
                <LogoImg
                  src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Containter>
  );
}

export default Coins;
