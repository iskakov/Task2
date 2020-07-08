let currentItem = null;
let type_isolations = ["ППУ", "ППМ", "АПБ", "Изоляция из пенополиэтилена", "ВУС"];
let type_pipelines = ["Надземная","Подземная","По подвалу"];
let networkSections = [];
let localNetworkSections = [];
$('#inform').hide();
// генератор 
function generate(){
    // localStorage.clear();
    if (localStorage.getItem("networkSections") == null){
    
        let count = 15;
        for(let i = 0; i< count; i++){
            let networkSection = {};
            networkSection.number = i+1;
            networkSection.year_pipeline = Math.floor((Math.random() * (2020 - 2018 +1 )) + 2018);
            networkSection.type_isolation = Math.floor((Math.random() * (type_isolations.length )));
            networkSection.type_pipeline = Math.floor((Math.random() * (type_pipelines.length)));
            networkSection.name_object = makeNameObject(6);
            networkSection.date_registration = randomDate(new Date(2019, 0,1), new Date()).toISOString();
            networkSection.personal_account = makePersonalAccount(8);
            networkSection.street = "Ленина";
            networkSection.is_inside = Math.floor((Math.random() * 3) + 1) == 1 ? true : false; 
            networkSection.building_number = Math.floor((Math.random() * 50) + 1);
            localNetworkSections[i] =JSON.stringify( networkSection);
            networkSections[i] = networkSection;
        }
        localStorage.setItem("networkSections", JSON.stringify(localNetworkSections))
    }
    else {
        localNetworkSections = JSON.parse(localStorage.getItem("networkSections"));
        for(let i = 0; i< localNetworkSections.length; i++){
            networkSections[i] = JSON.parse(localNetworkSections[i]);
        }
    }

    for(let i = 0; i<networkSections.length ; i++){
      generetaeBlock(networkSections[i]);
    }
}

generate();

function generetaeBlock(networkSection){
  let class_pipeline = networkSection.type_pipeline == 0 ? "type_pipeline1" : (networkSection.type_pipeline == 1 ? "type_pipeline2" : "type_pipeline3");
  let number_span = $('<span/>', {
    class: 'number',
    text: networkSection.number 
  }); 
  let isol_span = $('<span/>', {
    text: type_isolations[ networkSection.type_isolation] 
  }); 
   let block = $('<div/>', {
    class: 'ui-draggable ' + class_pipeline,
    'data-2': JSON.stringify(networkSection) ,
    append: number_span, 
  }); 
  block.append(isol_span);
  if(networkSection.is_inside){
    $("#list_network_area").append(block);
  } else{
    $("#object_energy_consume").append(block);
  }
}


function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function makeNameObject(length) {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( let i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
 }

 function makePersonalAccount(length) {
    let result           = '';
    let characters       = '0123456789';
    for ( let i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
 }
 
// обработка клика
$('#button_save').on('click', function(event) {  
  let obj = JSON.parse(currentItem.getAttribute('data-2'));
  obj.year_pipeline =  Number.parseInt($('#year').val());
  obj.type_isolation = type_isolations.indexOf($('#type_isolation').val());
  obj.type_pipeline = type_pipelines.indexOf($('#type_pipeline').val());
  let span = $(currentItem).children().eq(1).text($('#type_isolation').val());
  $(currentItem).removeClass("type_pipeline1 type_pipeline2 type_pipeline3").addClass(obj.type_pipeline == 0 ? "type_pipeline1" :( obj.type_pipeline == 1 ? "type_pipeline2" : "type_pipeline3"));
  $(currentItem).attr('data-2', JSON.stringify(obj))
  Find_And_Save(obj);
  $('#inform').hide();
  $('#empty_st').show();
});


$('.ui-draggable').on('click', function(event) {
  currentItem = this; 
  let obj = JSON.parse(this.getAttribute('data-2'))
  $('#number_section').text(obj.number);
  $('#year').val(obj.year_pipeline);
  $('#type_isolation').val(type_isolations[obj.type_isolation]);
  $('#type_pipeline').val(type_pipelines[obj.type_pipeline]);


  $('#name_object').text(obj.name_object);
  $('#date_registration').text(obj.date_registration);
  $('#consumer').text(obj.personal_account);
  $('#street').text(obj.street);
  $('#number_building').text(obj.building_number);

  $('#inform').show();
  $('#empty_st').hide();
  
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
    let obj = JSON.parse(ui.draggable[0].getAttribute('data-2'));
    obj.is_inside = false;
    
   
    $(ui.draggable[0]).attr('data-2', JSON.stringify(obj))
    ui.draggable[0].style.top = 0;
    ui.draggable[0].style.left = 0;
    Find_And_Save(JSON.parse(ui.draggable[0].getAttribute('data-2')));
  }
});

$("#list_network_area").droppable({
  tolerance: "intersect",
  accept: ".ui-draggable",
 
  drop: function(event, ui) {
    $(this).append($(ui.draggable));
    let obj = JSON.parse(ui.draggable[0].getAttribute('data-2'));
    obj.is_inside = true;
    
   
    $(ui.draggable[0]).attr('data-2', JSON.stringify(obj))
    ui.draggable[0].style.top = 0   ;
    ui.draggable[0].style.left = 0   ;
    Find_And_Save(JSON.parse(ui.draggable[0].getAttribute('data-2')));
  }
});

function Find_And_Save (networkSection){
  localNetworkSections = [];
    for(let i =0; i<networkSections.length; i++){
      if(networkSections[i].number == networkSection.number){
        networkSections[i] = networkSection;
      }

      localNetworkSections[i] = JSON.stringify(networkSections[i]);
    }
    // localStorage.clear();
    localStorage.setItem("networkSections", JSON.stringify(localNetworkSections));
}
