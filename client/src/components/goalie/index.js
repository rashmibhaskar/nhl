import React from "react";
import "./index.css"; // Make sure to create a corresponding CSS file

const Goalie = ({ players }) => {
  const isEmpty = Object.keys(players).length === 0;
  return (
    <div>
            {isEmpty ? (
        <div className="no-data">No Goalie Data Available</div>
      ) : (
        <div className="goalie-container">
        {players.map((player, index) => (
          <div className="goalie-profile">
            <div className="goalie-info">
              <img
                src={player.headshot}
                alt={`${player.firstName && player.firstName.default} profile`}
                className="goalie-photo"
              />
            </div>
            <div className="goalie-stats">
              <div className="season-stats">
                <h5>
                🏒 {`${player.firstName && player.firstName.default} ${player.lastName && player.lastName.default}`} • Position "G"
                </h5>
                <div className="goalie-stats-grid">
                  <p>Games Played: {player.gamesPlayed}</p>
                  <p>Wins: {player.wins}</p>
                  <p>Shoutouts: {player.shutouts}</p>
                  <p>GAA: {player.goalsAgainstAverage}</p>
                  <p>Save %: {player.savePercentage}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>)}
    </div>

  );
};

export default Goalie;
