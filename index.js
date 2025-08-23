// // // index.js
// // const { Connection } = require('@solana/web3.js');
// // const { RPC_URL, POLL_INTERVAL_MS, SPEND_REFRESH_MS } = require('./config');
// // const { ingestTransfer, updateBalances, detectClusterBehavior } = require('./cluster');
// // const { startApi } = require('./api');

// // if (!RPC_URL) {
// //   console.error('Missing RPC_URL in .env');
// //   process.exit(1);
// // }

// // const connection = new Connection(RPC_URL, 'confirmed');
// // console.log('Connected to RPC:', RPC_URL);

// // let lastProcessedSlot = 0;

// // async function processSlot(slot) {
// //   let attempt = 0;
// //     const maxAttempts = 5;
// //     const baseDelay = 500;

// //     while (attempt < maxAttempts) {
// //     try {
// //       console.log(`Processing slot ${slot}...`);
// //       const block = await connection.getParsedBlock(slot, {
// //         maxSupportedTransactionVersion: 0,
// //         commitment: 'confirmed',
// //       });
// //       if (!block || !block.blockTime || !block.transactions) {
// //         console.log(`No data for slot ${slot}`);
// //         return;
// //       }

// //       const blockTime = block.blockTime;
// //       console.log(`Block ${slot} time: ${new Date(blockTime * 1000).toISOString()}`);

// //       for (const tx of block.transactions) {
// //         const ixns = tx.transaction.message.instructions || [];
// //         for (const ix of ixns) {
// //           if (ix.program === 'system' && ix.parsed?.type === 'transfer') {
// //             const info = ix.parsed.info;
// //             const from = info.source;
// //             const to = info.destination;
// //             const lamports = Number(info.lamports) || 0;
// //             if (lamports > 0) {
// //               console.log(`SOL transfer: ${from} -> ${to}, ${lamports} lamports`);
// //               ingestTransfer({
// //                   parent: from,
// //                   child: to,
// //                 lamports,
// //                 ts: blockTime,
// //                 slot: slot,
// //               });
// //             }
// //           } else if (ix.programId && (ix.programId.toString() === 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL' || // Token Program
// //                      ix.programId.toString() === '675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8' || // Raydium AMM
// //                      ix.programId.toString() === '6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P')) { // pump.fun
// //             console.log(`Potential DEX/Token instruction detected in slot ${slot}`);
// //             detectClusterBehavior(tx, blockTime, slot);
// //           }
// //         }
// //       }
// //       return;
// //     } catch (e) {
// //       if (e.response?.status === 429 && attempt < maxAttempts - 1) {
// //         const delay = baseDelay * Math.pow(2, attempt);
// //         console.log(`Server responded with 429 Too Many Requests for slot ${slot}. Retrying after ${delay}ms delay...`);
// //         await new Promise(resolve => setTimeout(resolve, delay));
// //         attempt++;
// //       } else {
// //         console.error(`Failed to process slot ${slot}:`, e?.message || e);
// //         return;
// //       }
// //     }
// //   }
// // }

// // async function poll() {
// //   try {
// //     console.log('Starting poll cycle...');
// //     const current = await connection.getSlot('confirmed');
// //     console.log(`Current slot: ${current}`);

// //     if (lastProcessedSlot === 0) {
// //       lastProcessedSlot = current - 2;
// //       console.log(`Initial lastProcessedSlot set to: ${lastProcessedSlot}`);
// //     }

// //     for (let s = lastProcessedSlot + 1; s <= current; s++) {
// //       await processSlot(s);
// //       lastProcessedSlot = s;
// //       await new Promise(resolve => setTimeout(resolve, 1000)); 
// //     }
// //     console.log(`Poll cycle completed. Last processed slot: ${lastProcessedSlot}`);
// //   } catch (e) {
// //     console.error('poll error', e?.message || e);
// //   }
// // }

// // async function start() {
// //   console.log('Starting monitor…');
// //   startApi(3000);

// //   setInterval(poll, POLL_INTERVAL_MS);
// //   setInterval(() => {
// //     console.log('Starting balance update cycle...');
// //     updateBalances(connection).then(() => console.log('Balance update cycle completed.'));
// //   }, SPEND_REFRESH_MS);

// //   await poll();
// //   await updateBalances(connection);
// // }

// // start().catch(console.error);

// // index.js
// const { Connection } = require('@solana/web3.js');
// const { RPC_URL, POLL_INTERVAL_MS, SPEND_REFRESH_MS } = require('./config');
// const { ingestTransfer, updateBalances, getClusterStats } = require('./cluster');
// const { startApi } = require('./api');

// if (!RPC_URL) {
//   console.error('Missing RPC_URL in .env - using mainnet default');
// }

// // Use mainnet-beta for production
// const connection = new Connection(RPC_URL || 'https://api.mainnet-beta.solana.com', 'confirmed');
// console.log('Connected to Solana Mainnet RPC:', RPC_URL || 'https://api.mainnet-beta.solana.com');

// let lastProcessedSlot = 0;

// async function processSlot(slot) {
//   let attempt = 0;
//   const maxAttempts = 3;
//   const baseDelay = 1000;

//   while (attempt < maxAttempts) {
//     try {
//       console.log(`Processing slot ${slot}...`);
//       const block = await connection.getParsedBlock(slot, {
//         maxSupportedTransactionVersion: 0,
//         commitment: 'confirmed',
//       });

//       if (!block || !block.blockTime || !block.transactions) {
//         console.log(`No data for slot ${slot}`);
//         return;
//       }

//       const blockTime = block.blockTime;
//       console.log(`Block ${slot} time: ${new Date(blockTime * 1000).toISOString()}, transactions: ${block.transactions.length}`);

//       // Process all transactions in the block
//       for (const tx of block.transactions) {
//         // Skip failed transactions
//         if (tx.meta?.err) {
//           continue;
//         }

//         const ixns = tx.transaction.message.instructions || [];
        
//         for (const ix of ixns) {
//           // Only process SOL transfers via system program
//           if (ix.program === 'system' && ix.parsed?.type === 'transfer') {
//             const info = ix.parsed.info;
//             const from = info.source;
//             const to = info.destination;
//             const lamports = Number(info.lamports) || 0;

//             if (lamports > 0) {
//               console.log(`SOL transfer detected: ${from.slice(0, 6)}...${from.slice(-4)} -> ${to.slice(0, 6)}...${to.slice(-4)}, ${(lamports / 1_000_000_000).toFixed(6)} SOL`);
              
//               ingestTransfer({
//                 parent: from,
//                 child: to,
//                 lamports,
//                 ts: blockTime,
//                 slot: slot,
//               });
//             }
//           }
//         }
//       }

//       return; // Success, exit retry loop
//     } catch (e) {
//       if ((e.response?.status === 429 || e.message?.includes('429') || e.message?.includes('Too Many Requests')) && attempt < maxAttempts - 1) {
//         const delay = baseDelay * Math.pow(2, attempt);
//         console.log(`Rate limit hit for slot ${slot}. Retrying after ${delay}ms delay... (attempt ${attempt + 1}/${maxAttempts})`);
//         await new Promise(resolve => setTimeout(resolve, delay));
//         attempt++;
//       } else {
//         console.error(`Failed to process slot ${slot} after ${attempt + 1} attempts:`, e?.message || e);
//         return;
//       }
//     }
//   }
// }

// async function poll() {
//   try {
//     console.log('Starting poll cycle...');
//     const current = await connection.getSlot('confirmed');
//     console.log(`Current slot: ${current}`);

//     if (lastProcessedSlot === 0) {
//       // Start from 5 slots back to catch recent activity
//       lastProcessedSlot = current - 5;
//       console.log(`Initial lastProcessedSlot set to: ${lastProcessedSlot}`);
//     }

//     // Process missed slots (but limit to prevent overwhelming)
//     const maxSlotsToProcess = 10;
//     const startSlot = Math.max(lastProcessedSlot + 1, current - maxSlotsToProcess);
    
//     for (let s = startSlot; s <= current; s++) {
//       await processSlot(s);
//       lastProcessedSlot = s;
      
//       // Small delay between slots to avoid rate limits
//       await new Promise(resolve => setTimeout(resolve, 200));
//     }

//     const stats = getClusterStats();
//     console.log(`Poll cycle completed. Last processed slot: ${lastProcessedSlot}, Active clusters: ${stats.activeClusters}/${stats.totalClusters}`);
//   } catch (e) {
//     console.error('Poll error:', e?.message || e);
//   }
// }

// async function start() {
//   console.log('🚀 Starting Solana Cluster Monitor for MAINNET...');
//   console.log('📊 Requirements: ≥5 children, ≥20 SOL total, ≥1 SOL per transfer, 10s detection window');
  
//   // Start API server
//   startApi(3001);
  
//   // Set up intervals
//   console.log(`⏱️  Polling every ${POLL_INTERVAL_MS}ms, Balance updates every ${SPEND_REFRESH_MS}ms`);
  
//   const pollInterval = setInterval(poll, POLL_INTERVAL_MS);
//   const balanceInterval = setInterval(() => {
//     console.log('🔄 Starting balance update cycle...');
//     updateBalances(connection)
//       .then(() => {
//         const stats = getClusterStats();
//         console.log(`✅ Balance update completed. Active clusters: ${stats.activeClusters}`);
//       })
//       .catch(err => console.error('❌ Balance update failed:', err.message));
//   }, SPEND_REFRESH_MS);

//   // Initial run
//   await poll();
//   await updateBalances(connection);
  
//   console.log('✅ Monitor started successfully!');
  
//   // Graceful shutdown
//   process.on('SIGINT', () => {
//     console.log('🛑 Shutting down gracefully...');
//     clearInterval(pollInterval);
//     clearInterval(balanceInterval);
//     process.exit(0);
//   });
// }

// start().catch(error => {
//   console.error('❌ Failed to start monitor:', error);
//   process.exit(1);
// });

// index.js
const { Connection } = require('@solana/web3.js');
const { RPC_URL, POLL_INTERVAL_MS, SPEND_REFRESH_MS } = require('./config');
const { ingestTransfer, updateBalances, getClusterStats } = require('./cluster');
const { startApi } = require('./api');

if (!RPC_URL) {
  console.error('Missing RPC_URL in .env - using mainnet default');
}

// Use mainnet-beta for production
const connection = new Connection(RPC_URL || 'https://api.mainnet-beta.solana.com', 'confirmed');
console.log('Connected to Solana Mainnet RPC:', RPC_URL || 'https://api.mainnet-beta.solana.com');

let lastProcessedSlot = 0;

async function processSlot(slot) {
  let attempt = 0;
  const maxAttempts = 3;
  const baseDelay = 1000;

  while (attempt < maxAttempts) {
    try {
      console.log(`Processing slot ${slot}...`);
      const block = await connection.getParsedBlock(slot, {
        maxSupportedTransactionVersion: 0,
        commitment: 'confirmed',
      });

      if (!block || !block.blockTime || !block.transactions) {
        console.log(`No data for slot ${slot}`);
        return;
      }

      const blockTime = block.blockTime;
      console.log(`Block ${slot} time: ${new Date(blockTime * 1000).toISOString()}, transactions: ${block.transactions.length}`);

      // Process all transactions in the block
      for (const tx of block.transactions) {
        // Skip failed transactions
        if (tx.meta?.err) {
          continue;
        }

        const ixns = tx.transaction.message.instructions || [];
        
        for (const ix of ixns) {
          // Only process SOL transfers via system program
          if (ix.program === 'system' && ix.parsed?.type === 'transfer') {
            const info = ix.parsed.info;
            const from = info.source;
            const to = info.destination;
            const lamports = Number(info.lamports) || 0;

            if (lamports > 0) {
              console.log(`SOL transfer detected: ${from.slice(0, 6)}...${from.slice(-4)} -> ${to.slice(0, 6)}...${to.slice(-4)}, ${(lamports / 1_000_000_000).toFixed(6)} SOL`);
              
              ingestTransfer({
                parent: from,
                child: to,
                lamports,
                ts: blockTime,
                slot: slot,
              });
            }
          }
        }
      }

      return; // Success, exit retry loop
    } catch (e) {
      if ((e.response?.status === 429 || e.message?.includes('429') || e.message?.includes('Too Many Requests')) && attempt < maxAttempts - 1) {
        const delay = baseDelay * Math.pow(2, attempt);
        console.log(`Rate limit hit for slot ${slot}. Retrying after ${delay}ms delay... (attempt ${attempt + 1}/${maxAttempts})`);
        await new Promise(resolve => setTimeout(resolve, delay));
        attempt++;
      } else {
        console.error(`Failed to process slot ${slot} after ${attempt + 1} attempts:`, e?.message || e);
        return;
      }
    }
  }
}

async function poll() {
  try {
    console.log('Starting poll cycle...');
    const current = await connection.getSlot('confirmed');
    console.log(`Current slot: ${current}`);

    if (lastProcessedSlot === 0) {
      // Start from 5 slots back to catch recent activity
      lastProcessedSlot = current - 5;
      console.log(`Initial lastProcessedSlot set to: ${lastProcessedSlot}`);
    }

    // Process missed slots (but limit to prevent overwhelming)
    const maxSlotsToProcess = 10;
    const startSlot = Math.max(lastProcessedSlot + 1, current - maxSlotsToProcess);
    
    for (let s = startSlot; s <= current; s++) {
      await processSlot(s);
      lastProcessedSlot = s;
      
      // Small delay between slots to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    const stats = getClusterStats();
    console.log(`Poll cycle completed. Last processed slot: ${lastProcessedSlot}, Active clusters: ${stats.activeClusters}/${stats.totalClusters}`);
  } catch (e) {
    console.error('Poll error:', e?.message || e);
  }
}

async function start() {
  console.log('🚀 Starting Solana Cluster Monitor for MAINNET...');
  console.log('📊 Requirements: ≥5 children, ≥20 SOL total, ≥1 SOL per transfer, 10s detection window');
  console.log('⚡ REAL-TIME MODE: New clusters appear immediately!');
  
  // Start API server
  startApi(3001);
  
  // Set up intervals with faster balance updates for real-time data
  console.log(`⏱️  Polling every ${POLL_INTERVAL_MS}ms, Balance updates every 15s for real-time data`);
  
  const pollInterval = setInterval(poll, POLL_INTERVAL_MS);
  
  // Update balances every 15 seconds for faster real-time data
  const balanceInterval = setInterval(() => {
    console.log('🔄 Starting real-time balance update...');
    updateBalances(connection)
      .then(() => {
        const stats = getClusterStats();
        console.log(`✅ Real-time update completed. Active clusters: ${stats.activeClusters} (sorted by newest first)`);
      })
      .catch(err => console.error('❌ Balance update failed:', err.message));
  }, 15000); // 15 seconds for faster updates

  // Initial run
  await poll();
  
  // Initial balance update after 5 seconds to let some data accumulate
  setTimeout(async () => {
    console.log('🎯 Running initial balance update...');
    await updateBalances(connection);
  }, 5000);
  
  console.log('✅ Real-time monitor started successfully!');
  
  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log('🛑 Shutting down gracefully...');
    clearInterval(pollInterval);
    clearInterval(balanceInterval);
    process.exit(0);
  });
}

start().catch(error => {
  console.error('❌ Failed to start monitor:', error);
  process.exit(1);
});