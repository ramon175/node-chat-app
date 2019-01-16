var expect = require('expect');
var {generateMessage,generateLocationMessage} = require('./message');

describe("generateMessage" ,() => {

    it('should generate the correct message object', () => {

        let from = "Jen",
            text = "Hey";

        let message = generateMessage(from,text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,text});

    })

})

describe("generateLocationMessage", () => {

    it('should generate correct location object', () => {

        let from = "Deb",
        lat = 15,
        long = 19,
        url = 'https://www.google.com/maps?q=15,19';


        let message = generateLocationMessage(from,lat,long);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,url});

    })

})