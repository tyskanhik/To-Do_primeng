export function Logger() {
  return function (
    _target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function (...args: any[]) {
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