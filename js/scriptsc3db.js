//-----------------------------------------------------------
//
// Wrap table in Content with div (for scrollable x-axis bar)
//
//-----------------------------------------------------------
//
function wrapTableInContent() {
  $(".Content .blockContents table").each(function() {
    const table = $(this).get()[0].cloneNode(true);
    
    const divHeader = document.createElement("div");
    divHeader.classList.add("tableMahubeHeader")
    const em =  document.createElement("em");
    const text = document.createTextNode("Scroll right to see more \u2192");
    em.appendChild(text);
    divHeader.appendChild(em);

    const div = document.createElement("div");
    div.classList.add("tableMahube");
    console.log($(this).find("tr").first().width());
    console.log($(this).closest(".blockContents").width());
    if ($(this).find("tr").first().width() > $(this).closest(".blockContents").width()) {
      div.appendChild(divHeader)
    }
    div.appendChild(table)
    $(this).replaceWith(div);
  });

  $(window).resize(function() {
    $(".Content .blockContents .tableMahube").each(function() {
      const tableMahubeHeader = $(this).find(".tableMahubeHeader");
      if ($(this).find("tr").first().width() > $(this).closest(".blockContents").width()) {
        $(tableMahubeHeader).show();
      } else {
        $(tableMahubeHeader).hide();
      }
    });
  });
}

//-----------------------------------------------------------
//
// Is Chat With Us Clicked
//
//-----------------------------------------------------------
//
function toggleChatBox() {
  const chatBtn = document.getElementById("wp-live-chat-by-3CX").shadowRoot.querySelector('#wplc-chat-button');
  chatBtn.click();
}

//-----------------------------------------------------------
//
// Open link in external window if link in Content is clicked (with exception to button)
//
//-----------------------------------------------------------
//
// function openLinkInNewWindow() {
//   const links = $(".Content a");

//   links.each(function() {
//     var target = $(this).attr('target');

//     // otherwise not specified, set to blank
//     if (typeof target !== typeof undefined && target !== false) {
//       return;
//     }

//     $(this).attr("target", "_blank");
//   });
// }

$(document).ready(function() {
  // openLinkInNewWindow();
  wrapTableInContent();
});