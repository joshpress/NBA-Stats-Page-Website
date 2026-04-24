document.addEventListener("DOMContentLoaded",DOMContentLoaded);
const NBA = require("nba");


function DOMContentLoaded() {
    let submitPlayer=document.getElementById("submitPlayer");
    let submitTeam=document.getElementById("submitTeam");
    //submitPlayer.addEventListener("click",submitPlayerClick);
     getJSON();
  //  submitTeam.addEventListener("click",submitTeamClick);
}

function submitPlayerClick() {
    let playerName=document.getElementById("playerName").value;
    let numberofGames=document.getElementById("numberofGames").value;
   
}
function submitTeamClick() {
}

async function getJSON(){
    const player = NBA.findPlayer('Stephen Curry');
    NBA.stats.playerInfo({ PlayerID: player.playerId }).then(console.log);
    try{
        
        const response= await fetch ("json/team_statistics.json");
        const data= await response.json();

        const team=data.find(p=>p.teamName==="Warriors");

        console.log(player);
        return player;
    
    }
    catch(error){
        console.log(`Error ${error}`)
    }
}