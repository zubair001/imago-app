import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
const API_URL = `${API_BASE_URL}/search`;

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

export const searchMedia = async (
  query: string,
  dateCreated1?: string,
  dateCreated2?: string,
  sortBy: "asc" | "desc" = "desc",
  page: number = 0,
  size: number = 10
): Promise<MediaResponse[]> => {
  try {
    const response = await axios.get<MediaResponse[]>(`${API_URL}`, {
      params: {
        querystring: query,
        dateCreated1,
        dateCreated2,
        sortBy,
        page,
        size,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching media:", error);
    return [];
  }
};
