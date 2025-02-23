// src/logger/logMessages.ts

export const LOG_MESSAGES = {
  healthCheck: {
    success: 'Elasticsearch health check passed: %o',
    failure: 'Failed to check Elasticsearch health: %o',
  },
  media: {
    init: 'Initializing Media Service...',
  },
  elasticSearch: {
    success: 'Successfully connected to Elasticsearch',
    failure: 'Elasticsearch connection failed',
  },
  search: {
    missingQueryParam: 'Search request missing "queryString" parameter',
    receivedRequest: 'Received search request with parameters: %o',
    success: 'Search completed successfully.',
    failure: 'Error performing media search for query',
  },
  error: {
    genericError: 'An unexpected error occurred:',
  },
};
