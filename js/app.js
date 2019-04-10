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
  $('body').append(`<div id="${this.id}"></div>`);
  $(`#${this.id}`).html(container);
  $(`#${this.id}`).find('img').attr('src', this.imageURL);
}

const getCreatureData = () => {
  $.get('./data/page-1.json', 'json').then(
    data => {
      data.forEach(creature => new Creature(creature));
      allCreatures.forEach(creature => creature.render());
    }
  )
}

getCreatureData();

