module.exports.postCreate = (req, res, next) => {
  let errors = [];
  const { name, phone } = req.body;
  if(!name) {
    errors.push('Name is empty');
  }
  if(!phone) {
    errors.push('Phone is empty');
  }
  if(errors.length) {
    return res.render('users/create', { errors, values: req.body });
  }

  next();
}