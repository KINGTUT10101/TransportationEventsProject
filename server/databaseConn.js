import pkg from 'pg';

//Connect to pgSQL
const { Pool } = pkg;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'transportProject',
    password: 'password',
    port: 5432,
});
export default pool;
