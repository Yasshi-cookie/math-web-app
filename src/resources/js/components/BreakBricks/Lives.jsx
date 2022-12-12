export class Lives {
    /**
     * @type {number}
     */
    life;

    /**
     * @param {number} life
     */
    constructor(life) {
        this.setLife(life);
    }

    /**
     * @param {number} life
     */
    setLife = (life) => {
        this.life = life;
    }

    isAlive = () => {
        return this.life > 0;
    }

    isDead = () => {
        return !this.isAlive();
    }

    /**
     * @param {number} decreaseNumber
     */
    decrease = (decreaseNumber) => {
        this.setLife(this.life - decreaseNumber);
    }

    /**
     * 残機が残り1かどうか
     * @returns {boolean}
     */
    isLeftLifeOne = () => {
        return this.life === 1;
    }
}
