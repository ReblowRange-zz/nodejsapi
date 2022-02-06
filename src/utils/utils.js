export const serverErrorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    if (error.errorCode) {
      console.log("================Exception caught==============");
      return (ctx.body = error.msg);
    }
  }
};
