import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { SelectionProvider } from "./context/SelectionContext.jsx";
import { SendMsgProvider } from "./context/SendMsg.jsx";
import { SocketProvider } from "./context/SocketContext.jsx";
import { ToastContainer } from "react-toastify";
import { SidebarProvider } from "./context/SidebarContext.jsx";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <SocketProvider>
        <SelectionProvider>
          <SendMsgProvider>
            <SidebarProvider>
              <App />
            </SidebarProvider>
            <ToastContainer />
          </SendMsgProvider>
        </SelectionProvider>
      </SocketProvider>
    </BrowserRouter>
  </React.StrictMode>
);
