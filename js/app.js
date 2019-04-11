let allCreatures = [];
let jsonFile = 1;

function Creature(creature){
  this.title = creature.title;
  this.description = creature.description;
  this.imageURL = creature.image_url;
  this.keyword = creature.keyword;
  this.horns = creature.horns;
  this.id = this.idCreator(creature);
  allCreatures.push(this);
}

Creature.prototype.render = function(){
  const container = $('#creature-container').html();
  $('#all-creatures').append(`<div id="${this.id}" class="${this.keyword}"></div>`);
  $(`#${this.id}`).html(container);
  $(`#${this.id}`).find('img').attr('src', this.imageURL);
  $(`#${this.id}`).find('h2').text(`${this.title}`);
  // $(`#${this.id}`).find('p').text(`${this.description}`);
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
      allCreatures.forEach(creature => creature.render());
      keywordDropdown(data);
      console.log(allCreatures.length);
    }
  )
}

const checkKeywords = function(){
  let selection = $(this).val();
  $('div:not(#creature-container)').each(function() {
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

getCreatureData('./data/page-1.json');
$('#image-changer').on('click', swapImages);
$('#keyword-select').on('change', checkKeywords);

