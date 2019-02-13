
describe('clearInput()', function() {
    it('should clear the input field', function() {
        clearInput();
        expect($("input[id='input']").val()).to.equal("");
    });
  });

  describe('validate()', function() {
    it('should return true if item qty is less than the stock qty', function() {
        const item = {
            id: '1',
            name: 'Sweater',
            department: 'Apparel',
            price: '50',
            instock: '20',
            incart: '10'
          };
        expect(validate(item)).to.equal(true);
    });
    it('should return false if item qty is greater than the stock qty', function() {
        const item = {
            id: '1',
            name: 'Sweater',
            department: 'Apparel',
            price: '50',
            instock: '10',
            incart: '20'
          };
        expect(validate(item)).to.equal(false);
    });
    it('should return undefined if item qty is not a number', function() {
        const item = {
            id: '1',
            name: 'Sweater',
            department: 'Apparel',
            price: '50',
            instock: '10',
            incart: 'lol'
          };
        expect(validate(item)).to.equal(undefined);
    });
    it('should return undefined if stock qty is not a number', function() {
        const item = {
            id: '1',
            name: 'Sweater',
            department: 'Apparel',
            price: '50',
            instock: 'haha',
            incart: '10'
          };
        expect(validate(item)).to.equal(undefined);
    });
  });
  


