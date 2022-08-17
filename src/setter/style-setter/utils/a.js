const a = '100%'
const allow = ['%']
function getUnit(value) {
  let t = 0
  if (value != undefined && value != null) {
    t = parseInt(value) || 0;
    return value.replace(t.toString(), '')
  }

  return null;
}
console.log(allow.includes(getUnit(a)))

function removeUnit (value, allow = ['%'], empty = '') {
  if (value === 'auto' || allow.includes(getUnit(value))) return value;
  if (value != undefined && value != null) {
    const t = parseInt(value)
    return isNaN(t) ? empty : t;
    // return t === NaN ? empty : t;
  }

  return null;
}


console.log(removeUnit(a))
