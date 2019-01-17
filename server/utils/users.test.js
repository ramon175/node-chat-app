const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {

    it('should add new user', () => {

        var users = new Users();

        let user = {
            id: "123",
            name: "Ramon",
            room: "sala"
        }

        let res = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);


    })

})