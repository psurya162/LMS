import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Paymentpage = () => {
  return (
    <>
      <Container>
        <div className="text-center">
          <h1 className="h4">
            Get DeltaView Subscription and <br />
            Learn unlimited{" "}
          </h1>
        </div>
      </Container>
      <Container>

        <div className="text-center pt-5">
            <p>Subscription Plans</p>
        </div>
        <div className="text-center d-flex">
           <button className="btn btn-primary m-2">3000</button>
           <button className="btn btn-primary">3000</button>
        </div>
      </Container>
    </>
  );
};

export default Paymentpage;
