let game = {
  lock_mode: false,
  first_card: null,
  second_card: null,

  set_card: function (id) {
    let card = this.cards.filter((card) => card.id === id)[0];

    if (card.flipped || this.lock_mode) {
      return false;
    }

    if (!this.first_card) {
      this.first_card = card;
      this.first_card.flipped = true;
      return true;
    } else {
      this.second_card = card;
      this.second_card.flipped = true;
      this.lock_mode = true;
      return true;
    }
  },

  check_match: function () {
    if (!this.first_card || !this.second_card) {
      return false;
    }
    return this.first_card.icon === this.second_card.icon;
  },

  clear_cards: function () {
    this.first_card = null;
    this.second_card = null;
    this.lock_mode = false;
  },

  unflip_cards() {
    this.first_card.flipped = false;
    this.second_card.flipped = false;
    this.clear_cards();
  },

  check_game_over() {
    return this.cards.filter((card) => !card.flipped).length === 0;
  },

  techs: [
    "bootstrap",
    "css",
    "electron",
    "firebase",
    "html",
    "javascript",
    "jquery",
    "mongo",
    "node",
    "react",
  ],

  cards: null,

  create_cards_from_techs: function () {
    this.cards = [];

    this.techs.forEach((tech) => {
      this.cards.push(this.create_pair_from_tech(tech));
    });

    this.cards = this.cards.flatMap((pair) => pair);
    this.shuffle_cards();
    return this.cards;
  },

  create_pair_from_tech: function (tech) {
    return [
      {
        id: this.create_id_with_tech(tech),
        icon: tech,
        flipped: false,
      },
      {
        id: this.create_id_with_tech(tech),
        icon: tech,
        flipped: false,
      },
    ];
  },

  create_id_with_tech: function (tech) {
    return tech + parseInt(Math.random() * 1000);
  },

  shuffle_cards: function (cards) {
    let current_index = this.cards.length;
    let random_index = 0;

    while (current_index !== 0) {
      random_index = Math.floor(Math.random() * current_index);
      current_index--;

      [this.cards[random_index], this.cards[current_index]] = [
        this.cards[current_index],
        this.cards[random_index],
      ];
    }
  },

  flipCard: function (cardId, gameOverCallBack, noMatchCallBack) {
    if (this.set_card(cardId)) {
      if (this.second_card) {
        if (this.check_match()) {
          this.clear_cards();
          if (this.check_game_over()) {
            //GamerOver
            gameOverCallBack();
          }
        } else {
          setTimeout(() => {
            //No Match
            this.unflip_cards();
            noMatchCallBack();
          }, 1000);
        }
      }
    }
  },
};

export default game;
