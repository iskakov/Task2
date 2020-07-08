let currentItem = null;

// генератор 


// обработка клика

$('.ui-draggable').on('click', function(e) {  
    alert(1);
});
$(".ui-draggable").draggable({
  appendTo: "body",
  cursor: "move",
  revert: "invalid",
  
  drag: function( event, ui ){
  
}
});

$("#object_energy_consume").droppable({
  
  accept: ".ui-draggable",
 
  drop: function(event, ui) {
    $("#object_energy_consume").append($(ui.draggable));
    ui.draggable[0].style.top = 0;
    ui.draggable[0].style.left = 0;
  }
});

$("#list_network_area").droppable({
  tolerance: "intersect",
  accept: ".ui-draggable",
 
  drop: function(event, ui) {
    $(this).append($(ui.draggable));
    ui.draggable[0].style.top = 0   ;
    ui.draggable[0].style.left = 0   ;
  }
});
