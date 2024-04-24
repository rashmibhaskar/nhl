import React, { useState, useEffect } from "react";
import axios from "axios";
import Skater from "../skater/index";
import Goalie from "../goalie/index";
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Spinner,
} from "reactstrap";
import classnames from "classnames";
import "./index.css";
import TeamStat from "../teamStat/index";

const Stat = ({ team }) => {
  const [skater, setSkater] = useState([]);
  const [goalie, setGoalie] = useState([]);
  const [activeTab, setActiveTab] = useState("1");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  async function fetchStat() {
    setIsLoading(true); // Start loading
    try {
      const response = await axios.get(
        `http://localhost:3001/api/stats/${team && team.triCode}/${
          team && team.seasonId
        }/${team && team.gameId}`
      );
      setSkater(response.data.body.skaters);
      setGoalie(response.data.body.goalies);
    } catch (error) {
      setError("Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchStat();
  }, []);

  return (
    <div>
      {error && <div>Error: {error}</div>}
      {isLoading ? (
        <div className="spin-container">
          {" "}
          <Spinner color="secondary" className="spinner">
            Loading...
          </Spinner>
        </div>
      ) : (
        <div>
          <TeamStat team={team} />
          <h5>More Statistics on the team players</h5>
          <div className="nav-container">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "1" })}
                  onClick={() => {
                    toggleTab("1");
                  }}
                >
                  Skaters
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "2" })}
                  onClick={() => {
                    toggleTab("2");
                  }}
                >
                  Goalies
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <Skater players={skater} />
              </TabPane>
              <TabPane tabId="2">
                <Goalie players={goalie} />
              </TabPane>
            </TabContent>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stat;
