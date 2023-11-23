/**
 * Class: Timer
 *
 * Description:
 * This class creates a timer that counts down from a specified time limit and updates an HTML element with the remaining time.
 */
export default class Timer {
  /**
   * @property {Element} timerElement - The ID of the HTML element to update with the remaining time.
   */
  timerElement;

  /**
   * @property {number} timeLimit - The time limit in seconds.
   */
  timeLimit;

  /**
   * Timer itself
   * @property
   * @type {int}
   */
  timer;

  /**
   * @constructor
   * @param {number} timeLimit - The time limit in seconds.
   * @param {Element} timerElement - The ID of the HTML element to update with the remaining time.
   */
  constructor(timeLimit, timerElement) {
    this.timerElement = timerElement;
    this.timeLimit = timeLimit;
  }

  /**
   * Starts the timer.
   * With the given HTML tag as a timer, it changes the text inside that tag
   * to match the timer each second.
   * @returns {Promise} A promise that resolves when the timer is over.
   */
  start() {
    return new Promise((resolve) => {
      this.timerElement.textContent = this.timeLimit;

      this.timer = window.setInterval(() => {
        this.timeLimit = this.timeLimit - 1;
        this.timerElement.textContent = this.timeLimit;

        if (this.timeLimit === 0) {
          clearInterval(this.timer);
          resolve("Timer is over!");
        }
      }, 1000);
    });
  }

  /**
   * Tracks a given game's time based on its state
   * @method
   * @param {Game} game
   */
  trackGame(game) {
    document.addEventListener('stateChange', () => {
      if (game.state === game.State.IN_PROGRESS)
        this.start().then(() => {
          game.stateToFinished();
        });
      else {
        this.timeLimit;
        clearInterval(this.timer);
      }
    });
  }

}
