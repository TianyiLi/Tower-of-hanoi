import { Hanoi } from '../lib/hanoi'
import 'mocha'
import { equal, deepEqual, throws } from 'assert';
const hanoi = new Hanoi()
const genResult = (from, to, isEnd) => ({ from, to, isEnd })
describe('Hanoi', () => {
  it('Should on start', () => {
    equal(hanoi.state, 'Setting')
  })
  it('set up the options, 3 disk', () => {
    hanoi.setDisk(3)
    equal(hanoi.state, 'Counting')
  })
  it('Max step total should be 2^3 - 1', () => {
    equal(hanoi.maxCount, Math.pow(2, 3) - 1)
  })
  it('Should A to C', () => {
    let result = hanoi.next(true)
    equal(result.from, 'A')
    equal(result.to, 'C')
    equal(result.isEnd, false)
  })
  it('Should A to B', () => {
    deepEqual(hanoi.next(true), genResult('A', 'B', false))
  })
  it('Should C to B', () => {
    deepEqual(hanoi.next(true), genResult('C', 'B', false))
  })
  it('Should A to C', () => {
    deepEqual(hanoi.next(true), genResult('A', 'C', false))
  })
  it('Should B to A', () => {
    deepEqual(hanoi.next(true), genResult('B', 'A', false))
  })
  it('Should B to C', () => {
    deepEqual(hanoi.next(true), genResult('B', 'C', false))
  })
  it('Should A to C, and is finish', () => {
    deepEqual(hanoi.next(true), genResult('A', 'C', true))
  })
  it('Should get error', () => {
    throws(() => { hanoi.next() }, 'Error: Already ended, plz reset the disk!')
  })
  it('should get finish', () => {
    equal(hanoi.state, 'Finish')
  })
})