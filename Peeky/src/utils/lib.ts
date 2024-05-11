export const generateId: () => string = (length: number = 6) => {
  const CHARA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += CHARA.charAt(Math.floor(Math.random() * CHARA.length));
  }
  return result;
}
