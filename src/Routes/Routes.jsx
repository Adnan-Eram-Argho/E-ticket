import {
    createBrowserRouter,
    
  } from "react-router-dom";
import MainLayouts from "../Layouts/MainLayouts";
import ErrorElement from "../Pages/Shared/ErrorElement";
import Home from "../Pages/Home";
import Login from "../Pages/Shared/Login";
import Register from "../Pages/Shared/Register";
import DetailedPage from "../Pages/DetailedPage";
import PrivateRooutes from "./PrivateRoutes";

import Bookings from "../Components/Dashboard/Bookings";
import Payment from "../Pages/Payment";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayouts/>,
      errorElement:<ErrorElement/>,
      children:[
        {
            index:true,
            element:<Home/>
        },
        {
          path:"login",
          element:<Login/>
        },
        {
          path:"register",
          element:<Register/>
        },
        {
          path:"details/:id",
          element:<PrivateRooutes><DetailedPage/></PrivateRooutes>
        },
        {
          path:"bookings/:id",
          element:<Bookings/>
        },
        // {
        //   path:"/payment-success",
        //   element:<Payment/>
        // }
        // ,
        // {
        //   path:"/payment-fail",
        //   element:<Payment/>
        // },
        // {
        //    path:"/payment-cancel",
        //   element:<Payment/>
        // },
        {
          path:"/payment",
          element:<Payment/>
        }
      ]
    }
      // <Route  component={PaymentSuccess} />
      //           <Route path="/payment-fail" component={PaymentFail} />
      //           <Route path="/payment-cancel" component={PaymentCancel} />
      //           <Route path="/" component={Payment} />
    
  ]);

  export default router;