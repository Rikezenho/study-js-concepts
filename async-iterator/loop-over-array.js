const asyncIterable = [1, 2, 3];

asyncIterable[Symbol.asyncIterator] = async function*() {
  for (let i = 0; i < asyncIterable.length; i++) {
    yield new Promise((resolve) => setTimeout(
        () => resolve({ value: asyncIterable[i], done: false })
        , 1000
    ))
  }
  yield { done: true };
};

(async function() {
  for await (const part of asyncIterable) {
    console.log(part);
  }
})();