import React from "react";
import "./index.css";

const Skater = ({ players }) => {
  const isEmpty = Object.keys(players).length === 0;

  return (
    <div>
      {isEmpty ? (
        <div className="no-data">No Skater Data Available</div>
      ) : (
        <div className="skater-container">
          {players.map((player, index) => (
            <div className="player-profile">
              <div className="player-info">
                <img
                  src={player.headshot}
                  alt={`${
                    player.firstName && player.firstName.default
                  } profile`}
                  className="player-photo"
                />
              </div>
              <div className="player-stats">
                <div className="season-stats">
                  <h5>
                    🏒{" "}
                    {`${player.firstName && player.firstName.default} ${
                      player.lastName && player.lastName.default
                    }`}{" "}
                    • Position "{player.positionCode}"
                  </h5>
                  <div className="stats-grid">
                    <p>Games Played: {player.gamesPlayed}</p>
                    <p>Goals: {player.goals}</p>
                    <p>Assists: {player.assists}</p>
                    <p>Points: {player.points}</p>
                    <p>+/-: {player.plusMinus}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Skater;
