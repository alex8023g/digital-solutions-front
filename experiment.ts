const sequence = [...Array(1000_000).keys()];
const lastSequence = sequence.slice(-100);
console.log('🚀 ~ lastSequence:', lastSequence, sequence);
