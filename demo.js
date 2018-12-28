//user login
lump(
    data => {//
        return {
            list: []
        }
    },
    [
    REQ({name:string, password:any}),//
    CHECK_LOGIN => {// => unit test(default try catch)
        if(REQ.name === 'Tom' && REQ.password === '123456') {
            let result = await fetch('/api/...')//...
        }else{
            return {error: {}}
        }
    },
    GET_INFO => { // => unit test(rely on CHECK_LOGIN, will run CHECK_LOGIN first)
        let age = 23
        let sex = 'man'
        let result = {age, sex}

        //can get CHECK_LOGIN's property
        return {error: {}}// break the lump
    },
    SYNC_INFO,//can import define module
    // ... and more
]).resolve(() => {
    return 1
}).test(//unit test
    {
        'test CHECK_LOGIN': `IF FILTER_REQ.name='TOM' AND FILTER_REQ.password='123456' THEN CHECK_LOGIN.result=true`
    }
)