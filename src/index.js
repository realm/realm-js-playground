const Realm = require('realm')

const ADMIN_USERNAME = "admin.user@realm.io" // replace me!
const AMDIN_PASSWORD = "ilovesushi" // replace me!
const REALM_URL = "realm://localhost:9080" // replace me!
const REALM_AUTH_URL = "http://localhost:9080" // replace me!
const PRODUCTS_REALM_URL = `${REALM_URL}/products`

function ready(user){
    const PRODUCTS_REALM_URL = `${REALM_URL}/products`
    Realm.openAsync({
        user: user
    }).then(realm => {
        // do your thing here!
    })
}

Realm.Sync.User.login(REALM_AUTH, ADMIN_USERNAME, ADMIN_PASSWORD, (err, user) => {
    if(err) { console.error(err.toString()) }
    else {
        ready(user)
    }
})