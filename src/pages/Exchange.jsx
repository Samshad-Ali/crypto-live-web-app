import { Container, HStack } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect } from "react";
import { context, server } from "../index";
import Error from "../components/Error";
import ExchangeCard from "../components/ExchangeCard";
import Loader from "../components/Loader";

const Exchange = () => {
  const { exchangeData, loader, setLoader, setExchangeData,error,setError } =
    useContext(context);
  const fetchingData = async () => {
    try {
      const { data } = await axios.get(`${server}/exchanges`);
      setExchangeData(data);
      setLoader(false);
    } catch (e) {
      setError(true);
      setLoader(false);
    }
  };
  useEffect(() => {
    fetchingData();
  },[]);
  if (error) {
    return <Error message={"error while fetching the exchange data"} />;
  }

  return (
    <Container py={"4"} maxW={"container.xl"}>
      {loader ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {exchangeData.map((exList) => (
              <ExchangeCard data={exList} key={exList.id} />
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Exchange;
