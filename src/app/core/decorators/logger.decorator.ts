export function Logger() {
  return function (
    //no-es-lint
    _target: unknown,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function (...args: unknown[]) {
      console.log(`Метод ${propertyKey} вызван с аргументами:`, args);
      
      const result = originalMethod.apply(this, args);
      
      if (result instanceof Promise) {
        return result
          .then(data => {
            console.log(`Метод ${propertyKey} вернул результат:`, data);
            return data;
          })
          .catch(error => {
            console.error(`Метод ${propertyKey} вызвал ошибку:`, error);
            throw error;
          });
      }
      
      console.log(`Метод ${propertyKey} вернул результат:`, result);
      return result;
    };
  };
}