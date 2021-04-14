window.addEventListener('DOMContentLoaded', function() {

    console.log('DOM fully loaded and parsed"')

    let inputForm = document.getElementById('github-form')
    
    inputForm.addEventListener("submit", function(e){
    e.preventDefault();

       
    let inputName=e.target[0].value
    
    let configObj = {
        method: "GET",
        headers: {
            "Content-Type": "application/vnd.github.v3+json",
            "Accept": "application/vnd.github.v3+json"
        }
    }

    let url = `https://api.github.com/search/users?q=${inputName}`

    
        fetch(url,configObj)
            .then(resp => resp.json())
            .then(json =>updateUserList(json))

    
    function updateUserList(inputData){
        let arr = inputData.items                
        arr.forEach(element => {
            let ul = document.getElementById('user-list')
            let li = document.createElement("li")
            li.id = element.login
            li.innerHTML=`login: ${element.login}, avatar:<img src=${element.avatar_url} alt=${element.login} width="50" height="60">, URL:<a href=${element.html_url} target=_blank>Web Link</a>`
            li.addEventListener('click',function(){
                fetch(`https://api.github.com/users/${inputName}/repos`)
                    .then(resp => resp.json())
                    .then(json => repoFunc(json));
            })
            ul.appendChild(li);
        });        
    } 
    e.target[0].value=""
   
});

    function repoFunc(dataRepo){                       
        dataRepo.forEach(element => {
            let ul = document.getElementById('repos-list')
            let li = document.createElement("li")
            li.id = element.owner.login
            li.innerHTML=`name: ${element.name}, URL:<a href=${element.html_url} target=_blank>Web Link</a>`
            ul.appendChild(li);
        });
    }




})