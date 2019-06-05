const express = require('express');
const path = require('path');
const app = express();

// React app
app.use(express.static(path.join(__dirname, 'client/client/build')));

// Double-base palindromes request
app.get('/v1/numbers/palindrome/:upperBound?', (req, res) => {
    var resultList = [];
    var upperBound = req.params.upperBound;

    // Error response
    if (!upperBound || isNaN(upperBound)) {
        
        res.status(400).send({
            success: false,
            message: 'Invalid upper bound value',
            result: resultList
        });
        console.log('Invalid upper bound value');
        return;
    }

    // Result response. Palindrome calculations
    for (var i = 0; i < upperBound; i++) {
        if (isPalindromeInBase10(i) && isPalindromeInBase2(i)) {
            resultList.push(i);
        }
    }
    res.status(200).send({
        success: true,
        message: 'Retrieved successfully',
        result: resultList
    });
    console.log('Retrieved successfully');
});

// Fallback for unidentified requests
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/client/build/index.html'));
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port);
console.log('App is listening on port ' + port);




// Aux functions
function isPalindromeInBase10(number) {
    var n = 0, m = number;
    while (number > 0) {
        n = n * 10 + number % 10;
        number = number / 10 | 0;
    }
    return n === m;
}

function isPalindromeInBase2(number) {
    var s = number.toString(2);
    var a = s.length - 1;
    var b = 0;
    while (b < a) {
        if (s[a] !== s[b]) { return false; }
        b++; a--;
    }
    return true;
}