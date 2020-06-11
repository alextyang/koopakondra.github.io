
function handleKeyPress(e) {
    var key = e.keyCode || e.which;
    var text = document.getElementById("keywords").value.replaceAll("+", "%2B");
    var option = text.substr(1, text.indexOf(' ') - 1) || text.substr(1);
    var subtext = text.substr(2 + option.length);
    if (key == 13) { // Search functions
        search(text);
    }

    if (text.trim().length < 2 && key === 8){
        document.getElementById("keywords").style = "border-color: rgba(159, 159, 159, 1);";
    }
    else {
        document.getElementById("keywords").style = "border-color: rgba(159, 159, 159, 0.1);";
    }


    

}

function search(text) {
    var option = text.substr(1, text.indexOf(' ') - 1) || text.substr(1);
    var subtext = text.substr(2 + option.length);

    if (selectedLink != null) {
        window.location = selectedLink;
    }
    else if (validURL(text)) {
        if (containsProtocol(text))
            window.location = text;
        else
            window.location = "https://" + text;
    } else {
        window.location = "https://www.google.com/search?q=" + text;
    }
}

// Source: https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

function containsProtocol(str) {
    var pattern = new RegExp('^(https?:\\/\\/){1}.*', 'i');
    return !!pattern.test(str);
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};