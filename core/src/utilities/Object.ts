interface NestedObject {
  [key: string]: any;
}

interface ObjectUtilities {
  GetNestedValue: (obj: NestedObject, key: string) => any;
}

const Object: ObjectUtilities = {
  GetNestedValue: (obj: NestedObject, key: string): any => {
    const properties = key.split('.');
    let value = obj;
    properties.forEach(prop => {
      if (!value) return null;
      value = value[prop];
    });
    return value;
  },
};

export default Object;
