// // 模拟一个异步操作，例如网络请求
// function fetchData() {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve("数据已获取");
//         }, 2000); // 模拟2秒的网络延迟
//     });
// }
//
// async function main() {
//     console.log("开始获取数据...");
//     const data = await fetchData(); // 等待异步操作完成
//     console.log(data); // 输出 "数据已获取"
//     console.log("数据获取完成");
// }
//
// console.log("程序开始");
// main();
// console.log("程序继续执行，不会被阻塞");

//写一个加法函数
// async function add(a, b) {
//     await killtime()
//     console.log("a + b = ", a + b);
//     return a + b;
// }
// function killtime(){
//     //写一个循环
//     for (let i = 0; i < 1000000000; i++) {
//         for (let j = 0; j < 1000000000; j++) {
//             //do nothing
//             for (let k = 0; k < 1000000000; k++) {
//                 //do nothing
//                 for (let l = 0; l < 1000000000; l++) {
//                     //do nothing
//                 }
//             }
//         }
//     }
// }
// let b = 7
// let a = add(1, 2)
//  console.log("b = ", b)
//  console.log("a = ", a)

async function add(a, b) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("a + b = ", a + b);
            resolve(a + b);
        }, 2000); // 模拟2秒的延迟
    });
}

let b = 7
let a = add(1, 2)
console.log("b = ", b)
console.log("a = ", a)

setTimeout(() => {
    console.log("a = ", a)
}, 2000)
