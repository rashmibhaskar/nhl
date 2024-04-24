import React, { useState } from "react";
import "./index.css";
import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";

const TeamStat = ({ team }) => {
  console.log("****", team);
  const [colDefs, setColDefs] = useState([
    { field: "triCode", headerName: "Team Code",width:100 },
    { field: "pointPct", headerName: "P%",width:100  },
    { field: "winsInRegulation", headerName: "ROW",width:100  },
    { field: "winsInShootout", headerName: "S/O Wins",width:100  },
    { field: "goalsFor", headerName: "GF" ,width:100 },
    { field: "goalsAgainst", headerName: "GA",width:100  },
    { field: "goalsForPerGame", headerName: "GF/GP",width:100  },
    { field: "goalsAgainstPerGame", headerName: "GA/GP",width:100  },
    { field: "powerPlayPct", headerName: "PP%",width:100  },
    { field: "penaltyKillPct", headerName: "PK%",width:100  },
    { field: "powerPlayNetPct", headerName: "Net PP%",width:100  },
    { field: "penaltyKillNetPct", headerName: "Net PK%",width:100  },
    { field: "shotsForPerGame", headerName: "Shots/GP",width:100  },
    { field: "shotsAgainstPerGame", headerName: "SA/GP",width:100  },
    { field: "faceoffWinPct", headerName: "FOW%",width:100  },
  ]);

  return (
    <div
      className="ag-theme-quartz-dark" // applying the grid theme
      style={{ margin:"0 auto 50px auto",padding:"0",width: '100%', height: '50%'  }} // the grid will fill the size of the parent container
    >
      <AgGridReact
        rowData={[team]}
        columnDefs={colDefs}
        domLayout="autoHeight"
      />
    </div>
  );
};

export default TeamStat;
