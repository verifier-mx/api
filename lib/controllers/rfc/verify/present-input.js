async function presentInput(request) {
  const {context, body} = request;
  const {database} = context;
  const {rfc} = body;

  return {
    database,
    rfc
  };
}

module.exports = presentInput;
