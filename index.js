const myPromisify = (fn) => {
    return (...args) => {
        return new Promise((resolve, reject) => {
            function customCallback(err, ...results) {
                if(err) {
                    return reject(err);
                } else {
                    return resolve(results.length === 1 ? results[0] : results);
                }
            }
            args.push(customCallback);
            fn.call(this, ...args);
        })
    }
}

const myPromisifyAll = (obj) => {
    let getObjFuncPromise;

   arrObjFuncs = Object.values(obj);
   arrObjFuncs.forEach((item) => {
        getObjFuncPromise = myPromisify(item)
        getObjFuncPromise(3, 2).then(result => {
            console.log(result);
        })
   })
}

let obj = {
    func1: (num1, num2, callback) => {
        if (!num1 || !num2) {
            return callback(new Error("Missing arguments"), null);
        }
    
        const sum = num1 + num2;
        const message = `Sum is ${sum}`;
        return callback(null, sum, message);
    },

    func2: (num1, num2, callback) => {
        if (!num1 || !num2) {
            return callback(new Error("Missing arguments"), null);
        }
    
        const minus = num1 - num2;
        const message = `Minus is ${minus}`;
        return callback(null, minus, message);
    } 
}

myPromisifyAll(obj);
