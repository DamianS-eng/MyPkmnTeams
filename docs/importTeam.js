const insEle = document.querySelector("#inserthere");
fetch('pkmnteams.json')
  .then(res => {
    return res.json();
  })
  .then(data => {
    console.log(data);
		insEle.innerHTML = "Data Imported.";
  })
  .catch(err => console("Hmm, this problem happened...: " + err));
