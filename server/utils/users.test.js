const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {

    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id:'1',
            name:'Mike',
            room:'Node'
        },
        {
            id:'2',
            name:'jen',
            room:'react'
        },
        {
            id:'3',
            name:'julie',
            room:'Node'
        },]
    })

    it('should add new user', () => {

        var users = new Users();

        let user = {
            id: "123",
            name: "Ramon",
            room: "sala"
        }

        let res = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);


    });

    it('should return names for node course', () => {

        let userList = users.getUserList('Node');

        expect(userList).toEqual(['Mike','julie'])

    })

    it('should return names for react course', () => {

        let userList = users.getUserList('react');

        expect(userList).toEqual(['jen']);

    })

    it('should remove a user', () => {

        let userId = "3";
        let usersLength = users.users.length;

        let user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(usersLength-1)
            

    })
    
    it('should not remove a user', () => {

        let userId = "4123";
        let usersLength = users.users.length;

        let user = users.removeUser(userId);

        expect(user).toNotExist()
        expect(users.users.length).toBe(usersLength)

    });

    
    it('should find a user', () => {

        let userId = '1'
        let user = users.getUser(userId);

        expect(user.id).toBe(userId)

    })

    it('should not find a user', () => {

        let userId = '12313'
        let user = users.getUser(userId);

        expect(user).toNotExist()

    })
})