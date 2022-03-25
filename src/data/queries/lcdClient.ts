import { useMemo } from "react";
import { LCDClient } from "@terra-money/terra.js";
import { useCurrentChain } from "../../utils/contexts/ChainsContext";

export const useLCDClient = () => {
  const network = useCurrentChain();
  const lcdClient = useMemo(
    () => new LCDClient({ ...network, URL: network.lcd }),
    [network]
  );
  return lcdClient;
};
