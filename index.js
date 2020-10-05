class Declare {
  constructor(CB = () => { }) {
    this.state = 'pending'
    this.value = null
    this.resolver = () => { }
    CB(this.resolve.bind(this))
  }

  resolve(value) {
    if (this.state === 'pending') {
      this.state = 'resolved';
      this.value = value
      this.resolver(value)
    }
  }

  then(CB = () => { }) {
    this.resolver = CB
    if (this.state === 'resolved') {
      return new Declare((resolveCB) => {
        resolveCB(CB(this.value))
      })
    } else {
      return this
    }
  }
}
module.exports = Declare
