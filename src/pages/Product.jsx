import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import {
  EmailShareButton,
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  PinterestShareButton,
  LineShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  ViberShareButton,
  EmailIcon,
  WhatsappIcon,
  FacebookIcon,
  TwitterIcon,
  PinterestIcon,
  LineIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  ViberIcon
} from 'react-share';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterGenre = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [genre, setGenre] = useState("");
  const dispatch = useDispatch();
  const shareUrl = window.location.href;
  console.log(shareUrl);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/api/products/find/" + id);
        setProduct(res.data);
      } catch {}
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    dispatch(
      addProduct({ ...product, quantity, genre})
    );
  };
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
        <EmailShareButton
          url={shareUrl}
          quote={'bought this from BookSwap'}
          hashtag={'#shopping'}
        >
          <EmailIcon size={40} round={true} />
        </EmailShareButton>

           <FacebookShareButton
          url={shareUrl}
          quote={'bought this from BookSwap'}
          hashtag={'#shopping'}
        >
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>
        <TwitterShareButton
          url={shareUrl}
          quote={'bought this from BookSwap'}
          hashtag={'#shopping'}
        >
          <TwitterIcon size={40} round={true} />
        </TwitterShareButton>

        <PinterestShareButton
          url={shareUrl}
          quote={'bought this from BookSwap'}
          hashtag={'#shopping'}
        >
          <PinterestIcon size={40} round={true} />
        </PinterestShareButton>

        <WhatsappShareButton
          url={shareUrl}
          quote={'bought this from BookSwap'}
          hashtag={'#shopping'}
        >
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>

        <LineShareButton
          url={shareUrl}
          quote={'bought this from BookSwap'}
          hashtag={'#shopping'}
        >
          <LineIcon size={40} round={true} />
        </LineShareButton>
        <RedditShareButton
          url={shareUrl}
          quote={'bought this from BookSwap'}
          hashtag={'#shopping'}
        >
          <RedditIcon size={40} round={true} />
        </RedditShareButton>
        <TelegramShareButton
          url={shareUrl}
          quote={'bought this from BookSwap'}
          hashtag={'#shopping'}
        >
          <TelegramIcon size={40} round={true} />
        </TelegramShareButton>
        <TumblrShareButton
          url={shareUrl}
          quote={'bought this from BookSwap'}
          hashtag={'#shopping'}
        >
          <TumblrIcon size={40} round={true} />
        </TumblrShareButton>
        <ViberShareButton
          url={shareUrl}
          quote={'bought this from BookSwap'}
          hashtag={'#shopping'}
        >
          <ViberIcon size={40} round={true} />
        </ViberShareButton>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>$ {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Genre: {product.genre}</FilterTitle>
              {product.genre?.map((c) => (
                <FilterGenre genre={c} key={c} onClick={() => setGenre(c)} />
              ))}
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            <Button onClick={handleClick}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Product;
