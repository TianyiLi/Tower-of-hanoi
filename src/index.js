import Vue from 'vue/dist/vue'
import { Hanoi } from '../lib/hanoi'
import { Tower } from '../lib/tower'
const hanoi = new Hanoi()
const tower = new Tower()
const pxGen = (px) => `${px}px`
const DISK_WIDTH = 30
const DISK_HEIGHT = 15

const App = new Vue({
  el: '#app',
  data: {
    hanoiList: [],
    maxDisk: 4,
    isRun: false,
    stickName: [1, 2, 3],
    history: [],
    tid: -1
  },
  computed: {
    containerStyle () {
      let result = {
        width: `${3 * this.maxDisk * 30 + 30}px`,
        height: `${this.maxDisk * DISK_HEIGHT}px`,
        minHeight: `150px`,
        border: `solid 15px red`,
        borderRadius: '5px'
      }
      return result
    },
    renderList () {
      let result = this.hanoiList.reduce((prev, curr, i) => {
        return [...prev, ...curr.map((disk, j) => {
          return {
            name: disk,
            style: {
              height: pxGen(DISK_HEIGHT),
              bottom: pxGen((curr.length - j - 1) * DISK_HEIGHT),
              left: pxGen(i * (this.maxDisk * DISK_WIDTH + 15) + (this.maxDisk - disk) * (DISK_WIDTH / 2)),
              width: pxGen(disk * DISK_WIDTH)
            }
          }
        })]
      }, [])
      result.sort((a, b) => { return a.name > b.name })
      return result
    }
  },
  methods: {
    prepare () {
      this.isRun = true
      hanoi.stickName = this.stickName
      tower.configure(this.maxDisk)
      hanoi.setDisk(this.maxDisk)
      tower.setCustomHook(...this.stickName)
      this.hanoiList = Object.entries(tower.getList(false)).map(entry => entry[1])
    },
    move () {
      let result = hanoi.next(true)
      tower.move(result.from, result.to)
      this.hanoiList = Object.entries(tower.getList(false)).map(entry => entry[1])
      if (result.isEnd) {
        clearInterval(this.tid)
      }
    },
    concurrent() {
      this.tid = setInterval(() => {
        this.move()
      }, 1 * 1000)
    }
  }
})

App.$on('ended', () => { App.isRun = false })