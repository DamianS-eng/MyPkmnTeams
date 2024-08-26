const debugLine = document.querySelector("#inserthere");
let importList = {};
const JSONfile = 'pkmnteams.json';
/*
/ * Deprecated * /

const getJSON = function(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      if (xhr.status === 200) {
        callback(null, xhr.response);
	return;
      } 
	callback(status, xhr.response);
    };
    xhr.send();
};

getJSON(JSONfile, function(err, importTeam) {
	if (err !== null) {
		alert("Hmm..." + err);
		return;
	}
	for (const gen in importTeam) {
		console.log(`${gen}: ${importTeam[gen].length} pokes`);
		for (const poke in importTeam[gen]){
  			console.log(`${importTeam[gen][poke].name}`);
  		};
	};
});
*/
importList = fetch(JSONfile)
  .then(res => {
    return res.json();
  })
  .then(importData => {
	debugLine.innerHTML = "Data Imported.";
	return importData;
  })
  .catch(err => {
	  console("Hmm, this problem happened...: " + err)
	  /* importTeam = {}; */
  });
