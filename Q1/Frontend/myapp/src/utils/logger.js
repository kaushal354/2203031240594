const logger = {
  logInfo: (...args) => {
    // Custom logger instead of console.log
    const timestamp = new Date().toISOString();
    document.dispatchEvent(new CustomEvent('app-log', { detail: { timestamp, level: 'INFO', args } }));
  }
};
export default logger;