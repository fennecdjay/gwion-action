# Run Gwion From github action

Simplify using [Gwion](https://github.com/fennecdjay/Gwion) within github actions.

# Usage

A simple example:

``` yml
  - name: Build Gwion
    uses: fennecdjay/gwion-action@v1
```

A more complex build, running the tests

``` yml
  - name: Build Gwion
    uses: fennecdjay/gwion-action@v1
    with:
      dir: .
      run: true
    env:
      USE_DEBUG: 1
```
