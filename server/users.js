const USERS = [
    {
        id: 1,
        username: 'johndoe',
        email: 'johndoe@gmail.com',
        password: '123456'
    },
    {
        id: 2,
        username: 'jamessmith',
        email: 'jamessmith@gmail.com',
        password: 'abcdef'
    },
    {
        id: 3,
        username: 'johnnybravo',
        email: 'johnnybravo@gmail.com',
        password: '000000'
    },
]

const USERS_PAYMENT_DETAILS = {
    johndoe: [
        { cardNumber: '5511133999959332', expiry: '02/28' },
        { cardNumber: '7747119999147747', expiry: '02/30' },
    ],
    jamessmith: [
        { cardNumber: '8883331888111833', expiry: '04/26' },
        { cardNumber: '1586281481814861', expiry: '11/27' },
    ],
    johnnybravo: [
        { cardNumber: '1237774881847142', expiry: '01/31' },
        { cardNumber: '1794971597529751', expiry: '12/26' },
    ],
}

module.exports = {
    USERS, USERS_PAYMENT_DETAILS
}