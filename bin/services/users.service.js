import httpStatus from 'http-status';
import { generateHash } from '../config/bcrypt.js';
import { User } from '../config/db.js';

const adduser = async (req, res, next) => {
  try {
    const {
      first_name,
      middle_name,
      last_name,
      email,
      mobile,
      address,
      pincode,
    } = req.body;

    const password = '1234';

    User.create({
      password: await generateHash(password),
      email,
      mobile,
      first_name,
      last_name,
      middle_name,
      address,
      pincode,
      adminId: Number(req.user),
    })
      .then((createduser) => {
        res.status(httpStatus.OK).send({ isCreated: true, createduser });
      })
      .catch((error) => {
        console.log(error);
        res.status(httpStatus.ACCEPTED).send({ isCreated: false });
      });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// const updateuser = async (req, res, next) => {};

// const deleteuser = async (req, res, next) => {};

const getuser = async (req, res, next) => {
  try {
    const user = await User.findAll({
      where: { adminId: req.params.id, isAdmin: 0 },
    });

    if (user === null || user.length === 0) {
      res
        .status(httpStatus.OK)
        .send({ status: false, errCode: 'NO_RECORDS_FOUND' });
    } else {
      res.status(httpStatus.OK).send({ status: true, user });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export default {
  adduser,
  // updateuser,
  // deleteuser,
  getuser,
};
