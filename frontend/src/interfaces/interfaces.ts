// src/api/interfaces.ts
export interface MediaResponse {
  id: string;
  title: string;
  description: string;
  photographer: string;
  height: number;
  width: number;
  date: string;
  source: string;
}

export interface SearchResponse<T> {
  totalRows: number;
  pageSize: number;
  pageNumber: number;
  sortBy: string;
  results: T[];
}

export interface ImageTileProps {
    image: MediaResponse;
  }  
