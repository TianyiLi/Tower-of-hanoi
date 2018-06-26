const repeatWord = (length) => _char => Array.from({ length }, e => _char).join('')
/**
 * @param {number} length 
 * @param {number} start 
 * @returns {number[]}
 */
const range = (length, start = 0) => Array.from({ length }, (_, i) => i + start)
const zeroAdd = (length, str) => (repeatWord(length)('0') + str).slice(length * -1)

export {
  repeatWord,
  range,
  zeroAdd
}
