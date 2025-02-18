import { getData } from './lib/service.js';

async function axiosData() {
    const data = await getData(1);
}

axiosData();
