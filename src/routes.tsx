import { Route, Routes } from "react-router-dom";
import Index from "./app/page/Index";

export default (
  <Routes>
    <Route index element={<Index />} />
  </Routes>
);
