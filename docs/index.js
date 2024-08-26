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
const genList = document.querySelectorAll(".pkmn-list");
let filterButtons = filterList.querySelectorAll(".filter-btn");
let activeButton = filterList.querySelector(".active");
let pokes = document.querySelectorAll(".pkmn");

/* gaem.dataset.pkmn-no*/
const sitesource = 'https://serebii.net';
const imglinks = {
	Gen1: 	'src="'+ sitesource + '/pokearth/sprites/rb/'+ '000' + '.png"',
	Gen2: 	'src="'+ sitesource + '/pokearth/sprites/gold/'+ '000' + '.png"',
	Gen3: 	'src="'+ sitesource + '/emerald/pokemon/'+ '000' + '.png"',
	Colloseum: 'src="'+ sitesource + '/emerald/pokemon/'+ '000' + '.png"',
	Gen4: 	'src="'+ sitesource + '/pokearth/sprites/hgss/'+ '000' + '.png"',
	Gen6: 	'src="'+ sitesource + '/xy/pokemon/'+ '000' + '.png"',
	Legends: 'src="'+ sitesource + '/swordshield/pokemon/'+ '000' + '.png"'
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
function filterEvents(clickedFilter) {
  if (clickedFilter.name === "All") {
    loadAll();
    return;
  };
  titles.forEach((gaem) => {
    const gaemCategory = gaem.dataset.category;
    gaem.setAttribute("hidden", "");
		if (gaem.querySelector("img")){
			gaem.querySelector("img").remove();
		};
    if (clickedFilter === gaemCategory) {
	/*
	  gaem.innerHTML += addPkmnImg(gaem);
   	*/
	  gaem.removeAttribute("hidden");	  
    };
  });
};
function clickFilter(e) {
  const clickedButton = e.name;
  if(debug){console.log("Clicked: " + clickedButton);}
  if (!document.startViewTransition) {
    changeActive(e);
    filterEvents(clickedButton);
    return;
  };
  document.startViewTransition(() => {
    changeActive(e);
    filterEvents(clickedButton);    
  });
};
function changeActive(clicked) {
  activeButton.classList.remove("active");
  clicked.classList.add("active");
  getActiveButton();
};
function getActiveButton() {
  activeButton = filterList.querySelector(".active");
};
/*
	### Onload
*/

	/*
 		This may need to be an await function to wait on the .json load.
function loadAll() {
	pokes = document.querySelectorAll(".pkmn");
	pokes.forEach((gaem) => {
/*		
		if (gaem.querySelector("img")){
			gaem.querySelector("img").remove();
		};

    		gaem.removeAttribute("hidden");
  	});
};
*/
/*
	### Insert Functions
 	- Img
  	- generation to main
    - pokes to generation
	- pokeinfo to poke
*/
function addPkmnImg(pkmnno, name, gaem) {
	let temString = imglinks[gaem];
	if(debug){console.log(temString)};
	temString = temString.replace(/000/g,pkmnno);
	return ('<img ' + temString + ' alt= '+ name +'>');
};
function addGeneration(fromGen) {
	const pkmnlistEle = document.createElement("ul");
	pkmnlistEle.classList.add("pkmn-list");
	pkmnlistEle.classList.add(Object.keys(fromGen));
	fromGen.forEach((poke) => {
		pkmnlistEle.appendChild(addPkmnInfo(poke, Object.keys(fromGen)));
	});
	return pkmnlistEle;
};
function addPkmnInfo(Pkmninfo, gen) {
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
	pokeInfoHead.innerHTML = pokeInfoNick + " the " + pokeInfoNature;
	const pokeMovesEle = document.createElement("ul");
	pokeMovesEle.classList.add("pkmn-info-moves");
	Pkmninfo.moves.forEach((move) => {
		const moveEle = document.createElement("li");
		moveEle.classList.add("pkmn-move");
		moveEle.innerHTML = move;
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

async function importAllTeams () {
	let importList = await fetch(JSONfile)
  		.then(res => {
   			return res.json();
  		})
  		.then(importData => {
			debugLine.innerHTML = "Data Imported.";
			return importData;
  		})
  		.catch(err => {
	  		console("Hmm, this problem happened...: " + err)
			return [];
  		});
	importData.forEach((gen) => {
		mainEle.appendChild(addGeneration(gen));
	});
	if(debug){console.log(importData);}
	if(debug){console.log(genList);}
};
