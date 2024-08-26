const debug = true;
/*
	Each Pkmn is a data object with:
		pkmn sprite retrieved from species name
		nickname the nature
		four moves in a sub-grid
*/
//FYI, try to grab the text from the available elements inside the nav list, then give the filter and category names respectfully//
// On November 2023, startViewTransition does not work on Safari or Firefox, don't bother with ViewAPI

const filterList = document.querySelector(".filter");
const mainEle = document.querySelector("main");
let genList = document.querySelectorAll(".pkmn-list");
let filterButtons = filterList.querySelectorAll(".filter-btn");
let activeButton = filterList.querySelector(".active");
let pokes = document.querySelectorAll(".pkmn");

/* gaem.dataset.pkmn-no*/
const sitesource = 'https://serebii.net';
const imglinks = {
	Gen1: 	sitesource + '/pokearth/sprites/rb/'+ '000' + '.png',
	Gen2: 	sitesource + '/pokearth/sprites/gold/'+ '000' + '.png',
	Gen3: 	sitesource + '/emerald/pokemon/'+ '000' + '.png',
	Colloseum: sitesource + '/emerald/pokemon/'+ '000' + '.png',
	Gen4: 	sitesource + '/pokearth/sprites/hgss/'+ '000' + '.png',
	Gen6: 	sitesource + '/xy/pokemon/'+ '000' + '.png',
	Legends: sitesource + '/swordshield/pokemon/'+ '000' + '.png'
};

document.querySelector(':root').style
    .setProperty('--windowwidth', window.innerWidth+'px');

window.addEventListener('resize', function(event){
  document.querySelector(':root').style
    .setProperty('--windowwidth', window.innerWidth+'px');
});

/*
## Functions
*/

/*
### Navigation Functions
- Filter events
- Event Listener for Filter Buttons
- Change and get Active filter button
*/
function addGenNav(newGen){
	const genEle = document.createElement("li");
	const genBtn = document.createElement("button");
	genBtn.classList.add("filter-btn");
	genBtn.setAttribute("name", newGen);
	genBtn.addEventListener('click', clickFilter);
	genBtn.innerHTML = newGen;
	genEle.appendChild(genBtn);
	return(genEle);
};
function filterEvents(clickedFilterName) {
  if (clickedFilterName === "All") {
    loadAll();
    return;
  };
  genList.forEach((gaem) => {
    const generation = gaem.name;
    gaem.setAttribute("hidden", "");
    if (clickedFilterName === generation) {
	/*
	  gaem.innerHTML += addPkmnImg(gaem);
   	*/
	  	gaem.removeAttribute("hidden");	  
    };
  });
};
function clickFilter(event) {
  if(debug){console.log("Clicked: " + event.target);}
  if (!document.startViewTransition) {
    changeActive(event.target);
    filterEvents(event.target.name);
    return;
  };
  document.startViewTransition(() => {
    changeActive(event.target);
    filterEvents(event.target.name);    
  });
};
function changeActive(clickedButton) {
	if(clickedButton.contains("active")){return;}
  activeButton.classList.remove("active");
  clickedButton.classList.add("active");
  getActiveButton();
};
function getActiveButton() {
  activeButton = filterList.querySelector(".active");
};

	### Onload
*/

function loadAll() {
  genList.forEach((gaem) => {
    const generation = gaem.name;
  	gaem.removeAttribute("hidden");
  });
};

/*
	### Insert Functions
 	- Img
  	- generation to main
    - pokes to generation
	- pokeinfo to poke
*/
function addPkmnImg(pkmnno, name, gaem) {
	const imgEle = document.createElement("img");
	let temString = imglinks[gaem];
	temString = temString.replace(/000/g, pkmnno);
	imgEle.src = temString;
	imgEle.alt = name;
	return (imgEle);
};
function addGeneration(fromGen, pkmnList) {
	const pkmnlistEle = document.createElement("ul");
	pkmnlistEle.classList.add("pkmn-list");
	pkmnlistEle.classList.add(fromGen);
	pkmnList.forEach((poke) => {
		pkmnlistEle.appendChild(addPkmnInfo(poke, fromGen));
	});
	return pkmnlistEle;
};
function addPkmnInfo(Pkmninfo, gen) {
	if(debug){console.log(Pkmninfo, gen)}
	const pokeEle = document.createElement("li");
	pokeEle.classList.add("pkmn");
	const pokeInfoEle = document.createElement("div");
	pokeInfoEle.classList.add("pkmn-info");
	const pokeInfoHead = document.createElement("h3");
	pokeInfoHead.classList.add("pkmn-name");
	const pokeInfoNick = document.createElement("span"), pokeInfoNature = document.createElement("span");
	pokeInfoNick.classList.add("pkmn-nick");
	pokeInfoNick.innerHTML = Pkmninfo.nick;
	pokeInfoNature.classList.add("pkmn-nature");
	pokeInfoNature.innerHTML = Pkmninfo.nature;
	pokeInfoHead.appendChild(pokeInfoNick);
	const theEle = document.createElement("span");
	theEle.innerHTML = " the ";
	pokeInfoHead.appendChild(theEle);
	pokeInfoHead.appendChild(pokeInfoNature);
	const pokeMovesEle = document.createElement("ul");
	pokeMovesEle.classList.add("pkmn-info-moves");
	Pkmninfo.moves.forEach((move) => {
		const movesEle = document.createElement("li");
		movesEle.classList.add("pkmn-move");
		movesEle.innerHTML = move;
		pokeMovesEle.appendChild(movesEle);
	});
//	For each poke
//	Create list item
//	  Inside poke-info,
//	    Fill innerHTML of pkmn-nick, pkmn-nature
//	    Fill innerHTML of each list item (move)
	pokeInfoEle.appendChild(pokeInfoHead);
	pokeInfoEle.appendChild(pokeMovesEle);
	pokeEle.appendChild(pokeInfoEle);
	pokeEle.appendChild(addPkmnImg(Pkmninfo.num, Pkmninfo.name, gen));
	return pokeEle;
};
/* Async Import */
const debugLine = document.querySelector("#inserthere");
const JSONfile = 'pkmnteams.json';

function importAllTeams() {
	fetch(JSONfile)
  		.then((res) => {
   			return res.json();
  		}).then((importData) => {
			debugLine.innerHTML = "Data Imported.";
			Object.entries(importData).forEach(([i, j]) => {
				filterList.appendChild(addGenNav(i));
				mainEle.appendChild(addGeneration(i, j))
			})
			filterButtons = filterList.querySelectorAll(".filter-btn");
			
			if(debug){console.log(genList)}
  		}).catch(err => {
	  		console.log("Hmm, this problem happened...: " + err)
			return '404';
  		});
};
