import pkg from 'pg';
const { Pool } = pkg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const removeProfile = async (userId) => {
  try {
    const values = [userId];
    const sql = 'delete from profile where profile_id=$1 returning *';
    const data = await pool.query(sql, values);
    return data;
  } catch(error) {
    throw(error);
  }
};

const addProfile = async (body) => {
  try {
    const {
      userId,
      event
    } = body;

    console.log(userId, event);

    return {
      message: 'Here is what I received',
      userId,
      event
    }

    // const values = [userId];
    // const sql = 'insert into profile (profile_id) values ($1) returning *';
    // const data = await pool.query(sql, values);
    // return data;
  } catch(error) {
    throw(error);
  }
};

export {
  removeProfile,
  addProfile,
};
