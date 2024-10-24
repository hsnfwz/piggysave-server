import pkg from 'pg';
const { Pool } = pkg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const getTransactions = async (userId) => {
  try {
    const values = [userId];
    const sql = 'select * from transaction where profile_id=$1 order by date_time_utc desc';
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

const getTransactionsByTotalAmountPerYear = async (userId, type) => {
  try {
    const values = [userId, type];
    const sql = `select sum(amount) as total_amount, date_trunc('year', date_time_utc) as year from transaction where profile_id=$1 and type=$2 group by year`;
    const data = await pool.query(sql, values);
  
    return {
      data
    };
  } catch (error) {
    return { message, error };
  }
}

const getTransactionsByTotalAmountPerMonth = async (userId, year, type) => {
  try {
    const values = [userId, year, type];
    const sql = `select sum(amount) as total_amount, date_trunc('month', date_time_utc) as month from transaction where profile_id=$1 and date_part('year', date_time_utc)=$2 and type=$3 group by month`;
    const data = await pool.query(sql, values);
  
    return {
      data
    };
  } catch (error) {
    return { message, error };
  }
}

const getTransactionsByTotalAmountPerDay = async (userId, year, month, type) => {
  try {
    const values = [userId, year, month, type];
    const sql = `select sum(amount) as total_amount, date_trunc('day', date_time_utc) as day from transaction where profile_id=$1 and date_part('year', date_time_utc)=$2 and date_part('month', date_time_utc)=$3 and type=$4 group by day`;
    const data = await pool.query(sql, values);
  
    return {
      data
    };
  } catch (error) {
    return { message, error };
  }
}

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
  getTransactionsByTotalAmountPerYear,
  getTransactionsByTotalAmountPerMonth,
  getTransactionsByTotalAmountPerDay,
  addTransaction,
  updateTransaction,
  removeTransaction,
};
