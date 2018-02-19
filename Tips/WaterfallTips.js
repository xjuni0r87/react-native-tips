export default class WaterfallTips {
  /**
   * @constructor
   * @param {*} indexes - Indexes to create
   */
  constructor(indexes = []) {
    this.index = null
    this.indexes = {}

    indexes.forEach(index => this.createIndex(index))
  }

  /**
   * Start the waterfall tips by the first position
   */
  start() {
    this.index = this.getIndexByPosition(0)

    return this.index && this.index.name
  }

  /**
   * Check if an alement must be visible or not
   * @param {String|Object} index - The index
   * @returns {Boolean} Is visible or not
   */
  isVisible(index = '') {
    return index === this.index.name
  }

  /**
   * Create a new index
   * @param {String} name - The name of the index
   * @returns {*} The index object
   */
  createIndex(name) {
    if (!name) {
      throw new Error(`WaterfallTips.createIndex must have a name parameter. Found: "${name}"`)
    }

    const key = name.replace(/[^a-zA-Z]/g, '')

    if (this.indexes[key]) {
      throw new Error(`WaterfallTips index must be unique. Found duplicate key: "${key} (${name})"`)
    }

    const index = {
      name: key,
      position: Object.keys(this.indexes).length
    }

    this.indexes[key] = index
    return key
  }

  /**
   * Get the index by its position
   * @param {Number} position - The position of the index
   * @returns {*} The index object
   */
  getIndexByPosition(position) {
    const key = Object.keys(this.indexes)
      .find(k => this.indexes[k].position === position)

    return this.indexes[key]
  }


  /* EVENTS */

  /**
   * Trigger the next tips
   */
  next() {
    if (!this.index
      || (this.index && this.index.position + 1 >= Object.keys(this.indexes).length)) {
      this.index = null
    } else {
      this.index = this.getIndexByPosition(this.index.position + 1)
    }

    return this.index && this.index.name
  }

  /**
   * Trigger the previous tips
   */
  previous() {
    if (this.index && this.index.position > 0) {
      this.index = this.getIndexByPosition(this.index.position - 1)
    }

    return this.index && this.index.name
  }
}
