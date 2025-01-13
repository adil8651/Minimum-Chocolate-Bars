function findLeastChocolate() {
  const boxSize = parseFloat(document.getElementById("boxSize").value);
  const chocolateSizesInput = document.getElementById("chocolateSizes").value;

  if (isNaN(boxSize)) {
    alert("Please Enter Box Size.");
    return;
  }

  let chocolateSizes = chocolateSizesInput
    .split(",")
    .map((item) => parseFloat(item.trim()));

  if (chocolateSizes.some(isNaN)) {
    alert("Please Enter Chocolate Sizes.");
    return;
  }
  chocolateSizes.sort((a, b) => a - b);
  if (chocolateSizes[0] < chocolateSizes[1]) {
    chocolateSizes.reverse();
  }

  let maxEachChocolate = [];

  for (let i = 0; i < chocolateSizes.length; i++) {
    let maxEach = Math.floor(boxSize / chocolateSizes[i]);
    for (let j = 1; j <= maxEach; j++) {
      maxEachChocolate.push(chocolateSizes[i] * j);
    }
  }
  let shortMaxEachChocolate = maxEachChocolate.sort(function (a, b) {
    return a - b;
  });
  let uniqueShortMaxEachChocolate = shortMaxEachChocolate.filter(
    (item, index, array) => array.indexOf(item) == index
  );
  let reverseMaxEachChocolate = uniqueShortMaxEachChocolate.reverse();
  let maxMaxEach = uniqueShortMaxEachChocolate.splice(
    0,
    Math.floor(reverseMaxEachChocolate.length / 2)
  );
  let minMaxEach = uniqueShortMaxEachChocolate.splice(
    Math.floor(uniqueShortMaxEachChocolate.length / 2) - 1,
    uniqueShortMaxEachChocolate.length
  );
  let reverseMinMaxEach = minMaxEach.reverse();
  let allCombination = [];
  for (let i = 0; i < maxMaxEach.length; i++) {
    if (maxMaxEach[i] == boxSize) {
      allCombination.push([maxMaxEach[i]]);
    }
    for (let j = 0; j < reverseMinMaxEach.length; j++) {
      if (maxMaxEach[i] + reverseMinMaxEach[j] == boxSize) {
        allCombination.push([maxMaxEach[i], reverseMinMaxEach[j]]);
      }
    }
  }
  let allCombinationChocolate = allCombination.map((each) =>
    each.map((item) => {
      let chocolateNumbers = [];
      for (let i = 0; i < chocolateSizes.length; i++) {
        if (item % chocolateSizes[i] == 0) {
          for (let j = 0; j < item / chocolateSizes[i]; j++) {
            chocolateNumbers.push(chocolateSizes[i]);
          }
          break;
        }
      }
      return chocolateNumbers;
    })
  );
  let allCombinationChocolateFlate = allCombinationChocolate.map((each) =>
    each.flat()
  );
  let lestChocolate = [];
  for (let i = 0; i < allCombinationChocolateFlate.length; i++) {
    if (lestChocolate.length == 0) {
      lestChocolate = allCombinationChocolateFlate[i];
    } else if (lestChocolate.length > allCombinationChocolateFlate[i].length) {
      lestChocolate = allCombinationChocolateFlate[i];
    }
  }

  document.getElementById("lestChocolate").value = lestChocolate.join(", ");
}
