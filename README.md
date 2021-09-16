IocContainer
==========

IocContainer is a simple dependency injection container in Javascript.

Usage
------------

### Simple dependency

```js
class A {
  dependencies = ["b"];
}

class B {
}

// create container instance
const container = new IocContainer();

// register classes
container.register("a", A);
container.register("b", B);
container.initialize();

// initialize all classes
container.initialize();

const instanceA = container.getInstance("a");
const instanceB = container.getInstance("b");

// After initialisation: instanceA.b == instanceB
```
### Singleton Objects

All objects created by container are singletons by default. It can be changed but this is 
not well tested in complicated scenarios.

```js
class A {
}

container.register("a", A);

const instanceA1 = container.getInstance("a");
const instanceB2 = container.getInstance("a");
// After initialisation: instanceA1 === instanceA2
```

### Classes with arguments in constructor

Passing arguments are supported in `register` call as an optional parameters: 

```js
class A {
  constructor(hello, world) {
    this.hello = hello;
    this.world = world;
  }
}

const container = new IocContainer();
container.register("a", A, "Hello", "world");
container.initialize();

const instanceA = container.getInstance("a");

// After initialisation:
//   instanceA.hello = "Hello"
//   instanceA.world = "world"
```

### Circular Dependency

There is a support for circular dependency, that's why I chose to not inject the dependency using constructor.

```js
    class A {
  dependencies = ["b"];
}

class B {
  dependencies = ["a"];
}

const container = new IocContainer2();
container.register("a", A);
container.register("b", B);
container.initialize();

const instanceA = container.getInstance("a");
const instanceB = container.getInstance("b");

// After initialisation:
//   instanceA.b == instanceB
//   instanceB.a == instanceA
```
