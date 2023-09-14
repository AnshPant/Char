import styled from "styled-components";
import { saleItems } from "../data";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({ display: "none" })}
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content : center;
  background-color: #${(props) => props.bg};
`;


const Image = styled.img`
  ${'' /* height: 80%; */}
  width: 100%;
  height: 150%;
  object-fit: fill;
`;


const Slider = () => {
 

  return (
    <Container>
      <Wrapper>
        {saleItems.map((item) => (
          <Slide bg={item.bg} key={item.id}>
              <Image src={item.img} />
          </Slide>
        ))}
      </Wrapper>
    </Container>
  );
};

export default Slider;
