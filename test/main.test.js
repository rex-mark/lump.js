const lump = require('../index')

let req = {a: 123, b: 'Tom'}
let res = {json: function(error) { console.log(error) }}
let getInfo = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({name: 'rext'})
        }, 3000)
    })
}

lump({
    header: {req, res, valid: 'a,b'},
    data() {
        return {
            success: null,
            error: null,
        }
    },
    steps: ['CHECK_INFO', 'GET_INFO'],
    async: {//sync
        async CHECK_INFO() {
            console.log('CHECK_INFO')
            let name = 'Tom'
            let age = 22
            await getInfo().then()
            this.reject(name)
        },
        GET_INFO() {
            console.log('GET_INFO')
            let num = 12
        }
    }
}).resolve(() => {
    this.error = {code: 1}
    this.success = {code: 0}
})