import httpStatus from 'http-status';
import pkg from 'jsonwebtoken';
import moment from 'moment';
import { generateHash, compareHash } from '../config/bcrypt.js';
import { User } from '../config/db.js';

const { sign: jwtSign } = pkg;

const signUpUser = async (req, res, next) => {
  try {
    const {
      password,
      first_name,
      middle_name,
      last_name,
      email,
      mobile,
      address,
      pincode,
      isAdmin,
      adminId,
    } = req.body;

    if (Number(isAdmin) === 1 && Number(adminId) === 0) {
      res
        .status(httpStatus.ACCEPTED)
        .send({ isCreated: false, errCode: 'EMP_VAL' });
    } else {
      User.create({
        password: await generateHash(password),
        email,
        mobile,
        first_name,
        last_name,
        middle_name,
        address,
        pincode,
        isAdmin,
        adminId: Number(adminId),
      })
        .then((createduser) => {
          res.status(httpStatus.OK).send({ isCreated: true, createduser });
        })
        .catch((error) => {
          console.log(error);
          res.status(httpStatus.ACCEPTED).send({ isCreated: false });
        });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { userid, password } = req.body;

    const user = await User.findOne({
      where: { userid, isAdmin: true },
    });

    if (user === null) {
      res.status(httpStatus.OK).send({
        errStatus: false,
        errCode: 'invalid',
        errMsg: 'Userid is invalid',
      });
    } else {
      if (await compareHash(password, user.password)) {
        const payload = {
          sub: user.userid,
          iat: moment().unix(),
          uat: moment().unix(),
          exp: moment().add(1, 'minutes').unix(),
          isadmin: user.isAdmin,
        };
        res.send({ errStatus: true, token: jwtSign(payload, 'zck@123') });
      } else {
        res.status(httpStatus.OK).send({
          errStatus: false,
          errCode: 'incorrect',
          errMsg: 'Password is incorrect',
        });
      }
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export default {
  signUpUser,
  loginUser,
};
