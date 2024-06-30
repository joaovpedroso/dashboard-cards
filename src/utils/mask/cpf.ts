const cpfMask = (value: string) => {
    return removeNumberMasks(value)
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
};

const removeNumberMasks = (value: string): string => value.toString().replace(/\D/g, "");

export { cpfMask, removeNumberMasks };