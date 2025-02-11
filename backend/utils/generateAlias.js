const generateAlias = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let alias = '';
    for (let i = 0; i < 6; i++) {
      alias += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return alias;
  };
  
  module.exports = generateAlias;