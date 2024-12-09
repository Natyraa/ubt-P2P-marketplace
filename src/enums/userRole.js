const UserRole = Object.freeze({
  BUYER: "Buyer",
  SELLER: "Seller",
  PREMIUM_BUYER : "PremiumBuyer"
});

export default UserRole;

/**The userRole object is created with Object.freeze() to ensure that the object is immutable , preventing any accedental modification 
 * 
 * Enumeration is a data strcture that allows you to define a set of named values , are used to represent fixed sets of related constants . Javascript does not have a built-in enum , but we can simulate them using object.freezze
*/