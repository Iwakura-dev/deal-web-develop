import * as ethers from 'ethers';

class AbiCoder {
  private readonly abiCoder = new ethers.AbiCoder();
  private readonly ADDRESS_PREFIX_REGEX = /^(41)/;
  private readonly ADDRESS_PREFIX = '41';

  decode(types: string[], output: string, ignoreMethodHash = true): string[] {
    if (ignoreMethodHash && output.replace(/^0x/, '').length % 64 === 8)
      output = '0x' + output.replace(/^0x/, '').substring(8);

    if (output.replace(/^0x/, '').length % 64)
      throw new Error(
        'The encoded string is not valid. Its length must be a multiple of 64.',
      );
    return this.abiCoder
      .decode(types, output)
      .reduce((obj: string[], arg, index) => {
        if (types[index] === 'address')
          arg = this.ADDRESS_PREFIX + arg.substr(2).toLowerCase();
        obj.push(arg);
        return obj;
      }, []);
  }

  encode(inputs: {type: string; value: string | string[] | number}[]) {
    const typesValues = inputs;
    let parameters = '';

    if (typesValues.length == 0) return parameters;
    const types = [];
    const values = [];

    for (let i = 0; i < typesValues.length; i++) {
      const {type} = typesValues[i];
      let {value} = typesValues[i];
      if (type == 'address') {
        value = (value as string).replace(this.ADDRESS_PREFIX_REGEX, '0x');
      } else if (type == 'address[]') {
        value = (value as string[]).map(v =>
          v.replace(this.ADDRESS_PREFIX_REGEX, '0x'),
        );
      }
      types.push(type);
      values.push(value);
    }

    try {
      parameters = this.abiCoder.encode(types, values).replace(/^(0x)/, '');
    } catch (ex) {
      console.error(ex);
    }
    return parameters;
  }
}

export default new AbiCoder();
