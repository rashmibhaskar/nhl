import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "reactstrap";
import Dropdown from "../dropdown";
import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import ActionComponent from "../actionComponent";
import ModalComponent from "../modalComponent";
import "./index.css";

const SummaryTable = () => {
  const [open, setOpen] = useState(null); // Track which item is open
  const [teams, setTeams] = useState([]);
  const [season, setSeason] = useState("20232024");
  const [seasonOption, setSeasonOption] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [gamet, setGamet] = useState("Regular Season");

  const [colDefs, setColDefs] = useState([
    {
      field: "teamFullName",
      headerName: "Team Name",
      width: 260,
      cellStyle: { textAlign: "left" },
      headerClass: "center-header",
    },
    {
      field: "gamesPlayed",
      headerName: "Games Played",
      width: 170,
      cellStyle: { textAlign: "left" },
      headerClass: "center-header",
    },
    {
      field: "wins",
      headerName: "Wins",
      width: 170,
      cellStyle: { textAlign: "left" },
      headerClass: "center-header",
    },
    {
      field: "losses",
      headerName: "Losses",
      width: 170,
      cellStyle: { textAlign: "left" },
      headerClass: "center-header",
    },
    {
      field: "ties",
      headerName: "Ties",
      width: 170,
      cellStyle: { textAlign: "left" },
      headerClass: "center-header",
    },
    {
      field: "points",
      headerName: "Points",
      width: 170,
      cellStyle: { textAlign: "left" },
      headerClass: "center-header",
      sort: "desc",
    },
    {
      headerName: " Team Statistics",
      field: "action",
      width: 170,
      cellStyle: { textAlign: "left" },
      headerClass: "center-header",
      cellRenderer: ActionComponent,
      cellRendererParams: {
        onClick: (data) => {
          setSelectedData(data);
          setModal(true);
        },
      },
    },
  ]);

  async function fetchTeams() {
    let gid = gamet === "Regular Season" ? "2" : "3";
    setIsLoading(true); // Start loading
    setOpen(false);
    setError(null); // Reset errors
    try {
      const response = await axios.get(
        `https://nhl-node.vercel.app/api/teams/${season}/${gid}`
      );
      setTeams(response.data.mergedArray);
    } catch (error) {
      setError("Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  }

  const handleSeasonChange = (e) => {
    setSeason(e.target.value);
  };

  const handleGameChange = (event) => {
    setGamet(event.target.value);
  };

  function toggle(id) {
    if (open === id) {
      setOpen(null);
    } else {
      setOpen(id);
    }
  }

  const toggleModal = () => setModal(!modal);

  async function fetchSeasons() {
    const response = await axios.get(`https://nhl-node.vercel.app/api/seasons`);
    setSeasonOption(response.data.body);
  }

  useEffect(() => {
    fetchSeasons();
  }, []);

  useEffect(() => {
    fetchTeams();
  }, [season, gamet]);

  if (isLoading) {
    return (
      <Spinner color="secondary" className="spinner">
        Loading...
      </Spinner>
    ); // Show loading message while fetching
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message if an error occurred
  }

  return (
    <div className="summary-container">
      <div className="dropdown-container">
        <div className="dropdown-label">Select Season</div>
        <div className="dropdown-label">Select Game Type</div>
      </div>
      <div className="dropdown-container">
        <Dropdown
          options={seasonOption}
          handleChange={handleSeasonChange}
          value={season}
        />
        <Dropdown
          options={["Playoffs", "Regular Season"]}
          handleChange={handleGameChange}
          value={gamet}
          comp={"modal"}
        />
      </div>

      <br />
      <div
        className="ag-theme-quartz-dark" // applying the grid theme
        style={{ height: 600 }} // the grid will fill the size of the parent container
      >
        <AgGridReact
          rowData={teams}
          columnDefs={colDefs}
          style={{ width: "100%" }}
          domLayout="autoHeight"
        />
        <ModalComponent
          modal={modal}
          toggleModal={toggleModal}
          data={selectedData}
        />
      </div>
    </div>
  );
};

export default SummaryTable;
