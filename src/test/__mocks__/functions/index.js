export const LambdaFunctionMock = () => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'test',
      },
      null,
      2,
    ),
  }
}
