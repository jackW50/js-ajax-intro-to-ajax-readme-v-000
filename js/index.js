// your code here
function showRepositories() {
//To JS interpreter sees the responseText property and just sees it as a string, so we have to tell JS that it's working with JSON
//The way we tell the interpreter that we're working with JSON is to parse it with JSON.parse.
  let repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a> </li>').join('')}</ul>`;

  document.getElementById('repositories').innerHTML = repoList;
  //In this example we are parsing through the response text and creating a place in the DOM to put it.
}

function showCommits(){
  let commits = JSON.parse(this.responseText);
  console.log(commits);
  const commitsList = `<ul>${commits.map(c => '<li><strong>' + c.author.login + '</strong> -' + c.commit.message + '</li>').join('')}</ul>`;

  document.getElementById('commits').innerHTML = commitsList
}
//request a user's public repos with a GET request;
//https://api.github.com/users/:username/repos (API documentation will often use a colon to precede a dynamic value.)
function getRepositories() {
  const req = new XMLHttpRequest();//creating a new instance of an XMLHttpRequest.
  req.addEventListener('load', showRepositories);//listening for a load, and when it hits, the calback function showRepositories will be invoked.
  //The listener is being called in the request object. So when the callback function hits 'this' will will vo our XMLHttpRequest object we instantiated.
  req.open('GET', 'https://api.github.com/users/octocat/repos');//invoke open function with 2 args: (HTTP verb, URI)
  req.send();//Once the request is set up and ready to go, we call send to send it to server.
}
//In this request the dynamic value is 'octocat' (username).

function getCommits(el) {
  const name = el.dataset.repo;
  const req = new XMLHttpRequest();
  req.addEventListener('load', showCommits);
  req.open('GET', 'https://api.github.com/repos/octocat/' + name + '/commits');
  req.send();
}
