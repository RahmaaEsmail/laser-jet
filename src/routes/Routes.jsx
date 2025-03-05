import { Route, Routes } from "react-router-dom";
import { routesData } from "./routesData";
import { lazy , Suspense } from "react";

export default function AppRoutes() {
  return (
    <Routes>
      
      {routesData.map((item) =>
        item?.subMenus?.length > 0 ? (
          item?.subMenus.map((ele) => (
            <Route path={ele.path} element={<ele.component />} key={ele?.id} />
          ))
        ) : (
          <Route path={item.path} element={<item.component />} key={item?.id} />
        )
      )}
    </Routes>
  );
}
