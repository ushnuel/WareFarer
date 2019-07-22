import { check } from 'express-validator';

class Validation {
  static userValidator(method) {
    switch (method) {
      case 'signUp':
        return [
          check('email', 'Invalid email address')
            .exists()
            .isEmail(),
          check('password')
            .exists()
            .withMessage('Provide a password')
            .isLength({ min: 8 })
            .withMessage('password should be at least 8 chars long'),
          check('first_name', 'invalid first name, must be a string').isString(),
          check('last_name', 'invalid last name, must be a string').isString(),
        ];
      case 'signIn':
        return [
          check('email', 'Invalid email address')
            .exists()
            .isEmail(),
          check('password', 'invalid password').exists(),
        ];
      default:
    }
    return method;
  }

  static tripValidator(method) {
    switch (method) {
      case 'create':
        return [
          check('bus_id')
            .exists()
            .withMessage('Select a bus to continue')
            .isInt({ min: 1 })
            .withMessage('Bus id must be an integer'),
          check('fare')
            .exists()
            .withMessage('Input the price for the trip')
            .isInt({ min: 1 })
            .withMessage('Price must be a number'),
          check('origin')
            .exists()
            .withMessage('Input trip starting point')
            .isString()
            .withMessage('Origin must be a string'),
          check('destination')
            .exists()
            .withMessage('Input trip destination')
            .isString()
            .withMessage('destination must be a string'),
        ];
      default:
    }
    return method;
  }

  static bookingValidator(method) {
    switch (method) {
      case 'create':
        return [
          check('bus_id')
            .exists()
            .withMessage('Select a bus to continue')
            .isInt({ min: 1 })
            .withMessage('Bus id must be a number'),
          check('trip_id')
            .exists()
            .withMessage('Select a trip to continue')
            .isInt({ min: 1 })
            .withMessage('Trip id must be an integer'),
          check('trip_date', 'Choose a suitable date for your trip').exists(),
          check('seat_number', 'Seat number must be an integer').isInt({ min: 1 }),
        ];
      case 'changeSeat':
        return [
          check('seat_number', 'Invalid seat number')
            .exists()
            .isInt({ min: 1 }),
        ];
      default:
    }
    return method;
  }

  static busValidator(method) {
    switch (method) {
      case 'create':
        return [
          check('model', 'Select the model of your car')
            .exists()
            .isString(),
          check('manufacturer', 'Invalid manufacturer').isString(),
          check('year', 'Year should be an integer').isInt({ min: 1 }),
          check('capacity', 'Bus capacity should be a number').isInt({ min: 1 }),
        ];
      default:
    }
    return method;
  }
}
export default Validation;
