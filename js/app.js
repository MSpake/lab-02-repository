const allCreatures = [];

function Creature(creature){
  this.title = creature.title;
  this.description = creature.description;
  this.imageURL = creature.image_url;
  this.keyword = creature.keyword;
  this.horns = creature.horns;
  this.id = creature.title.toLowerCase().replace(/\s|'|#/g,'');
  allCreatures.push(this);

}

Creature.prototype.render = function(){
  const container = $('#creature-container').html();
  $('body').append(`<div id="${this.id}" class="${this.keyword}"></div>`);
  $(`#${this.id}`).html(container);
  $(`#${this.id}`).find('img').attr('src', this.imageURL);
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

const getCreatureData = () => {
  $.get('./data/page-1.json', 'json').then(
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

getCreatureData();
$('#keyword-select').on('change', checkKeywords);

