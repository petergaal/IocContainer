export class IocContainer {
  constructor() {
    this.classMap = {};
  }

  register(name, classType, ...args) {
    this.classMap[name] = {
      name,
      classType,
      args,
      singleton: true,
      instance: null,
    };
  }

  setSingleton(name, value) {
    const record = this.classMap[name];
    if (record == null) {
      throw new Error(`Object not registered: ${name}`);
    }
    this.classMap[name] = { ...record, singleton: value };
  }

  getInstance(name) {
    const record = this.classMap[name];
    if (record == null) {
      throw new Error(`Object not registered: ${name}`);
    }
    if (record.singleton) {
      if (record.instance == null) {
        record.instance = this.factory(record.classType, record.args);
        this.inject(name, record.instance);
      }
    } else {
      record.instance = this.factory(record.classType, record.args);
      this.inject(name, record.instance);
    }
    return record.instance;
  }

  inject(name, instance) {
    const dependencies = instance?.dependencies;
    if (dependencies && Array.isArray(dependencies)) {
      dependencies.forEach((item) => {
        const dependencyInstance = this.getInstance(item);
        if (dependencyInstance == null) {
          throw new Error(`Dependency ${name} can not be satisfied`);
        }
        instance[item] = dependencyInstance;
      });
    }
  }

  initialize() {
    for (const name in this.classMap) {
      this.getInstance(name);
    }
  }

  factory(classType, args = []) {
    return new classType(...args);
  }

  clear() {
    this.classMap = {};
  }
}
