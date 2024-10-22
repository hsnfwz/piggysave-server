import pkg from 'pg';
const { Pool } = pkg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const getTransactions = async (userId) => {
  try {
    const values = [userId];
    const sql = 'select * from transaction where profile_id=$1';
    const data = await pool.query(sql, values);
  
    return {
      data
    };
  } catch(error) {
    return { message: error };
  }
};

const getTransaction = async (userId, transactionId) => {
  try {
    const values = [userId, transactionId];
    const sql = 'select * from transaction where profile_id=$1 and transaction_id=$2';
    const data = await pool.query(sql, values);
  
    return {
      data
    };
  } catch(error) {
    return { message: error };
  }
};

const addTransaction = async (userId, body) => {
  try {
    const {
      type,
      name,
      amount,
    } = body;

    const values = [userId, type, name, amount];
    const sql = 'insert into transaction (profile_id, type, name, amount) values ($1, $2, $3, $4)';
    const data = await pool.query(sql, values);
  
    return {
      data
    };
  } catch(error) {
    return { message: error };
  }
};

const updateTransaction = async (userId, transactionId, body) => {
  try {
    const {
      type,
      name,
      amount,
    } = body;

    const TRANSACTION_COLUMNS = {
      'TYPE': {
        column: 'type',
        value: type
      },
      'NAME': {
        column: 'name',
        value: name
      },
      'AMOUNT': {
        column: 'amount',
        value: amount
      }
    }

    let sql = 'update transaction set';
    const columns = [];
    const values = [];

    if (type) {
      columns.push(TRANSACTION_COLUMNS.TYPE.column);
      values.push(TRANSACTION_COLUMNS.TYPE.value);
    }
    
    if (name) {
      columns.push(TRANSACTION_COLUMNS.NAME.column);
      values.push(TRANSACTION_COLUMNS.NAME.value);
    }
    
    if (amount) {
      columns.push(TRANSACTION_COLUMNS.AMOUNT.column);
      values.push(TRANSACTION_COLUMNS.AMOUNT.value);
    }

    columns.forEach((column, index) => {
      sql = sql + ' ' + `${column}=$${index+1}`;

      if (index !== columns.length-1) {
        sql = sql + ',';
      }
    });

    values.push(userId, transactionId);

    sql = sql + ' ' + `where profile_id=$${values.length-1} and transaction_id=$${values.length}`;

    const data = await pool.query(sql, values);
  
    return {
      data
    };
  } catch(error) {
    return { message: error };
  }
};

const removeTransaction = async (userId, transactionId) => {
  try {
    const values = [userId, transactionId];
    const sql = 'delete from transaction where profile_id=$1 and transaction_id=$2';
    const data = await pool.query(sql, values);
  
    return {
      data
    };
  } catch(error) {
    return { message: error };
  }
};

export {
  getTransactions,
  getTransaction,
  addTransaction,
  updateTransaction,
  removeTransaction,
};
