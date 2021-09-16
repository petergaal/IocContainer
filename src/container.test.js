import { IocContainer } from "./container";

describe("IOC container", () => {
  describe("Simple dependency", () => {
    class A {
      dependencies = ["b"];
    }

    class B {}

    const container = new IocContainer();
    container.register("a", A);
    container.register("b", B);
    container.initialize();
    const instanceA = container.getInstance("a");
    const instanceB = container.getInstance("b");

    it("should have instance B on instance A", () => {
      expect(instanceA.b).toEqual(instanceB);
    });
  });

  describe("Circular dependencies", () => {
    class A {
      dependencies = ["b"];
    }

    class B {
      dependencies = ["a"];
    }

    const container = new IocContainer();
    container.register("a", A);
    container.register("b", B);
    container.initialize();

    const instanceA = container.getInstance("a");
    const instanceB = container.getInstance("b");

    it("should have instance B on instance A", () => {
      expect(instanceA.b).toEqual(instanceB);
    });

    it("should have instance A on instance B", () => {
      expect(instanceB.a).toEqual(instanceA);
    });
  });

  describe("Constructor with arguments", () => {
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

    it("should have hello property on instance A", () => {
      expect(instanceA.hello).toEqual("Hello");
    });

    it("should have world property on instance A", () => {
      expect(instanceA.world).toEqual("world");
    });
  });
});
