let nbaData=[];
let playerData=[]
document.addEventListener("DOMContentLoaded",DOMContentLoaded);

 

function DOMContentLoaded() {
   
    

    submitPlayer.addEventListener("click",submitPlayerClick);
   
     loadData();

    submitPlayer.addEventListener("click",submitPlayerClick);
  
}
async function loadData(){
    try{
        const response= await fetch("json/nba_games_2004_2026.json");
        nbaGamesData=await response.json();

    }
    catch(error){
        console.log(`Error ${error}`);
    }
}
function submitPlayerClick() {
    let searchInput=document.getElementById("searchInput").value;
    console.log(searchInput.value)
    search(searchInput);
   
}


function search(term){
    const searchTerm=term.toLowerCase();
    if(!searchTerm){
        renderTable(filtered.slice(0,50));
        return;
    }
     const filtered = nbaGamesData.filter(game => {
        return (
           
            game.TEAM_NAME?.toLowerCase().includes(searchTerm) ||
            game.GAME_DATE?.includes(searchTerm)
        );
    });

    renderTable(filtered.slice(0,50));
}

function renderTable(data){
    const headerRow=document.getElementById("headerRow");
    const tableBody=document.getElementById("tableBody");

    headerRow.innerHTML="";
    tableBody.innerHTML="";
    const columns=["GAME_DATE","TEAM_ABBREVIATION","PTS","REB","AST","WL"]
    columns.forEach(col=>{
        const th=document.createElement('th');
        th.innerText=col.replace("_"," ");
        headerRow.appendChild(th);
    })

    data.forEach(game=>{
        const tr=document.createElement("tr");
        columns.forEach(col=>{
            const td=document.createElement("td");
            td.innerText=game[col]?? "-";
            tr.appendChild(td);
        })
        tableBody.appendChild(tr);
    })
}

