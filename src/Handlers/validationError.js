// eslint-disable-next-line import/no-cycle
import { ErrorHandler } from '.';

const validationError = (array) => {
  array.forEach((element) => {
    throw new ErrorHandler(element.msg, 400);
  });
};
export default validationError;
