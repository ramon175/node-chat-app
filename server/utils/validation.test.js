const expect = require('expect');

const{ isRealString } = require('./validations');

describe('isRealString', () => {

    it('should reject non-string values', () => {

        let str = 123123;

        let result = isRealString(str);

        expect(result).toBe(false);

    });

    it('should reject string with only space values', () => {

        let str = "     ";

        let result = isRealString(str);
        
        expect(result).toBe(false);

    });

    it('should allow string with non-space characters', () => {

        let str = "valid";
        
        let result = isRealString(str);
        
        expect(result).toBe(true);

    })

})