import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Stats from "../stats/index";
import './index.css'

function splitAndAddComma(str) {
  return `${str.substring(0, 4)}-${str.substring(4)}`;
}


const ModalComponent = ({ modal, toggleModal, data }) => {

  return (
    <div>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          Team Statistics: {data.teamFullName} | {splitAndAddComma(String(data.seasonId))} season | {data.gameId=="2"? "Regular Season": "Playoffs"} 
        </ModalHeader>
        <ModalBody>
          <Stats team={data}/>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalComponent;
