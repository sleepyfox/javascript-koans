var _; //globals

describe("About Applying What We Have Learnt", function() {

    var products;

    beforeEach(function () { 
	products = [
	    { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
	    { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
	    { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
	    { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
	    { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
	];
    });
    
    /*********************************************************************************/
    
    it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
	
	var i,j,hasMushrooms, productsICanEat = [];
	
	for (i = 0; i < products.length; i+=1) {
            if (products[i].containsNuts === false) {
		hasMushrooms = false;
		for (j = 0; j < products[i].ingredients.length; j+=1) {
		    if (products[i].ingredients[j] === "mushrooms") {
			hasMushrooms = true;
		    }
		}
		if (!hasMushrooms) productsICanEat.push(products[i]);
            }
	}
	
	expect(productsICanEat.length).toBe(1);
    });
    
    it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
	
	/* solve using filter() & all() / any() */
	var CheckNoNuts = function(recipe){
	    return (recipe.containsNuts === false);
	}
	var CheckNoMushrooms = function(recipe){
	    return (recipe.ingredients.indexOf("mushrooms") === -1);
	}

	var productsICanEat = products.filter(CheckNoNuts).filter(CheckNoMushrooms);
	
	expect(productsICanEat.length).toBe(1);
    });
    
    /*********************************************************************************/

    it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    
    var sum = 0;
    for(var i=1; i<=1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(234168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
      
      function range(start, end) { 
	  var array = [];
	  for (var i = start; i <= end; i++) {
	      array.push(i);
	  } 
	  return array;
      }

      var multiples = range(1,1000).filter(function(i){ return (i % 3 === 0 || i % 5 === 0);});
      var sum = multiples.reduce(function(a, b){ return a + b;}, 0);

      expect(234168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
      var ingredientCount = {};

      /* chain() together map(), flatten() and reduce() */
      var listOfIngredients = (_.pluck(products,'ingredients')).
	  reduce(function(a,b){ return a.concat(b);});

      ingredientCount = listOfIngredients.reduce(function(hash, item){
	  hash[item] = (hash[item] || 0) + 1;
	  return hash;
      }, {});
      expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  /* */
  it("should find the largest prime factor of a composite number", function () {
      function isPrime(number) {
	  // true if number is prime, assumes number is an integer > 0
	  number = Math.floor(number);
	  if (number === 1) return false;
	  if (number === 2) return true;
	  for (var i = 2; i <= Math.sqrt(number + 0.5); i++) {
	      if (number % i === 0) return false; // has divisor, hence not prime
	  }
	  return true; // has no divisors 
      }

      function range(start, end) { 
	  var array = [];
	  for (var i = start; i <= end; i++) {
	      array.push(i);
	  } 
	  return array;
      }

      var primes = range(1,10).filter(isPrime);
      expect(isPrime(2)).toBe(true);
      expect(isPrime(4)).toBe(false);
      expect(isPrime(5)).toBe(true);

      function factors(number) {
	  // Returns a list of all factors of number, not including 1 and itself
	  // number is assumed to be an integer >= 2
	  var arrayOfFactors = [];
	  number = Math.floor(number); // just in case it isn't an integer!
	  for (var i = 2; i <= number / 2; i++) {
	      if (number % i === 0) arrayOfFactors.push(i); 
	  }
	  return arrayOfFactors;
      }

      expect(factors(10)).toEqual([2,5]);

      function largestPrimeFactor(number) {
	  // Returns the largest prime factor of number
	  var primeFactors = factors(number).filter(isPrime);
	  return primeFactors.pop(); // as factors are in numeric order (ASC)
      }

      expect(largestPrimeFactor(70)).toBe(7);
      expect(largestPrimeFactor(754151)).toBe(991);
  });
    
  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
      // Approach: construct the array of all 3 digit products = 900*900=810K
      // Sort the array (removing duplicates?)
      // Starting at the end, work backwards to find the first that is a palindrome
      
      function isPalindrome(string) {
	  // Returns true if the number is a palindrome 
	  // (reads the same forwards as backwards)
	  // Approach:
	  //   aXb is a palindrome if (a===b) and X is a palindrome
	  //   X is a palindrome if X.length = 1 or 0
	  if (string.length < 2) {
	      return true;
	  }
	  if (string[0] === string[string.length - 1]) {
	      return isPalindrome(string.substr(1, string.length - 2));
	  }
	  return false;
      }
      expect(isPalindrome("1234321")).toBe(true);
      expect(isPalindrome("123321")).toBe(true);
      expect(isPalindrome("12345")).toBe(false);

      // Optimisation: just search top 10% of range to save time
      const bottom = 900, top = 999, range = top - bottom + 1;
      var products = [];
      for (var i = bottom; i <= top; i++) {
	  for (var j = bottom; j <= top; j++) {
	      products.push("" + (i * j));
	  }
      }
      expect(range).toBe(100);
      expect(products.length).toBe(range * range);
      expect(products[products.length - 1]).toBe((999 * 999).toString());

      var palindromes = products.filter(isPalindrome).sort();
      expect("906609").toBe(palindromes.pop());
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {      
      // Approach: count up, check each one to make sure it is divisible by all 
      // integers from 2..20
      // Note: did try doing this in a more functional manner, but manipulating
      //       arrays proved to be approx 10x-100x as slow :/
      
      function divisibleByRange(number, range) {
	  // Returns whether the number is divisible by all integers from 1 to 20
	  // number is assumed to be a positive integer > 0	  
	  // Optimisation: count backwards for quicker elimination
	  for (var i = range; i >= 2; i--) {
	      // number must have ALL as divisors
	      if (number % i != 0) return false;
	  }
	  return true;
      }
      expect(divisibleByRange(232792560)).toBe(true);

      // count till we find one
      const MAX_DIVISOR = 20;
      var count = MAX_DIVISOR;
      while (!divisibleByRange(count, MAX_DIVISOR)) {
	  count++;
      } 
      expect(count).toBe(232792560); 
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
      // Note: this is Project Euler.net problem 6
      // Approach: Make array of the first 100 natural numbers
      //           use a reduce to calculate sum, and then square
      //           use a map to calculate the square, then a reduce to sum

      function range(start, end) { 
	  var array = [];
	  for (var i = start; i <= end; i++) {
	      array.push(i);
	  } 
	  return array;
      }

      function sum(a, b) {
	  return a + b;
      }
      
      function square(a) {
	  return a * a;
      }

      var naturalNums = range(1,100);
      var sums = Math.pow(naturalNums.reduce(sum), 2);
      var squares = naturalNums.map(square).reduce(sum);
      expect(sums).toBe(25502500);
      expect(squares).toBe(338350);
  });

  it("should find the 10001st prime", function () {
      // Approach: Count up, check each number to see if a prime, if it is then 
      //           increment counter, stop at 10001

      function isPrime(number) {
	  // true if number is prime, assumes number is an integer > 0
	  number = Math.floor(number);
	  if (number === 1) return false;
	  if (number === 2) return true;
	  for (var i = 2; i <= Math.sqrt(number + 0.5); i++) {
	      if (number % i === 0) return false; // has divisor, hence not prime
	  }
	  return true; // has no divisors 
      }

      var count = 0, i = 1; // 2 is the first prime
      do {
	  i++;
	  if (isPrime(i)) {
	      count++;
	  }
      } while (count < 10001);
      expect(i).toBe(104743);
  });
 
});
