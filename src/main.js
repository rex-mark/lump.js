module.exports = option => {
    ;(async () => {
        let resolveCallback
        let runAsync = true

        this.resolve = (cb) => { resolveCallback = cb}
        
        const {req, res, valid } = option.header

        let dataScope = option.data()
        for(let key in dataScope) {
            this[key] = dataScope[key]
        }

        this.reject = (error) => {
            runAsync = false
            res.json(error)
        }

        if(valid) {
            let expressList = valid.split(',')
            let loseKeys = []
            expressList.forEach(item => {
                if(!req.hasOwnProperty(item)) loseKeys.push(item)
            })
            if(loseKeys.length) {
                runAsync = false
                res.json({code: 1, error: {message: `request lose ${loseKeys.join(',')}`, keys: loseKeys}})
            }
        }

        if(runAsync) {
            for(let item of option.steps) {
                if(runAsync) {
                    let instance = option.async[item]
                    this[item] = instance
                    await instance.apply(this)
                }else{
                    break
                }
            }

            if(runAsync) {
                resolveCallback && resolveCallback()
                res.json({error: this.error, data: this.success})
            }
        }
    })();
    return this
}