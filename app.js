const Specie = function (species, weight, height, facts) {
  this.species = species;
  this.weight = weight;
  this.height = height;
  this.facts = facts;
  this.image = "images/" + species.toLowerCase() + ".png";
};

Specie.prototype.pushFact = function (fact) {
  this.facts.push(fact);
};

Specie.prototype.compNamePushFact = function (name) {
  let fact = "Names are same!";
  if (this.name > name) {
    fact = "My name comes first in alphabetic order";
  } else if (this.name < name) {
    fact = "Your name comes first";
  }
  this.pushFact(fact);
};

Specie.prototype.compWeightPushFact = function (weight) {
  let fact = "We weigh the same";
  if (this.weight > weight) {
    fact = "I weigh more";
  } else if (this.weight < weight) {
    fact = "You weigh more";
  }
  this.pushFact(fact);
};

Specie.prototype.compHeightPushFact = function (height) {
  let fact = "Our heights the same";
  if (this.height > height) {
    fact = "My hight is greater";
  } else if (this.height < height) {
    fact = "You are taller";
  }
  this.pushFact(fact);
};

Specie.prototype.randomFact = function () {
  let fact = Math.floor(Math.random() * 10) % this.facts.length;
  return this.facts[fact];
};

function Dinosaur(species, weight, height, facts) {
  Specie.call(this, species, weight, height, facts);
}
Dinosaur.prototype = Object.create(Specie.prototype);
Dinosaur.prototype.constructor = Dinosaur;

function Human(name, weight, heigh) {
  Specie.call(this, "human", weight, heigh, []);
  this.name = name;
}
Human.prototype = Object.create(Specie.prototype);
Human.prototype.constructor = Human;

let dinosaurs = [];

fetch("dino.json")
  .then((res) => res.json())
  .then(
    (json) =>
      (dinosaurs = json.Dinos.map(
        (dino) =>
          new Dinosaur(dino.species, dino.weight, dino.height, [
            dino.fact,
            `I am a ${dino.species}.`,
            `I am originally from ${dino.where}.`,
            `I belong to the ${dino.when} geological period.`,
          ])
      ))
  );

function getHuman() {
  return (function () {
    let name = inputValue("name");
    let heightFeet = parseFloat(inputValue("feet"));
    let heightInches = parseFloat(inputValue("inches"));
    let weight = parseFloat(inputValue("weight"));

    return new Human(name, weight, heightFeet * 12 + heightInches);
  })();
}

document.querySelector("#btn").addEventListener("click", function () {
  const human = getHuman();
  dinosaurs.forEach((dino) => {
    dino.compNamePushFact(human.name);
    dino.compHeightPushFact(human.height);
    dino.compWeightPushFact(human.weight);
  });
  document.querySelector("#dino-compare").style.display = "none";
  for (let index in dinosaurs) {
    let dino = dinosaurs[index];
    let fact = dino.randomFact();
    if (dino.weight < 1) {
      fact = "All birds are Dinosaurs";
    }
    let addGridItem = getGridItems(dino.species, dino.image, fact);

    document.getElementById("grid").appendChild(addGridItem);
    if (index == 3) {
      let humanItem = getGridItems(human.species, human.image);
      document.getElementById("grid").appendChild(humanItem);
    }
  }
});

function inputValue(id) {
  return document.getElementById(id).value;
}

function getGridItems(species, imageUrl, fact) {
  let addGridItem = document.createElement("div");
  addGridItem.className = "grid-item";

  let speciesH3 = document.createElement("h3");
  speciesH3.innerText = species;
  addGridItem.appendChild(speciesH3);

  let imageItem = document.createElement("img");
  imageItem.src = imageUrl;
  addGridItem.appendChild(imageItem);

  if (fact) {
    let factItem = document.createElement("p");
    factItem.innerText = fact;
    addGridItem.appendChild(factItem);
  }
  return addGridItem;
}
