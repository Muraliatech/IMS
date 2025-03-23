// api/supplier.js
import axios from 'axios';

const API_URL = "http://localhost:5000/api";


export interface ProposePriceResponse {
    // Define the structure of the response data if known
}

export const proposePriceForOrder = async (orderId: string, price: number): Promise<ProposePriceResponse> => {
    const response = await axios.patch<ProposePriceResponse>(`${API_URL}/supplier/proposePriceForOrder/${orderId}`, { price });
    return response.data;
};

interface UpdateProductionStatusResponse {
    // Define the structure of the response data if known
}

interface UpdateProductionStatusRequest {
    status: string;
}

export const updateProductionStatus = async (orderId: string, status: string): Promise<UpdateProductionStatusResponse> => {
    const response = await axios.patch<UpdateProductionStatusResponse>(`${API_URL}/supplier/updateProductionStatus/${orderId}`, { status } as UpdateProductionStatusRequest);
    return response.data;
};

export const initiateQualityCheck = async (orderId: number) => {
    const response = await axios.patch(`${API_URL}/supplier/initiate-QC/${orderId}`);
    return response.data;
};

interface UpdateShippingStatusResponse {
    // Define the structure of the response data if known
}

interface UpdateShippingStatusRequest {
    status: string;
}

export const updateShippingStatus = async (orderId: string, status: string): Promise<UpdateShippingStatusResponse> => {
    const response = await axios.patch<UpdateShippingStatusResponse>(`${API_URL}/supplier/delivery/${orderId}`, { status } as UpdateShippingStatusRequest);
    return response.data;
};