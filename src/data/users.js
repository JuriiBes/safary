export const usersData = [
    {
        id: 1,
        username: {
            firstName: 'Samuel',
            lastName: 'Black',
        },
        email: 'ayokunle@gmail.com',
        telephone: '+234 708 568 5878',
        postAddress: [
            {
                fullName: 'Jo Week',
                state: 'Nigeria',
                city: 'Kaduna',
                region: 'Kaduna',
                address: {
                    numberHouse: '4',
                    street: 'Barnawa Close',
                    cityRegion: 'Barnawa',
                },
                telephone: '+234 708 568 5878',
            },
            {
                fullName: 'Samuel Black',
                state: 'Nigeria',
                city: 'Kaduna',
                region: 'Kaduna',
                address: {
                    numberHouse: '444/5',
                    street: 'Barnawa Close',
                    cityRegion: 'Barnawa',
                },
                telephone: '+234 123 456 7890',
            },
        ],
        orders: [
            {
                productList: [{ idProduct: 25, quantity: 1, size: 'L', dateOrder: '18/9/2019', price: 10000 }],
                delivery: {
                    deliveryMethod: 'Door delivery',
                    deliveryPrice: 1500,
                    deliveryStatus: 'Delivered',
                    deliveryAddress: {
                        nameClient: 'Jo Week',
                        address: '444/5, Barnawa Close, Barnawa Kaduna.',
                    },
                },
            },
            {
                productList: [
                    { idProduct: 10, quantity: 1, size: 'L', dateOrder: '20/7/2020', price: 120000 },
                    { idProduct: 20, quantity: 1, size: '7', dateOrder: '20/7/2020', price: 10000 },
                ],
                delivery: {
                    deliveryMethod: 'Door delivery',
                    deliveryPrice: 2000,
                    deliveryStatus: 'To arrive',
                    deliveryAddress: {
                        nameClient: 'Samuel Black',
                        address: '4, Barnawa Close, Barnawa Kaduna.',
                    },
                },
            },
        ],
        cart: {
            cartItems: [
                { idProduct: 15, quantity: 1 },
                { idProduct: 5, quantity: 2 },
            ],
            delivery: {
                deliveryMethod: null,
                deliveryPrice: null,
                deliveryStatus: null,
                deliveryAddress: {},
            },
            payment: null,
        },
        favorites: [12, 33, 8, 15, 19],
    },
]
