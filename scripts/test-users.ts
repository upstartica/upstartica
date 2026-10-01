import { config } from 'dotenv';
config({ path: '.env.local' });
import { getAllUsers } from '../lib/r2';

async function main() {
    const users = await getAllUsers();
    console.log("Users:", users);
}

main().catch(console.error);
