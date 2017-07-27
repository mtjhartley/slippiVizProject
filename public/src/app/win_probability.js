// Estimates the probability that p1 wins
function win_probability(p1Stock, p1Percent, p2Stock, p2Percent) {
    function stocks_as_float(stock, percent) {
        return stock - Math.min(percent, 130) / 140.0
    }

    p1Stocks = stocks_as_float(p1Stock, p1Percent)
    p2Stocks = stocks_as_float(p2Stock, p2Percent)
    stocksTakenAdvantage = Math.log10(p2Stocks / p1Stocks)
    percentIntoMatch = 1.0 - (p1Stocks + p2Stocks) / 8.0
    
    advantageWeight = -2.734 + 2.638 * percentIntoMatch
    return Math.min(Math.max(0.50 + stocksTakenAdvantage * advantageWeight, 0.001), 0.999)
}

console.log(win_probability(2, 10, 2, 20))
console.log(win_probability(4, 10, 3, 20))
console.log(win_probability(1, 10, 2, 20))