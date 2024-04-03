import { GeckoTerminalApi } from './api';
import test from 'node:test';

console.log('RUNNING TESTS');

const api = new GeckoTerminalApi();

// const network = 'ton'
// const token1 = 'EQC0KYVZpwR-dTkPwVRqagH2D31he931R7oUbPIBo_77F97K'

// const eth = 'eth'
// const ethToken = '0x60594a405d53811d3bc4766596efd80fd545a270'
// const ethDex = "sushiswap"
// test('test simple', async () => {
//     const res = await api.getSimple(network, token1);

//     console.log(res.data)
// })

// test('test networks', async () => {
//     const res = await api.getNetworks();
//     console.log(res.data)
// })

// test('test dexes', async () => {
//     const res = await api.getDexes(network, 1);
//     console.log(res.data)
// })

// test('test trending pool', async () => {
//     const res = await api.getTrendingPools(network);
//     console.log(res.data)
// })

// test('test trending pool on network', async () => {
//     const res = await api.getTrendingPoolsOnNetwork(network);
//     console.log(res.data)
// })

// test('test specific pool', async () => {
//     const res = await api.getSpecificPool(eth, ethToken);
//     console.log(res.data)
// })

// test('test specific pool on network', async () => {
//     const res = await api.getMultiplePoolsOnNetwork(eth, ethToken);
//     console.log(res.data)
// })

// test('test pool detail', async () => {
//     const res = await api.getTopPools(network);
//     console.log(res.data)
// })

// test('test pool detail on dex network', async () => {
//     const res = await api.getTopPoolsOnNetworkDex(eth, ethDex);
//     console.log(res.data)
// })

// test('test new pool on dex network', async () => {
//     const res = await api.getTopPoolsOnNetworkDex(eth, ethDex);
//     console.log(res.data)
// })

// test('test new pool on network', async () => {
//     const res = await api.getNewPoolsOnNetwork(eth);
//     console.log(res.data)
// })

// test('test new pools', async () => {
//     const res = await api.getNewPools();
//     console.log(res.data)
// })

// test('test search for pools on network', async () => {
//     const res = await api.searchForPoolsOnNetwork('ETH');
//     console.log(res.data)
// })

// test('test get top pools for tokens', async () => {
//     const res = (await api.getTopPoolsForToken(network, token1)).data;
//     console.log(res.length)
//     for (let index = 0; index < res.length; index++) {
//         const element = res[index];

//         console.log(element.id)
//         console.log(element.type)
//         console.log(element.attributes)
//         console.log(element.relationships)
//     }
// })

// test('test get ohlc', async () => {
//     const res = await api.getOhlcvs('eth', '0x60594a405d53811d3bc4766596efd80fd545a270');
//     console.log(res.data)
// })
