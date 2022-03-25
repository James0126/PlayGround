import { FC } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ASSETS } from "../../config/constants";
import { RefetchOptions } from "../../data/query";
import createContext from "./createContext";

export const [useChains, ChainsProvider] =
  createContext<ChainOption[]>("Chains");

const useNetworkFromRouteMatch = () => {
  const { network } = useParams();
  return network;
};

export const useCurrentChain = () => {
  const chains = useChains();
  const network = useNetworkFromRouteMatch();

  const chain =
    chains.find(
      (chain) => chain.name === network || chain.chainID === network
    ) ?? chains.find((chain) => chain.name === "mainnet"); // return mainnet for default chain

  if (!chain) {
    throw new Error("Chain is not defined");
  }

  return chain;
};

export const useNetworkName = () => {
  const { name } = useCurrentChain();
  return name;
};

const InitChains: FC = ({ children }) => {
  const { data } = useQuery(
    "chains.json",
    async () => {
      const { data } = await axios.get("chains.json", { baseURL: ASSETS });
      return data;
    },
    { ...RefetchOptions.INFINITY }
  );

  if (!data) {
    return null;
  }

  return (
    <ChainsProvider value={Object.values(data)}>{children}</ChainsProvider>
  );
};

export default InitChains;
