//PART ONE

BASE_URL = "http://numbersapi.com"
let num = 27;
// //1.
$.getJSON(`${BASE_URL}/${num}?json`).then(res => console.log(res))

// //2.
let luckyNums = [10, 27, 87];
$.getJSON(`${BASE_URL}/${luckyNums}?json`).then(data => console.log(data))

// //3. 
// function fourNums(){
// axios.get(`${BASE_URL}/${num}`)
//     .then(res => {
//         console.log(res);
//         res => $('body').append(`<p>${data.text}</p>`)
//         return axios.get(`${BASE_URL}/${num}`);
//     })
//     .then(res => {
//         console.log(res)
//         return axios.get(`${BASE_URL}/${num}`);
//     })
//     .then(res => {
//         console.log(res)
//         return axios.get(`${BASE_URL}/${num}`);
//     })
//     .then(res => {
//         console.log(res)
//         return axios.get(`${BASE_URL}/${num}`);
//     })
    // .then(res => {
    //     res.forEach(data => $('body').append(`<p>${data.text}</p>`))
    // })
// }
// fourNums();

//Correct answer
Promise.all(
    Array.from({ length: 4 }, () => {
      return $.getJSON(`${BASE_URL}/${num}?json`);
    })
  ).then(facts => {
    facts.forEach(data => $("body").append(`<p>${data.text}</p>`));
  });

// **********************************************************************
//      PART TWO
// **********************************************************************
$(function() {
let baseURL = 'http://deckofcardsapi.com/api/deck'

//1. 
$.getJSON(`${baseURL}/new/draw/?count=1`).then(data => {
    let { suit, value } = data.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`)
});

//2.
let firstCard = null;
$.getJSON(`${baseURL}/new/draw/`)
    .then(data => {
        firstCard = data.cards[0];
        let deckId = data.deck_id;
        return $.getJSON(`${baseURL}/${deckId}/draw/`);
    })
    .then(data => {
        let secondCard = data.cards[0];
        [firstCard, secondCard].forEach(function(card){
            console.log(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`)
        });
    });

//3. 
let deckId = null;
let $btn = $('button');
let $cardArea = $('#card-area');

$.getJSON(`${baseURL}/new/shuffle/`).then(data => {
    deckId = data.deck_id;
    $btn.show();
  });

  $btn.on('click', function() {
    $.getJSON(`${baseURL}/new/shuffle`).then(data => {
        let cardSrc = data.cards[0].image;
        let angle = Math.random() * 90 - 45;
        let randomX = Math.random() * 40 - 20;
        let randomY = Math.random() * 40 - 20;
        $cardArea.append(
            $('<img>', {
                src: cardSrc,
                css: {
                    transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
                }
            })
        );
        if (data.remaining === 0) $btn.remove();
    });
})
});
