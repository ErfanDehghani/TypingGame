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

      const timerInterval = window.setInterval(() => {
        let time = parseInt(this.timerElement.textContent) - 1;
        this.timerElement.textContent = time;

        if (time === 0) {
          clearInterval(timerInterval);
          resolve("Timer is over!");
        }
      }, 1000);
    });
  }
}
