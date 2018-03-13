Array.prototype.removeObj = function(what)  {
  let found = this.indexOf(what);

  while (found !== -1) {
    this.splice(found, 1);
    found = this.indexOf(what);
  }
};
