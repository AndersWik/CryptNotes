
const {ipcRenderer} = require('electron');

var end;
var expired;

$("#lock input").focus();

$("#unlockInput").keyup(function(e){ 
    
    var code = e.which;

    if(code==13) {
        e.preventDefault();
    }

    if(code==32||code==13||code==188||code==186) {
        
        $("#unlock").trigger( "click" );
    }
});

$("#unlock").on("click", function() {

    let text = $("#lock").find("input").val();
    $("#lock").find("input").val("");
    let result = ipcRenderer.sendSync('unlock', text);

    if(result) {

        updateNotes(result);
        unlock();
    }
});

$("#addNew").on("click", function() {

    hideNotes();
    showAdd();
});

$("#addNewDiscard").on("click", function() {

    hideAdd();
    showNotes();
});

$("#addNewSave").on("click", function() {

    var label = $("#add input").val();
    var content = $("#add textarea").val();
    let name = ipcRenderer.sendSync('addNewSave', {label: label, content: content});

    if(name) {

        noteAdd(name, label, content);
        hideAdd();
        showNotes();
    }
});

$("#discardAll").on("click", function() {

    let data = ipcRenderer.sendSync('discardAll', 'discardAll');

    if(data) {

        deleteNotes();
    }
});

$(document).on("click", ".noteCopy", function(){

    let text = $(this).siblings(".content").html();
    let data = ipcRenderer.sendSync('noteCopy', text);
    let fadeBack = function(){ $(this).fadeTo(500, 1.0); }
    $(this).fadeTo(100, 0.3, fadeBack);
});

$(document).on("click", ".noteEdit", function(){

    let name = $(this).siblings(".name").html();
    let label = $(this).siblings(".label").html();
    let content = $(this).siblings(".content").html();
    
    hideNotes();
    showEdit(name, label, content);
});

$(document).on("click", ".noteDiscard", function(){

    let name = $(this).siblings(".name").html();
    let data = ipcRenderer.sendSync('noteDiscard', name);

    if(data) {

        $(this).parent('div').parent('.note').remove();
    }
});

$(document).on("click", "#editSave", function(){

    let name = $(this).parent('div').parent('div').siblings(".name").html();
    let label = $(this).parent('div').parent('div').siblings("input").val();
    let content = $(this).parent('div').parent('div').siblings("textarea").val();
    let data = ipcRenderer.sendSync('noteEdit', {name: name, label: label, content: content});

    if(data) {
        
        name = name.replace('.txt','');
        let note = $("#notes .note .name."+name);
        note.siblings(".label").text(label);
        note.siblings(".content").text(content);
        let obfuscated = new Array(content.length + 1).join('*');
        note.siblings(".obfuscated").text(obfuscated);

        hideEdit();
        showNotes();
    }
});

$(document).on("click", "#editDiscard", function(){

    let name = $(this).parent('div').parent('div').siblings(".name").html();
    let data = ipcRenderer.sendSync('noteDiscard', name);

    if(data) {

        name = name.replace('.txt','');
        $("#notes .note .name."+name).parent('div').parent('.note').remove();

        hideEdit();
        showNotes();
    }
});

$(document).on("click", "#editExit", function(){

    hideEdit();
    showNotes();
});

$(document).on("click", "#lockup", function(){

    lock();
});

$(document).on("click", "body", function(){

    end = new Date(Date.now() + 5*60000);
});

function showAdd() {

    $("#add").show();
    $("#add textarea").focus();
}

function hideAdd() {

    $("#add input").val("");
    $("#add textarea").val("");
    $("#add").hide();
}

function noteAdd(name, label, content) {

    let note = $("#template .note").clone();
    note.find(".label").html(label);
    note.find(".name").html(name);
    name = name.replace('.txt','');
    note.find(".name").addClass(name);
    note.find(".content").html(content);
    let obfuscated = new Array(content.length + 1).join('*');
    note.find(".obfuscated").text(obfuscated);
    note.appendTo("#notes");
}

function showEdit(name, label, content) {

    $("#edit .name").html(name);
    $("#edit input").val(label);
    $("#edit textarea").val(content);
    $("#edit").show();
    $("#edit textarea").focus();
}

function hideEdit() {

    $("#edit name").html("");
    $("#edit input").val("");
    $("#edit textarea").val("");
    $("#edit").hide();
}

function showNotes() {

    $("#notes").show();
    $("#controls").show();
}

function hideNotes() {

    $("#notes").hide();
    $("#controls").hide();
}

function deleteNotes() {

    $("#notes").html("");
}

function updateNotes(notes) {

    for (let i in notes) {

        if (typeof notes[i].name !== 'undefined' && 
            typeof notes[i].content !== 'undefined') {

            let name = notes[i].name;
            let label = notes[i].label;
            let content = notes[i].content;

            noteAdd(name, label, content);
        }
    }
}

function lock() {

    stopCounter();

    $("#lock .lockOff").hide();
    $("#lock .lockOn").show();
    
    hideAdd();
    hideEdit();
    
    hideNotes();
    deleteNotes();

    $("#lock").show();
    $("#lock input").focus();
}

function unlock() {

    startCounter();

    $("#lock .lockOn").hide();
    $("#lock .lockOff").show();

    setTimeout(function() {

        $("#lock").hide();
        showNotes();
    }, 1000);
}

function startCounter() {

    end = new Date(Date.now() + 5*60000);
    $("#expiration").removeClass("red");

    expired = setInterval(function() {

        let now = new Date().getTime();
        
        let remaining = end - now;
    
        let min = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        let sec = Math.floor((remaining % (1000 * 60)) / 1000);

        if(min < 1 && sec < 31) {
            $("#expiration").addClass("red");
        } else {
            $("#expiration").removeClass("red");
        }

        if(min < 10) {
            min = '0'+min;
        }

        if(sec < 10) {
            sec = '0'+sec;
        }

        let text = '<i class="fas fa-exclamation"></i> '+min+":"+sec;

        $("#expiration").html(text);

        if (remaining < 0) {
            lock();
        }

    }, 1000);
}

function stopCounter() {

    clearInterval(expired);
}