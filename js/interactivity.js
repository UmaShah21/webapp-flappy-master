var scores = [];
var playerName = '';
var scoreEntry = '';
jQuery("#scoresbtn").on("click", function() {
    jQuery("#content").empty();
    jQuery("#content").append(
        "<ul>" +
            "<li class=gold>" + scores[0] + "</li>" +
            "<li class=silver>" + scores[1] + "</li>" +
            "<li class=bronze>" + scores[2] + "</li>" +
        "</ul>"
    );
});

jQuery("#creditsbtn").on("click", function() {
    jQuery("#content").empty();
    jQuery("#content").append(
        "<div>" + "Game created by Uma Shah!" + "</div>"
    );
});

jQuery("#helpbtn").on("click", function() {
    jQuery("#content").empty();
    jQuery("#content").append(
        "<ul>"
            + "<li>" + "Press SPACE to flap your wings" + "</li>"
            + "<li>" + "Avoid the incoming pipes" + "</li>"
        + "</ul>"
    );
});


function registerScore(score) {
  scores.sort(compareSecondColumn);
  var playerName = prompt("What's your name?");
  var scoreEntry =  playerName + ": " + score.toString();
  scores.push([playerName,score]);
}


function compareSecondColumn(a, b) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] > b[1]) ? -1 : 1;
    }
}
