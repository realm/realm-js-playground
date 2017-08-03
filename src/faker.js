const Realm = require('realm')
const faker = require('faker')

const ProductSchema = {
    name: 'Product',
    primaryKey: 'productId',
    properties: {
        productId: { type: 'int', optional: false },
        name: { type: 'string', optional: false },
        price: { type: 'float', optional: false },
    }
}

const HOSTNAME = `192.241.226.174`
const USERNAME = `af@realm.io`
const PASSWORD = `test`

if (Realm.Sync.User.current) {
    startItUp(Realm.Sync.User.current)
} else {
    Realm.Sync.User.login(`http://${HOSTNAME}:9080/`, USERNAME, PASSWORD, (err, user) => {
        if (err) { console.error(err) }
        else {
            startItUp(user)
        }
    })
}

function startItUp(user) {
    const realm = new Realm({
        schema: [ProductSchema],
        sync: {
            user: user,
            url: `realm://${HOSTNAME}:9080/productslarge`
        }
    });
    setInterval(() => {
        realm.write(() => {
            for (var index = 0; index < 400000; index++) {
                realm.create('Product', {
                    productId: index,
                    name: faker.commerce.product(),
                    price: faker.random.number({ min: 100, max: 4000 })
                }, true)
            }
        })
    }, 2000)

}


