const creatureTemplateSource = $('#creature-template').html();
const creatureTemplate = Handlebars.compile(creatureTemplateSource);

let allCreatures = [];
let jsonFile = 1;

function Creature(creature){
  this.title = creature.title;
  this.description = creature.description;
  this.imageURL = creature.image_url;
  this.keyword = creature.keyword;
  this.horns = creature.horns;
  this.order = 1;
  this.originalOrder;
  this.id = this.idCreator(creature);
  allCreatures.push(this);
}

Creature.prototype.render = function(){
  $('#all-creatures').append(creatureTemplate(this));
}

Creature.prototype.idCreator = function(creature){
  let id = creature.title.toLowerCase().replace(/\s|'|#/g,'');
  allCreatures.forEach(creature => {
    if(creature.id === id){
      id = id + id.length;
    }
  })
  return id;
}

const keywordDropdown = (allCreatureData) => {
  const keywords = [];
  allCreatureData.forEach(creature => {
    if(!keywords.includes(creature.keyword)){
      keywords.push(creature.keyword);
    }
  })
  keywords.forEach(keyword => {$('#keyword-select').append(`<option value="${keyword}">${keyword}</option>`);});
}

const getCreatureData = (json) => {
  allCreatures = [];
  $('#all-creatures').html('');
  $('#keyword-select').html('<option value=""></option>');
  $.get(`${json}`, 'json').then(
    data => {
      data.forEach(creature => new Creature(creature));
      allCreatures.forEach((creature, index) => {
        creature.originalOrder = index;
        creature.render();
      });
      keywordDropdown(data);
      console.log(allCreatures.length);
    }
  )
}

const checkKeywords = function(){
  let selection = $(this).val();
  $('div').each(function() {
    if(selection){
      if(!$(this).hasClass(selection)){
        $(this).hide();
      } else {
        $(this).show();
      }
    } else {
      $(this).show();
    }
  })
}

const swapImages = function(){
  if(jsonFile === 1){
    getCreatureData('./data/page-2.json');
    jsonFile = 2;
  } else {
    getCreatureData('./data/page-1.json');
    jsonFile = 1;
  }
}

const sortBy = function(){
  $('#all-creatures').html('');
  let selection = $(this).val();
  if(selection){
    allCreatures.sort((a,b) => {
      switch(selection){
      case 'horns':
        a = a.horns;
        b = b.horns;
        break;
      case 'alphabetically':
        a = a.title.toLowerCase();
        b = b.title.toLowerCase();
        break;
      }
      if(a > b) return 1;
      if(a < b) return -1;
      return 0;
    })
    allCreatures.forEach((creature, index) => {
      creature.order = index;
      creature.render();
    });} else {
    console.log('here')
    $('#all-creatures').html('');
    allCreatures.forEach(creature => {
      creature.order = creature.originalOrder;
      creature.render();
    });
  }
}

getCreatureData('./data/page-1.json');
$('#image-changer').on('click', swapImages);
$('#keyword-select').on('change', checkKeywords);
$('#sort').on('change', sortBy);


