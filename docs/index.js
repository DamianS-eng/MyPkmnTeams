/*
	Each Pkmn is a data object with:
		pkmn sprite retrieved from species name
		nickname the nature
		four moves in a sub-grid
*/
//FYI, try to grab the text from the available elements inside the nav list, then give the filter and category names respectfully//
// On November 2023, startViewTransition does not work on Safari or Firefox, don't bother with ViewAPI

const filterList = document.querySelector(".filter");
const filterButtons = filterList.querySelectorAll(".filter-btn");
const titles = document.querySelectorAll(".pkmn");
const mainEle = document.querySelector("main");
let activeButton = filterList.querySelector(".active");

const genList = document.querySelectorAll(".pkmn-list");

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

function clickFilter(e) {
  const clickedButton = e.dataset.filter;
  // console.log("Clicked: " + clickedButton);
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
function loadAll() {
	titles.forEach((gaem) => {
		if (gaem.querySelector("img")){
			gaem.querySelector("img").remove();
		};
    		gaem.removeAttribute("hidden");
  	});
};
/*
function addPkmnImg(gaem) {
	let temString = imglinks[gaem.dataset.category];
	temString = temString.replace(/000/g,gaem.dataset.pkmnno);
	return ('<img ' + temString + ' alt= '+ gaem.dataset.pkmnname +'>');
};
*/
function addGeneration(fromGen) {
	const pkmnlistEle = document.createElement("ul");
	pkmnlist.classList.add("pkmn-list");
	//pkmnlist.classList.add(gen);
	fromGene.forEach((poke) => {
		pkmnlist.appendChild(addPkmnInfo(i));
	});
	mainEle.appendChild(pkmnlistEle)	
};
function addPkmnInfo(Pkmninfo) {
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
	return pokeEle;
};
function filterEvents(clickedFilter) {
  if (clickedFilter === "All") {
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
console.log(genList)
