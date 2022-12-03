function sum(n) {
    let j = 0
    for (let i = 1; i <= n; i++) {
        j += i
    }
    return j
};

console.log(sum(1)); // 1
console.log(sum(2)); // 3
console.log(sum(3)); // 6
console.log(sum(10)); // 55 