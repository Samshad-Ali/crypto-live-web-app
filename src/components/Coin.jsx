import {
  Button,
  Container,
  HStack,
  Radio,
  RadioGroup,
  TagLabel,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { server } from "../index";
import Error from "./Error";
import Loader from "./Loader";
import CoinCard from "./CoinCard";

const Coin = () => {
  const [coins, setCoins] = useState([]);
  const [loader, setLoder] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");
    
  const btn = new Array(125).fill(1);

  const Pagination = (para) => {
    setPage(para);
    setLoder(true);
  };

  const fetchingData = async () => {
    try {
      const { data } =
        await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}
      `);
      setCoins(data);
      setLoder(false);
    } catch (e) {
      setError(true);
      setLoder(false);
    }
  };
  useEffect(() => {
    fetchingData();
  }, [currency, page]);

// other method----------------------------------
  
  // let currenySymbol;
  // if (currency === 'inr') {
  //   currenySymbol = '₹';
  // } else if (currency === 'usd') {
  //   currenySymbol='$'
  // } else {
  //   currenySymbol='€'
  // }

  const currenySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  if (error) {
    return <Error message={"error while fetching the coin data"} />;
  }

  return (
    <Container maxW={"container.xl"}>{
      loader ? (<Loader />) : (
        <>
          
      <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
        <HStack spacing={'4'} >
          <Radio value={"inr"}>₹ INR</Radio>
          <Radio value={"usd"}>$ USD</Radio>
          <Radio value={"eur"}>€ EUR</Radio>
        </HStack>
      </RadioGroup>
      {loader ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {coins.map((item) => (
              <CoinCard
                key={item.id}
                data={item}
                currenySymbol={currenySymbol}
              />
            ))}
          </HStack>
        </>
      )}
      <HStack overflowX={"auto"} p={"4"}>
        {btn.map((item, id) => {
          return (
            <Button key={id}
              colorScheme={"cyan"}
              css={{
                "&:hover": {
                  backgroundColor: "white",
                  color: "black",
                  border: "2px solid black",
                },
              }}
              bgColor={"blackAlpha.900"}
              color={"white"}
              variant={"outline"}
              onClick={() => Pagination(id + 1)}
            >
              {id + 1}
            </Button>
          );
        })}
      </HStack>
        </>
      )
    }
    </Container>
  );
};

export default Coin;
