# nhl
National Hockey League Summary Page

Live: https://nhl-nine.vercel.app/

# Tech Stack: 
- Frontend: React.js, Bootstrap, Reactstrap, Ag-grid, HTML, CSS
- Server: Node.js, Express.js

# A simple web UI application that uses public API endpoints to display NHL team information.
- A league summary page that displays a list or table view with some information (only a few important pieces) about each team in the NHL.
- A team statistics page (or a modal) that displays more statistics about a particular team.
- The user can select a team in the summary page to get to that team’s stats page.
- The stats page includes more detail about the team (but not necessarily all of the details from the stats API endpoint), and can navigate back to the summary page.

# Sample API calls used are:
- To get the all Team Summary : https://api.nhle.com/stats/rest/en/team/summary?cayenneExp=seasonId=20232024%20and%20gameTypeId=2
- To populate values for "Season" dropdown : https://api-web.nhle.com/v1/season
- To get all the Team abbreviations/three letter code : https://api.nhle.com/stats/rest/en/team
- To get team player statistics : https://api-web.nhle.com/v1/club-stats/TOR/20232024/2

# To run React Application - Frontend
- cd client
- npm install
- npm start

# To run Node Application - Proxy Server
- cd server
- npm install
- npm start
