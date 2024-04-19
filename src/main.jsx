import React from "react";
import ReactDOM from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css";
import "./index.css";
import "react-icofont";
import { UserProvider } from "./Store";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import Paymentpage from "./Components/PaymentPage/Paymentpage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <App />
        {/* <Paymentpage/> */}
      </BrowserRouter>
    </UserProvider> 
  </React.StrictMode>
);
