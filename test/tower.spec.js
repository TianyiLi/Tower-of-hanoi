import { Tower } from '../lib/tower'
import { deepEqual } from 'assert';

let tower = new Tower()

describe('Tower Test', () => {
  before(() => {
    tower.configure(3)
  })
  it('getList should correct', () => {
    deepEqual(tower.getList(), { left: [1, 2, 3], middle: [], right: [] })
  })
  it('move to middle should correct', () => {
    deepEqual(tower.move('left', 'middle'), true)
    deepEqual(tower.getList(), { left: [2, 3], middle: [1], right: [] })
  })
  it('set custom hook', () => {
    tower.setCustomHook(...['0', '1', '2'])
    deepEqual(tower.getList(), { '0': [2, 3], '1': [1], '2': [] })
  })
  it('Custom hook for number', () => {
    tower.setCustomHook(...[0, 1, 2])
    deepEqual(tower.getList(), [[2, 3], [1], []])
  })
  it('fillZero should work', () => {
    deepEqual(tower.getList(true), [[0, 2, 3], [1, 0, 0], [0, 0, 0]])
  })
})