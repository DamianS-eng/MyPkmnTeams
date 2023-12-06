const insEle = document.querySelector("#inserthere");
fetch('pkmnteams.json')
  .then(res => {
    return res.json();
  })
  .then(data => {
    console.log(data);
		insEle.innerHTML = data;
  })
  .catch(err => console(err));
