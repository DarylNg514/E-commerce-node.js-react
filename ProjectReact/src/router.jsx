import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";

import NotFound from "./components/NotFound/NotFound";
import Connexion from "./components/Signin/Connexion";
import Inscrip from "./components/Signin/Inscrip";
import Ajoutproduit from "./components/GestionProduit/Ajoutproduit";
import Updateaccount from "./components/Gestionaccount/Updateaccount";
import Deleteacount from "./components/Gestionaccount/Deleteacount";
import Gestionproduits from "./components/GestionProduit/Gestionproduits";
import Payement from "./components/Payement/Payement";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Connexion />,
    errorElement: <NotFound />

  },
  {
    path: "/register",
    element: <Inscrip />,
    errorElement: <NotFound />
  },
  {
    path: "/acceuil",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {

      },
      {

      },
    ],
  },
  {
    path: "/ajout",
    element: <Ajoutproduit />,
    errorElement: <NotFound />
  },
  {
    path: "/modifier",
    element: <Updateaccount />,
    errorElement: <NotFound />
  },
  {
    path: "/delete",
    element: <Deleteacount />,
    errorElement: <NotFound />
  },
  {
    path: "/Gestionproduits",
    element: <Gestionproduits />,
    errorElement: <NotFound />
  },
  {
    path: "/Payment",
    element: <Payement />,
    errorElement: <NotFound />
  },
]);

export default router;
