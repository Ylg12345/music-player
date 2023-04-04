export const domMethods = {
  addClass(el, className) {
    if(this.hasClass(el, className)) {
      return
    }
/*     let newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ') */
    el.setAttribute('class', className)
  },
  hasClass(el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className)
  }
} 

