// Config for front end:
const mobileSizeInPx = 425; // if you change mobileSizeInPx, make sure to change the media query in style.scss!
const notesToDisplayOnMobile = 16; // if either of these are changed, the grid in the stylesheet needs to be changed.
const notesToDisplayOnDesktop = 20;

// Run on page load is finished
$(document).ready(function() {
    function addNotesToPage() {
        let numberOfNotesToDisplay;

        // Check to see if the screen width is larger or smaller than mobileSizeInPx
        if($(window).width() <= mobileSizeInPx) {
            // Display notes on mobile
            console.log("Screen width is less than", mobileSizeInPx + "px.");
            numberOfNotesToDisplay = notesToDisplayOnMobile;
        } else {
            // Display notes on desktop
            console.log("Screen width is greater than", mobileSizeInPx + "px.");
            numberOfNotesToDisplay = notesToDisplayOnDesktop;
        }

        // creates random notes from the database
        function displayNotes() {
            // ajax to load an array of random notes
            $.get("api/notes", function(data) {
                // randomNotes is an array
                let randomNotes = data;
        
                // Render notes onto the note wall
                for (let i = 0; i < numberOfNotesToDisplay; i++) {
                    if(randomNotes[i] == undefined) {break}; // Break if there aren't enough notes to display on page
                    $("#note-wall-container").append(`<div class="wallnote" data-note-id=${randomNotes[i].id}><img src="assets/svg/sticky_note_white.svg" alt="note"></img></div>`);           
                }
                // after done rendering notes, play Initial Note Animation
                initialNoteRenderAnim();
            }); 

        }
        displayNotes();
}
    function getAmountOfNotesInDatabase() {
        // ajax query to api/notes/count
        $.get("api/notes/count", function(data) {
            let numberOfNotes = data;
            $("#total-notes").append(numberOfNotes);
        })
    }

    addNotesToPage();
    getAmountOfNotesInDatabase();
});
// END OF "RUN ON PAGE LOAD FINISH"

function showNote() {
    
    $("#modal-new-wrapper").css("display", "none");
    $("#modal-read-wrapper").css("display", "block");
    
    let noteId = $(this).data("note-id");
    
    $.get(`api/notes/${noteId}`, function(data) {
        
        $("#modal-views-int").text(data.views);
        $("#modal-text").text(data.text);
        openModalAnim(noteId);
    })

}

function showCreateNoteModal() {
    $("#modal-new-wrapper").css("display", "block");
    $("#modal-read-wrapper").css("display", "none");
    openModalAnim();
}

function reloadPage() {
    location.reload();
}

$("body").on("click", ".wallnote", showNote);
$("body").on("click", "#create-note", showCreateNoteModal);
$("body").on("click", "#more-notes", reloadPage);