var expect = require('expect');
var {generateMessage} = require('./message');

describe("generateMessage" ,() => {

    it('should generate the correct message object', () => {

        let from = "Jen",
            text = "Hey";

        let message = generateMessage(from,text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,text});

    })

})