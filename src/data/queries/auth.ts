import { useQuery } from "react-query";
import { queryKey, RefetchOptions } from "../query";
import { useLCDClient } from "./lcdClient";

export const useAccountInfo = (address: string) => {
  const lcd = useLCDClient();

  return useQuery(
    [queryKey.auth.accountInfo],
    async () => await lcd.auth.accountInfo(address),
    { ...RefetchOptions.DEFAULT }
  );
};
