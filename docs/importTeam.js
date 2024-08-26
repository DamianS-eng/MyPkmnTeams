const debugLine = document.querySelector("#inserthere");

const JSONfile = 'pkmnteams.json';
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

fetch(JSONfile)
  .then(res => {
    return res.json();
  })
  .then(importData => {
    console.log(importData);
	debugLine.innerHTML = "Data Imported.";
  })
  .catch(err => console("Hmm, this problem happened...: " + err));
