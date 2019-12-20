const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question(`Wie viele Heavenly Chips willst du erreichen? `, (number) => {
    getCookies(number);
    readline.close()
});

function getCookies(hc) {
    let cookies = hc ** 3 * 10 ** 12;
    cookies = cookies / (10 ** 9);
    let modifier = 0;
    const modifiers = ['Tr', 'Quadr', 'Quint', 'Sext', 'Sept'];
    while (cookies > 1000) {
        cookies /= 1000;
        modifier++;
    }
    console.log(`${cookies} ${modifiers[modifier]}`);
}
