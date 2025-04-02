import { Logger } from '@/utils/logger';
import { v4 as uuidv4 } from 'uuid';

export class ApiClient {
  static async request(url: string, options: RequestInit = {}) {
    const requestId = uuidv4(); // Unique request ID
    Logger.info(`Request ${requestId} started`, { url, options });

    try {
      const response = await fetch(url, options);
      const responseData = await response.json();

      Logger.info(`Request ${requestId} completed`, responseData);

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      return responseData;
    } catch (error) {
      Logger.error(`Request ${requestId} failed`, error);
      throw error; // Ensure error is handled properly
    }
  }
}
