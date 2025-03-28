import { useState } from "react";
import { HeaderAppBar } from "./HeaderAppBar";
import { NavBar } from "./NavBar";
import { Switcher } from "./Switcher";
import { routesDatas as constRoutesDatas } from "../constants/RoutesData";
import { ContentLayout } from "./ContentLayout";

export function MainLayout() {
  const [navBarIsOpen, setNavBarIsOpen] = useState(false);
  const routeDatas = constRoutesDatas;
  return (
    <>
      <NavBar isOpen={navBarIsOpen} onClose={() => setNavBarIsOpen(!navBarIsOpen)} />
      <HeaderAppBar onMenuButtonClick={() => setNavBarIsOpen(true)} />
      <ContentLayout><Switcher routesDatas={routeDatas} /></ContentLayout>
    </>
  );
}
