import * as ERRORS_MSGS from "../constants/error_msgs";
import * as METADATA_KEY from "../constants/metadata_keys";

/**
 * KC
 * 这个修饰器主要是用来存储类的构造函数中的参数类型。类型校验
 * 在emitDecoratorMetadata配置打开时，TS编译的时候默认会给有修饰器的属性方法增加以下元数据。
 * 1. design:type => 表示属性或者方法的类型。返回类型的构造函数
 * 2. design:paramtypes => 表示方法中参数类型。
 * 3. design:returntype => 表示方法中的返回值类型
 * @returns 
 */

function injectable() {
  return function <T extends abstract new (...args: never) => unknown>(target: T) {

    if (Reflect.hasOwnMetadata(METADATA_KEY.PARAM_TYPES, target)) {
      throw new Error(ERRORS_MSGS.DUPLICATED_INJECTABLE_DECORATOR);
    }

    const types = Reflect.getMetadata(METADATA_KEY.DESIGN_PARAM_TYPES, target) || [];
    Reflect.defineMetadata(METADATA_KEY.PARAM_TYPES, types, target);

    return target;
  };
}

export { injectable };
