const Model = require('./model/index_alpha');

module.exports = {

async grewtaleContent (req, res, next){	
 
 const payload = {
id : req.params.id
 };
 const r = await process(payload);
 res.json(r);

},
async process(d){return process(d)}
};
async function process(d){
  const _model = await  Model.getContent(d);
  const access = _model.output;
  if (access === 'Nothing' || access === 'Error')
    {
      var ac  = 'Nothing'
    }else{
      ac  = _model.output;
	}
   return ac;
}