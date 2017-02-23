const db = require('../../config/initializers/database');

const Organizations = {
  getAllOrganizations(req,res,next) {
    db.any('select * from organizations')
    .then( (data) => {
      res.status(200)
        .json({
          status: 'Success',
          data: data,
          message: 'Retrieved ALL organizations'
        });
    })
    .catch( (err) => {
      return next(err);
    });
  },

  getSingleOrganization(req,res,next) {
    var organizationID = parseInt(req.params.id);
    db.one('select * from organizations where id = $1', organizationID)
      .then( (data) => {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved ONE organization'
          });
      })
      .catch( (err) => {
        return next(err);
      });
  },

  createOrganization(req,res,next) {
    req.body.owner = parseInt(req.body.owner);
    db.none('insert into organizations(title, owner, description)' +
        `values(${title}, ${owner}, ${description})`,
      req.body)
      .then( () => {
        res.status(200)
          .json({
            status: 'success',
            message: 'Inserted one organization'
          });
      })
      .catch( (err) => {
        return next(err);
      });
  },

  updateOrganization(req,res,next) {
    req.body.owner = parseInt(req.body.owner);
    db.none('update organizations set title=$1, owner=$2, description=$3, updated_at=$4, where id=$5',
      [req.body.title, req.body.owner, req.body.description, new Date(), parseInt(req.params.id)])
      .then( () => {
        res.status(200)
          .json({
            status: 'success',
            message: 'Updated organization'
          });
      })
      .catch( (err) => {
        return next(err);
      });
  },
  
  removeOrganization(req,res,next) {
    var organizationID = parseInt(req.params.id);
    db.result('delete from organizations where id = $1', organizationID)
      .then( (result) => {
        /* jshint ignore:start */
        res.status(200)
          .json({
            status: 'success',
            message: `Removed ${result.rowCount} organization`
          });
        /* jshint ignore:end */
      })
      .catch( (err) => {
        return next(err);
      });
  }
}

module.exports = Organizations;