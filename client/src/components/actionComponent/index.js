import React from "react";
import { Button } from "reactstrap";
import "./index.css";

const ActionComponent = ({ data, onClick }) => {
  return (
    <Button outline size="sm" onClick={() => onClick(data)}>
      View Statistics
    </Button>
  );
};

export default ActionComponent;
