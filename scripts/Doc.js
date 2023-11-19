/**
 * This Class is responsible for alternating the dom based on how game goes
 */
export default class Document {
  // ScoreBoard properties ----------------------------------------------------
  /**
   * scoreBoard
   * @property
   * @type Element
   */
  scoreBoardElement = this.$("scoreBoard");
  /**
   * current game's word per minute counter element
   * @property
   * @type {Element}
   */
  wordPerMinuteElement = this.$("scoreBoard_WPM");
  /**
   * the current game's errors element
   * @property
   * @type {Element}
   */
  errorsElement = this.$("scoreBoard_errors");

  // other properties ----------------------------------------------------

  /**
   * the text in the middle of the screen that changes based on what user is doing
   * at first it will tell user to focus and after that it will guide user though the game
   * @property
   * @type Element
   */
  pageGuideElement = this.$("pageGuide");
  /**
   * Element responsible for displaying information smaller than pageGuide element under it
   * @property
   * @type {Element}
   */
  pageGuideDescriptionElement = this.$("pageGuideDescription");
  /**
   * input files
   * @property
   * @type {Element}
   */
  inputElement = this.$("input");
  /**
   * contains the text that user has to type
   * @property
   * @type {Element}
   */
  textContainer = this.$('textContainer');

  /**
   * will hold add the keys that can be typed
   * @property
   * @type {array}
   */
  keys = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

  /**
   * @constructor
   * the constructor will make changes to make the Doc ready for player to start the game
   */
  constructor() {
    this.pageGuideElement.textContent = "GET READY TO PLAY!";
    this.pageGuideDescriptionElement.textContent =
      "Game will start 3 seconds after you click on the input field";
  }

  /**
   * Just making life easier and adding a way to get dom elements faster
   * @param elementId : string
   * @returns {Element}
   * @method
   */
  $(elementId) {
    return document.getElementById(elementId);
  }

  /**
   * Will reset the scoreboard to its original state
   * @method
   */
  scoreBoardReset() {
    this.wordPerMinuteElement.textContent = 0;
    this.errorsElement.textContent = 0;
  }

  /**
   * Calls the scoreboardReset method of this document
   * Changes the page guide element to game startup
   * Resets the input element's value
   * @method
   */
  gameInit() {
    this.scoreBoardReset();
    this.pageGuideElement.textContent = "Stay Focused";
    this.pageGuideDescriptionElement.textContent = "Type as fast as you can";
    this.inputElement.value = "";
  }

  /**
   * Changes the page guide element to passed state
   * Resets the input element's value
   * In short, it will pause the game
   * @method
   */
  pauseGame() {
    this.pageGuideElement.textContent = "Game is paused";
    this.pageGuideDescriptionElement.textContent =
      "Click on the input field to continue playing";
    this.inputElement.value = "";
  }

  /**
   * Changes the page guide element to in progress state
   * Resets the input element's value
   * In short, it will resume the game
   * @method
   */
  resumeGame() {
    this.pageGuideElement.textContent = "Game is resumed";
    this.pageGuideDescriptionElement.textContent = "Type as fast as you can";
    this.inputElement.value = "";
  }

  /**
   * Changes the Page Guide description text
   * @method
   * @param {String} description
   */
  pageGuideDescription(description) {
    this.pageGuideDescriptionElement.textContent = description;
  }

  /**
   * this will append the child to the specified element
   * @method
   * @param {string} displayedText
   */
  setContent(displayedText)
  {
    this.textContainer.classList.remove("centered");
    this.textContainer.classList.add("percent");
    this.textContainer.textContent = null;

    displayedText.split(/[ ,.]+/).forEach((char) => {
      const charSpan = document.createElement("span");
      charSpan.innerText = char;
      this.textContainer.appendChild(charSpan);
    });
  }

  /**
   * this will animate hitting a key
   * @method
   * @param keyCode {string}
   */
  hit(keyCode) {
    // gets the targeted element and adds hit effect to it
    const keyPressed = keyCode.toUpperCase();
    const keyElement = document.getElementById(keyPressed);

    keyElement.classList.add("hit");
    keyElement.addEventListener("animationend", () => {
      keyElement.classList.remove("hit");
    });
  }

  /**
   * this will animate the key that is supposed to be clicked
   * @method
   * @param key {string}
   */
  newTarget(key) {
    if (document.querySelector(".selected") !== null)
      document.querySelector(".selected").classList.remove('selected');
    let keyToBeClicked = this.$(key.toUpperCase())
    keyToBeClicked.classList.add('selected')
  }

  /**
   * add a completed style to the word
   * @method
   * @param wordCounter {int}
   */
  wordTyped(wordCounter)
  {
    console.log(this.textContainer.children[wordCounter])
    // this.textContainer.children[wordCounter].classList.add("completed");
  }

}
