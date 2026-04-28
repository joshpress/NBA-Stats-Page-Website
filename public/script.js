
let nbaData = [];
let playerData = []



document.addEventListener("DOMContentLoaded", DOMContentLoaded);
function DOMContentLoaded() {



    submitPlayer.addEventListener("click", submitPlayerClick);

    loadData();

    submitPlayer.addEventListener("click", submitPlayerClick);

}
async function loadData() {
    try {
        const games_response = await fetch("/json/nba_games_2004_2026.json");
        const players_response = await fetch("/json/nba_player_stats_2004_2026.json")
        //set the arrays to the new data
        nbaData = await games_response.json();
        playerData = await players_response.json()


    }
    catch (error) {
        console.log(`Error ${error}`);
    }
}
function submitPlayerClick() {
    let searchInput = document.getElementById("searchInput").value;
    search(searchInput);

}


function search(term) {
    const searchTerm = term.toLowerCase();
    const searchMessage = document.getElementById("searchMessage");
    const year = document.getElementById("year").value;
//october is index 9
    const seasonStart=new Date(year,9,1);
    //june 30 of next year
    const seasonEnd=new Date(year+1,5,30);

    searchMessage.innerText = "";
    if (!searchTerm) {
        searchMessage.innerText = "Please enter a name or team.";
        renderTable([]);
        return;
    }
    //filter by name and year
    const filteredTeams = nbaData.filter(game => {
        const gameDate=new Date(game.GAME_DATE)
        const matchesTerm = game.TEAM_NAME.toLowerCase().includes(searchTerm) ||
        game.GAME_DATE.includes(searchTerm)
        //only check where year exists and is in the season
        const matchesSeason = !year || (gameDate>=seasonStart && gameDate<=seasonEnd);

        return matchesTerm && matchesSeason;
    });
    //player filter
    const filteredPlayers = playerData.filter(player => {
        const gameDate=new Date(player.GAME_DATE);
        const matchesTerm = player.PLAYER_NAME.toLowerCase().includes(searchTerm);

        const matchesSeason = !year ||(gameDate>=seasonStart && gameDate<=seasonEnd);
        return matchesTerm && matchesSeason;
    });

    const allResults = filteredTeams.concat(filteredPlayers);
    if (allResults.length === 0) {
        searchMessage.innerText = `No results found for ${term}`;
    }

    renderTable(allResults.slice(0, 50));
}

function renderTable(data) {
    const headerRow = document.getElementById("headerRow");
    const tableBody = document.getElementById("tableBody");

    headerRow.innerHTML = "";
    tableBody.innerHTML = "";
    if (data.length === 0) return
    let columns = [];
    if (data[0].PLAYER_NAME) {
        //if a player is in data
        columns = ["PLAYER_NAME", "GAME_DATE", "TEAM_NAME", "MATCHUP", "PTS", "REB", "AST", "WL"]
    }
    else {
        //if team name
        columns = ["GAME_DATE", "TEAM_NAME", "MATCHUP", "PTS", "REB", "AST", "WL"]
    }
    //creating columns
    columns.forEach(col => {
        const th = document.createElement("th")
        th.innerText = col.replace("_", " ");
        headerRow.appendChild(th)
    });
    //creating rows
    data.forEach(row => {
        const tr = document.createElement("tr")
        columns.forEach(col => {
            const td = document.createElement("td")
            td.innerText = row[col] ?? "-"
            tr.appendChild(td)
        })
        tableBody.appendChild(tr)
    })
}
