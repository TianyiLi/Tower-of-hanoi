import { range } from './util/useful-stuff'
export class Tower {
  constructor () {
    this.left = []
    this.middle = []
    this.right = []
    this.customHook = new Map()
    this.history = []
    this.events = new Map()
  }

  configure (maxLayer = 1) {
    if (maxLayer < 1) throw new Error('Create tower failed!')
    this.maxLayer = maxLayer
    this.left = range(this.maxLayer, 1)
    this.history = []
    this.setCustomHook('left', 'middle', 'right')
  }

  setCustomHook (left, middle, right) {
    this.customHook = new Map([[left, this.left], [middle, this.middle], [right, this.right]])
  }

  getList (fillZero = false) {
    let result = {}
    let clone = obj => JSON.parse(JSON.stringify(obj))
    let _range = range(this.maxLayer, 1)
    let fill = positionList => num => (positionList.find(n => n === num) || 0)

    this.customHook.forEach((value, key) => {
      Object.defineProperty(result, key, {
        value: fillZero ? _range.map(fill(clone(value))) : clone(value),
        writable: true,
        configurable: true,
        enumerable: true
      })
    })
    return result
  }

  move (from, to) {
    this.history.push({ from, to })
    if (this.customHook.has(from) && this.customHook.has(to)) {
      let top = this.customHook.get(from).shift()
      this.customHook.get(to).unshift(top)
    } else {
      throw new Error('Failed to move the disk, the value {from or to} is incorrect! Got the from and to is ' + `${from} and ${to}`)
    }
    return true
  }
}
