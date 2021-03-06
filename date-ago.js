if(NodeList.prototype.forEach === undefined){
    NodeList.prototype.forEach = function(callback){
        [].forEach.call(this, callback);
    }
}

var terms = [{
    time: 45,
    divide: 60,
    text: "moins d'une minute"
},{
    time: 90,
    divide: 60,
    text: "environ une minute"
},{
    time: 45 * 60,
    divide: 60,
    text: "%d minutes"
},{
    time: 90 * 60,
    divide: 60 * 60,
    text: "environ une heure"
},{
    time: 24 * 60 * 60,
    divide: 60 * 60,
    text: "%d heures"
},{
    time: 42 * 60 * 60,
    divide: 24 * 60 * 60,
    text: "environ un jour"
},{
    time: 30 * 24 * 60 * 60,
    divide: 24 * 60 * 60,
    text: "%d jours"
},{
    time: 45 * 24 * 60 * 60,
    divide: 24 * 60 * 60 * 30,
    text: "environ un mois"
},{
    time: 365 * 24 * 60 * 60,
    divide: 24 * 60 * 60 * 30,
    text: "%d mois"
},{
    time: 365 * 1.5 * 24 * 60 * 60,
    divide: 24 * 60 * 60 * 365,
    text: "environ un ans"
},{
    time: Infinity,
    divide: 24 * 60 * 60 * 365,
    text: "%d ans"
}];

document.querySelectorAll('[date-ago]').forEach(function (node){
    function setTimeAgo(){

        var seconds = Math.floor((new Date()).getTime() / 1000 - parseInt(node.getAttribute('date-ago'), 10));
        var prefix  = seconds > 0 ? 'Il y\'a ' : 'Dans ';
        var term    = null;

        seconds = Math.abs(seconds);

        for(term of terms){
            if(seconds < term.time){
                break;
            }
        }

        node.innerHTML = prefix + term.text.replace('%d', Math.round(seconds / term.divide));

        var nextTrigger = seconds % term.divide;

        if(nextTrigger === 0){
            nextTrigger = term.divide;
        }

        window.setTimeout(function(){
            if(node.parentNode){
                if(window.requestAnimationFrame){
                    window.requestAnimationFrame(setTimeAgo);
                }else{
                    setTimeAgo();
                }
            }
        }, nextTrigger * 1000);
    }
    setTimeAgo();
});