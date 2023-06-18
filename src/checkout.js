
import './App.css';
import { CLIENT_ID } from "./Config/config";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
function Checkout() {
  const { id } = useParams();

  const [price, setprice] = useState();
  const [month, setmonth] = useState();
  const [link, setlink] = useState();
  useEffect(() => {
    if (id === "1") {
      setprice(12.99);
      setmonth(1);
      
    
    }
    if (id === "2") {
      setprice(23.99);
      setmonth(3);

    }
    if (id === "3") {
      setprice(34.99);
      setmonth(6);
 
    }
    if (id === "4") {
      setprice(57.99);
      setmonth(12);

    }
    console.log(id);
  }, [price]);

 

  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);

  const [email, setemail] = useState();
  const [phone, setphone] = useState();
  const [name, setname] = useState();
  const [contry, setcontry] = useState();

 
  // creates a paypal order
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "create a modern luxury logo design for your business",
            amount: {
              currency_code: "USD",
              value: price,
            },
          },
        ],
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  // check Approval
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      setSuccess(true);
    });
  };

  const onError = (data, actions) => {
    setErrorMessage("An Error occured with your payment ");
  };
  var raw = JSON.stringify({
    id_user: 1,
    email: email,
    fullname: name,
    phone: phone,
    contry: contry,
    price: price,
    month: month,
  });

  const host = process.env.REACT_APP_HOST;
  console.log(host);
  useEffect(() => {
    localStorage.setItem("email", email);
  }, [email]);

  useEffect(() => {
    if (success) {
      console.log("Order successful . Your order id is--", orderID);

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${host}/NewPurchase`, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));

      window.location.href = "/Thankyou";
    }
  }, [success]);

  return (
    <div className="App">
      <div style={{display:"flex" , justifyContent:"center"}}> 
      <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
      <div className="paydiv">
        
               
              <PayPalButtons
                style={{ layout: "vertical", borderRadius: "15px" }}
                createOrder={createOrder}
                onApprove={onApprove}
              />
            </div>
          </PayPalScriptProvider>
    </div>
    </div>
  );
}

export default Checkout;
