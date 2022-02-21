import styled from "styled-components";

const Father = styled.div`
  display: flex;
`;

const Box = styled.div`
  background-color: ${props => props.bgColor};
  width: 100px;
  height: 100px;
`;

const Circle = styled(Box)`
  border-radius: 50px;
`;

const Btn = styled.button`
  color: white;
  background-color: tomato;
  border: 0px;
  border-radius: 15px;
`;

const Input = styled.input.attrs({ required: true, minlength: 10 })`
  background-color: tomato;
`;

function App() {
  return (
    <Father>
      <Btn>Log in</Btn>
      <Btn as="a" href="/">Log in</Btn>
      <Input />
      <Input />
    </Father>
  );
}

export default App;