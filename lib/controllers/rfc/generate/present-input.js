async function presentInput(request) {
  const {context, body} = request;
  const {database} = context;

  return {
    ...body,
    database
  };
}

module.exports = presentInput;
