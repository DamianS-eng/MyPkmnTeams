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
let activeButton = filterList.querySelector(".active");

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
	gaem.innerHTML += addPkmnImg(gaem);
    gaem.removeAttribute("hidden");
  });
}
function addPkmnImg(gaem) {
	let temString = imglinks[gaem.dataset.category];
	temString = temString.replace(/000/g,gaem.dataset.pkmnno);
	return ('<img ' + temString + ' alt= '+ gaem.dataset.pkmnname +'>');
};
function addPkmnInfo(Pkmninfo) {
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
	  gaem.innerHTML += addPkmnImg(gaem);
	  gaem.removeAttribute("hidden");	  
    };
  });
};