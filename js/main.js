document.addEventListener('DOMContentLoaded', startPage)
document.addEventListener('click', newTweet)

//setting global variables
var proverbDIV
var translationDIV

function startPage() {
  proverbDIV = $('#proverb')
  translationDIV = $('#translation')
  changeColors();
  newProverb ();
}

function changeColors() {
    var colors = [
        '#16a085',
        '#27ae60',
        '#f39c12',
        '#e74c3c',
        '#9b59b6',
        '#FB6964',
        "#BDBB99",
        "#77B1A9",
        "#73A857"
    ];
    var newColor = Math.floor(Math.random() * colors.length);
    console.log('Setting Background Color: ' + colors[newColor])
    $("body").css({'background-color': colors[newColor], color: colors[newColor]});
    $(".button, .button > img").css({'background-color': colors[newColor], color: '#fff'});
}

function newProverb() {
    console.log("Requesting New Proverb");
    // delete existing proverb and translation
    proverbDIV[0].innerHTML = "";
    translationDIV[0].innerHTML = "";
    // fetch new proverb
    fetchProverb();
}

function fetchProverb() {
    $.ajax({
        type: 'GET',
        url: 'https://eda-te-reo.herokuapp.com/api/proverbs',
        success: function(data) {
            var newMaoriProverb = data.source;
            var newEnglishTranslation = data.translation;
            proverbDIV.append('<h2>' + newMaoriProverb + "</h2>");
            translationDIV.append('<p>' +
                'English Translation - ' +
                '</br>' +
                '<i>' + newEnglishTranslation + '</i>' + '</p>');
        }
    });
}

function newTweet() {
    if (event.target.id === "tweetProverb") {
        console.log("Retweeting Proverb");
        var proverbText = proverbDIV[0].innerText
        $('.twitter-share-button').attr('href', 'https://twitter.com/intent/tweet?hashtags=freecodecamp&text=' + proverbText)
        $('.twitter-share-button').attr('target', '_blank')
    }
}
