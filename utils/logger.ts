export class Logger {
    static info(message: string, data?: any) {
      console.info(`[INFO]: ${message}`, data || '');
    }
  
    static warn(message: string, data?: any) {
      console.warn(`[WARNING]: ${message}`, data || '');
    }
  
    static error(message: string, error?: any) {
      console.error(`[ERROR]: ${message}`, error || '');
    }
  }
  