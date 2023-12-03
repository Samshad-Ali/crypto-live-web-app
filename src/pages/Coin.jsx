import { Button, Container, HStack, Radio,RadioGroup,} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { context, server } from "../index";
import Error from "../components/Error";
import Loader from "../components/Loader";
import CoinCard from "../components/CoinCard";

const Coin = () => {
  const {loader,setLoader,coinsData,setCoinsData,error,setError}=useContext(context);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");

  const btn = new Array(125).fill(1);
  console.log(btn)
  const Pagination = (para) => {
    setPage(para);
    setLoader(true);
  };

  const fetchingData = async () => {
    try {
      const { data } =
        await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}
      `);
      console.log(data)
     setCoinsData(data);
      setLoader(false);
    } catch (e) {
      setError(true);
      setLoader(false);
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
    <Container maxW={"container.xl"}>
      {loader ? (
        <Loader />
      ) : (
        <>
          <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
            <HStack spacing={"4"}>
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
                {coinsData.map((item) => (
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
            {btn.map((item, i) => {
              return (
                <Button
                  key={i}
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
                  onClick={() => Pagination(i + 1)}
                >
                  {i + 1}
                </Button>
              );
            })}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Coin;
