document.addEventListener("DOMContentLoaded",DOMContentLoaded);

function DOMContentLoaded() {
    let submitPlayer=document.getElementById("submitPlayer");
    let submitTeam=document.getElementById("submitTeam");
    submitPlayer.addEventListener("click",submitPlayerClick);
    submitTeam.addEventListener("click",submitTeamClick);
}

function submitPlayerClick() {
    let playerName=document.getElementById("playerName").value;
    let numberofGames=document.getElementById("numberofGames").value;
}
function submitTeamClick() {
}