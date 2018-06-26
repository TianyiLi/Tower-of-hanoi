const HANOI_STATE = {
  Setting: 1,
  Counting: 2,
  Finish: 3
}

export class Hanoi {
  constructor () {
    this._i = 0
    this.maxCount = 1 << 1
    this.__state__ = HANOI_STATE.Setting
    this.stickName = ['A', 'B', 'C']
  }
  setDisk (diskNum = 3) {
    this.maxCount = (1 << diskNum) - 1
    this._i = 0
    this.__state__ = HANOI_STATE.Counting
  }

  next (withName = false) {
    if (this.__state__ === HANOI_STATE.Setting) throw new Error('Not setup the disk yet!')
    if (this.__state__ === HANOI_STATE.Finish) throw new Error('Already ended, plz reset the disk!')
    let i = ++this._i
    let from, to;
    from = (i & i - 1) % 3;
    to = ((i | i - 1) + 1) % 3;
    if (this._i === this.maxCount) this.__state__ = HANOI_STATE.Finish
    return { from: withName ? this.stickName[from] : from, to: withName ? this.stickName[to] : to, isEnd: this.__state__ === HANOI_STATE.Finish }
  }

  get state () {
    return Object.getOwnPropertyNames(HANOI_STATE)[this.__state__ - 1]
  }

  isEnd () {
    return this.__state__ === HANOI_STATE.Finish
  }
}
