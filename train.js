// A-TASK:
// Shunday 2 parametrli function tuzing, hamda birinchi parametrdagi
// letterni ikkinchi parametragi sozdan qatnashga sonini return qilishi
// kerak boladi.
// MASALAN countLetter("e", "engineer") 3ni return qiladi.

function countLetter(a, str) {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if(a == str.charAt(i)) {
            count +=1;
        }
    }
    return count;
}

console.log(countLetter("e", "engineer"));



// console.log("Jack Ma maslahatlari");
// const list = [
//     "yaxshi talaba boling", //0-20
//     "togri boshliq tanlang va koproq xato qiling", //20-30
//     "work on yourself", //30-40
//     "do what you are good at", //40-50
//     "invest for youth", //50-60
//     "now its time to rest, no need to do anything else", //60
// ];

// //callback functions
// function maslahatBering(a, callback) {
//     if(typeof a !== 'number') callback("insert number", null) //birinchi ""err nomi, 2-si data, if no then null
//     else if(a <= 20) callback(null, list[0]);
//     else if(a > 20 && a <= 30) callback(null, list[1]);
//     else if(a > 30 && a <= 40) callback(null, list[2]);
//     else if(a > 40 && a <= 50) callback(null, list[3]);
//     else if(a > 50 && a <= 60) callback(null, list[4]);
//     else {
//         setInterval(function(){
//             callback(null, list[5]);
//         }, 5000)
//     }
// }


// console.log('Passed here 0')
// maslahatBering(65, (err, data) => {  //parametr sifatida function ishg tushadi
//     if(err) console.log('ERROR:', err);
//     else {
//         console.log('javob:', data)
//     } 
// });


//ASYNC functions 
// async function maslahatBering(a) {
//     if(typeof a !== 'number') throw new Error("insert number") 
//     else if(a <= 20) return list[0];
//     else if(a > 20 && a <= 30) return list[1];
//     else if(a > 30 && a <= 40) return list[2];
//     else if(a > 40 && a <= 50) return list[3];
//     else if(a > 50 && a <= 60) return list[4];
//     else {
//         return new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 resolve(list[5]);
//             }, 5000);
//         });
//     }
// }

// maslahatBering('salom', (err, data) => {  //parametr sifatida function ishg tushadi
//     if(err) console.log('ERROR:', err);
//     else {
//         console.log('javob:', data)
//     } 
// });

//then catch orqali call qismini yasadik
// console.log('Passed here 0')
// maslahatBering(25)
// .then((data) => {
//     console.log('javob:', data);
// })
// .catch((err) => {
//     console.log('ERROR:', err)
// })
// console.log('Passed here 1');




//async & va await orqali call qismini qurdik
// async function run() {
//     let javob = await maslahatBering(25);
//     console.log(javob);
//     javob = await maslahatBering(70);
//     console.log(javob);
//     javob = await maslahatBering(41);
//     console.log(javob);
// }
// run();

/* 
//misol uchun setIntervalda olsak, terminalda kyesok 
chiqarib boravermaydi, qachonki call back da olsakkina 
keyin kyesok chiqaradi 
//async function har doim sync function lar
 ishga ushib bolgandan keyin ishlaydi
//async function single thread ni band qilmay, 
pryamoy ichidagi loop ga tashlab berishi ham one advantage
// async functionda setInterval ishlamaydi, qachonki Promise function
orqali ishlatsak yaxshi ishlaydi
 */