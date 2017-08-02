const Realm = require('realm')
const faker = require('faker')

const ProductSchema = {
    name: 'Product',
    primaryKey: 'productId',
    properties: {
        productId: { type: 'int', optional: false },
        name: { type: 'string', optional: false },
        price: { type: 'float', optional: false },
        companyName: { type: 'string', optional: false },
    }
}

const realm = new Realm({
    schema: [ProductSchema]
})

for (var index = 0; index < 100; index++) {
    realm.write(() => {
        realm.create('Product', {
            productId: index,
            name: faker.commerce.product.name,
            price: faker.random.number({min: 20, max: 2000}),
            companyName: faker.company.companyName()
        }, true)
    })
}