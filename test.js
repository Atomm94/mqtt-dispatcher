async function a() {
    console.log('a')
}

async function b() {
    console.log('b')
}

async function c() {
    console.log('c')
}

async function d() {
    await b()
    console.log('d')
}

async function z() {
    await a()
    console.log('z')
}

(async () => {
    const arr = await Promise.all([c(), d(), z()])

    console.log(arr)
})()