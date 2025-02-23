import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
import { MediaResponse, SearchResponse } from "../interfaces/interfaces";
const API_URL = `${API_BASE_URL}/search`;

export const searchMedia = async (
  query: string,
  startDate?: string,
  endDate?: string,
  sortBy: "asc" | "desc" = "desc",
  page: number = 1,
  size: number = 10
): Promise<SearchResponse<MediaResponse> | null> => {
  try {
    const params: Record<string, string | number> = { queryString: query };

    // Conditionally add parameters if they are available
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    if (sortBy) params.sortBy = sortBy;
    if (page) params.page = page;
    if (size) params.size = size;

    const response = await axios.get<SearchResponse<MediaResponse>>(
      `${API_URL}`,
      {
        params,
      }
    );
    console.log("Query Response:", response);

    return response.data;
  } catch (error) {
    console.error("Error fetching media:", error);
    return null;
  }
};
