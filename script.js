// let date=1234;
let date = new Date().getTime();
let hashkey = date + 'e307cd53423c64fb2fb92361007094bd' + '3fe57cab63bc482b87d3f803599f763df9e2bdbb'
let key = CryptoJS.MD5(hashkey).toString();
let btn = document.getElementById('btn');
let display = document.getElementById('display');
let userInput = document.getElementById('search-box');
let favbtn = document.getElementById('favorites');
favbtn.addEventListener('click', displayFav);
btn.addEventListener('click', fetchData);
display.addEventListener('click', addList);
display.addEventListener('click', heroStory);
display.addEventListener('click', removeHero);

// fetching
function fetchData() {
    const xhr = new XMLHttpRequest();
    if (userInput.value == '') {
        xhr.open('GET', `https://gateway.marvel.com/v1/public/characters?&apikey=e307cd53423c64fb2fb92361007094bd&hash=${key}`, true);
        xhr.send();
        xhr.onload = function () {
            var data = JSON.parse(xhr.response);
            console.log(data);
            let html = '';
            console.log("first func",data.data.results);
            console.log(data.data.results.length);
            if (data.data.results.length > 0) {
                data.data.results.forEach(result => {
                    html += `<div class="card" result-id=${result.id}>
                <div class="img">
                    <img src="${result.thumbnail.path}.jpg" alt="">
                </div>
                <div class="details">
                <h3 class="heroname">${result.name}</h3>
                </div>
                <button id="add-btn" class="fav">ADD</button>
                </div>`
                });
                display.classList.remove('notfound');
                display.classList.remove('notfound2');
                display.classList.remove('details');
                // console.log(display);

            }
            else {
                console.log("IN ELSE");
                html += '<h1>Not available or try to search with proper indentation</h1>'
                display.classList.add('notfound2');
                display.classList.remove('notfound');
            }
            display.innerHTML = html;
        }
        xhr.onerror = function () {
            console.log("error");
        }
    } else {


        console.log("RUNNING FUNCTION");
        xhr.open('GET', `https://gateway.marvel.com/v1/public/characters?name=${userInput.value}&apikey=e307cd53423c64fb2fb92361007094bd&hash=${key}`, true);
        xhr.send();
        xhr.onload = function () {
            var data = JSON.parse(xhr.response);
            console.log(data);
            let html = '';
            console.log(data.data.results);
            // console.log(data.data.results.length);
            if (data.data.results.length > 0) {
                data.data.results.forEach(result => {
                    html += `<div class="card" result-id=${result.id}>
                <div class="img">
                    <img src="${result.thumbnail.path}.jpg" alt="">
                </div>
                <div class="details">
                <h3 class="heroname">${result.name}</h3>
                </div>
                <button id="add-btn" class="fav">ADD</button>
                </div>`
                });
                display.classList.remove('notfound');
                display.classList.remove('notfound2');
                display.classList.remove('details');
                // console.log(display);

            }
            else {
                console.log("IN ELSE");
                html += '<h1>Not available or try to search with proper indentation</h1>'
                display.classList.add('notfound2');
                display.classList.remove('notfound');
            }
            display.innerHTML = html;
        }
        xhr.onerror = function () {
            console.log("error");
        }
    }
}

// backdtroy
function heroStory(e) {
    let html = '';
    e.preventDefault();
    console.log("DISPLAY STORY");
        let heroId = e.target.parentElement.parentElement.getAttribute('result-id');
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `https://gateway.marvel.com:443/v1/public/characters/${heroId}?apikey=e307cd53423c64fb2fb92361007094bd&hash=${key}`, true);
        xhr.send();
        xhr.onload = function () {
            var data = JSON.parse(xhr.response);
            // let html = '';
            console.log("a heroo",data.data.results);
            if (data.data.results.length > 0) {
                console.log("LOADING THE CONTENT of story");
                data.data.results.forEach(result => {
                    if (result.description === '') {
                        alert('No story available');
                    }
                    html += `<div class="card" result-id=${result.id}>
                <div class="img">
                    <img src="${result.thumbnail.path}.jpg" alt="">
                </div>
                <div class="details">
                <h3 class="heroname">${result.name}</h3>
                <span class="reality">${result.description}</span>
                </div>
                <button id="add-btn" class="fav">ADD</button>
                </div>`
                });
                display.classList.remove('notfound');
                display.classList.remove('notfound2');
                // console.log(display);

            } else {
                console.log("IN ELSE");
                html += '<h1>No Story Available</h1>'
                display.classList.add('notfound2');
                display.classList.remove('notfound');
            }
            display.innerHTML = html;
        }
   

}

// favorite add
let favorites = [];
let finalList = [];
function addList(e) {
    e.preventDefault(e)
    console.log("FUnction Invoked");
    if (e.target.classList.contains('fav')) {
        let heroId = e.target.parentElement.getAttribute('result-id');
        favorites.push(heroId);
        alert("Added to favorites");
        let List = [... new Set(favorites)];
        finalList = List;
    }

}

// display favorite

function displayFav(e) {
    e.preventDefault(e);
    if (finalList.length <= 0) {
        display.innerHTML = '<h1>There is nothing in Favorites</h1>'
        display.classList.add('notfound');
        display.classList.remove('notfound2');
    }
    else {
        display.classList.remove('notfound');
        let html = '';
        finalList.forEach(x => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', `https://gateway.marvel.com:443/v1/public/characters/${x}?apikey=e307cd53423c64fb2fb92361007094bd&hash=${key}`, true);
            xhr.send();
            xhr.onload = function () {
                var data = JSON.parse(xhr.response);

                console.log("LOADING THE CONTENT");
                data.data.results.forEach(result => {
                    html += `<div class="card" result-id=${result.id}>
                        <div class="img">
                            <img src="${result.thumbnail.path}.jpg" alt="">
                        </div>
                        <div class="details">
                        <h3 class="heroname">${result.name}</h3>
                        </div>
                        <button id="remove-btn" class="remove">Remove</button>
                        </div>`
                });
                display.classList.remove('notfound');
                display.classList.remove('notfound2');


                display.innerHTML = html;
            }
        })
    }
}



function removeHero(e) {
    e.preventDefault(e)
    console.log("FUnction Invoked");
    if (e.target.classList.contains('remove')) {
        let heroId = e.target.parentElement.getAttribute('result-id');
        let newList = finalList.filter((n) => { return n != heroId });
        finalList = newList;
    }
    console.log("IN FAVV");
    if (finalList.length <= 0) {
        display.innerHTML = '<h1>There is nothing in Favorites</h1>'
        display.classList.add('notfound');
        display.classList.remove('notfound2');
    }
    else {
        display.classList.remove('notfound');
        let html = '';
        finalList.forEach(x => {
            console.log("huhyhyhy", x);
            const xhr = new XMLHttpRequest();
            xhr.open('GET', `https://gateway.marvel.com:443/v1/public/characters/${x}?apikey=e307cd53423c64fb2fb92361007094bd&hash=${key}`, true);
            xhr.send();
            xhr.onload = function () {
                var data = JSON.parse(xhr.response);

                console.log("LOADING THE CONTENT");
                data.data.results.forEach(result => {
                    html += `<div class="card" result-id=${result.id}>
                        <div class="img">
                            <img src="${result.thumbnail.path}.jpg" alt="">
                        </div>
                        <div class="details">
                        <h3 class="heroname">${result.name}</h3>
                        </div>
                        <button id="remove-btn" class="remove">Remove</button>
                        </div>`
                });
                display.classList.remove('notfound');
                display.classList.remove('notfound2');


                display.innerHTML = html;
            }
        })
    }
}