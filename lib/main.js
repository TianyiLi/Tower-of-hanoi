import { Hanoi } from './hanoi'
import { Tower } from './tower'
import { repeatWord, range } from './util/useful-stuff'
import rl from 'readline'
const blackBlock = '█'
const whiteBlock = ' '
const stream = rl.createInterface({
  input: process.stdin,
  output: process.stdout
})
const maxCountPerStick = 5
const maxCountPerLayer = maxCountPerStick * 3 * 2 + 2
const hanoiLogic = new Hanoi()
const tower = new Tower()
const stickName = ['大炮', '阿姆斯壯旋風炮', '新阿姆斯特朗旋風噴射阿姆斯特朗砲']
hanoiLogic.stickName = stickName
const withName = stickName !== [0, 1, 2]
let fromToDesc = ''
tower.configure(maxCountPerStick)
tower.setCustomHook(...stickName)
hanoiLogic.setDisk(maxCountPerStick)
function nextStep () {
  if (hanoiLogic.isEnd()) return false
  let result = hanoiLogic.next(withName)
  tower.move(result.from, result.to)
  fromToDesc = `From ${result.from} move to ${result.to}`
  return tower.getList(true)
}

/**
 * @description make the hanoi list to flat
 * @param {number[][]} hanoiList
 */
function calc (hanoiList) {
  hanoiList = hanoiList.map(list => list.sort((a, b) => a > b))
  let body = range(tower.maxLayer, 0).map(num => {
    return [hanoiList[0][num], hanoiList[1][num], hanoiList[2][num]]
  })
  return body
}

/**
 * @param {number[][]} hanoiBody 
 */
function paint (hanoiBody) {
  let frame = hanoiBody.map(row => {
    return row.map(disk => {
      let line = `${repeatWord(tower.maxLayer - disk)(whiteBlock)}${repeatWord(disk)(blackBlock)}`.split('')
      return `${line.join('')}${line.reverse().join('')}`
    }).join(whiteBlock)
  })
  frame.unshift(repeatWord(maxCountPerLayer)('-'))
  frame.push(repeatWord(maxCountPerLayer)('-'))
  frame.push(fromToDesc)
  frame.push(`Predict maximum steps is ${hanoiLogic.maxCount}, now is ${hanoiLogic._i}`)
  if (hanoiLogic.isEnd()) {
    frame.push('End!')
  }
  return frame.join('\n')
}

function frameTick () {
  let state = nextStep()
  if (state) {
    return paint(calc(Object.entries(state).map(entry => entry[1])))
  } else {
    return false
  }
}
rl.cursorTo(stream, 0, 0)
rl.clearScreenDown(stream)
stream.write(frameTick())
let id = setInterval(() => {
  let frame = frameTick()
  if (frame) {
    rl.cursorTo(stream, 0, 0)
    rl.clearScreenDown(stream)
    stream.write(frame)
  } else {
    stream.close()
    clearInterval(id)
  }
}, 500)
