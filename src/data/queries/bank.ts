import { useQuery } from "react-query";
import axios from "axios";
import { Coins } from "@terra-money/terra.js";
import { queryKey, RefetchOptions } from "../query";
import { useLCDClient } from "./lcdClient";

export const useSupply = () => {
  const { config } = useLCDClient();
  const lcd = config.URL;

  return useQuery(
    [queryKey.bank.supply],
    async () => {
      // TODO: Pagination
      // Required when the number of results exceed 100
      const { data } = await axios.get<{ supply: any[] }>(
        "cosmos/bank/v1beta1/supply", // FIXME: Import from terra.js
        { baseURL: lcd }
      );

      return data.supply;
    },
    { ...RefetchOptions.INFINITY }
  );
};

export const useInitialBankBalance = (address?: TerraAddress) => {
  const lcd = useLCDClient();

  return useQuery(
    [queryKey.bank.balance, address],
    async () => {
      if (!address) return new Coins();
      // TODO: Pagination
      // Required when the number of results exceed 100
      const [coins] = await lcd.bank.balance(address);
      return coins;
    },
    { ...RefetchOptions.DEFAULT }
  );
};
