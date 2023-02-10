import axios from 'axios';
export const baseURL = ("https://vgc-server.onrender.com/admin");

const API = axios.create({ baseURL: baseURL });
export default API;

// START ============== ADD NEW EVENT ==============
export const AddNewEventDataToDatabase = (eventData) => axios({
    method: "post",
    url: baseURL + "/setevent", eventData,
    headers: { 'Content-Type': 'multipart/form-data' },
    data: eventData
});

export const GetAllEventDetails = () => API.get(baseURL + "/getevents");

export const GetCoinSupplyRedeemedAmount = () => API.get(baseURL + "/getsupplyredeemed");

export const GetStudentApplicationsDetails = () => API.get(baseURL + "/getstudentapplications");

export const UpdateCoinsByStudentId = (data) => API.post(baseURL + "/updatestudentapplication", data);

export const RejectApplicationByStudentId = (data) => API.post(baseURL + "/updatestudentapplication", data);

export const FlushCanteenCoinsByPayment = () => API.get(baseURL + "/flushcanteen");

export const FlushStationeryCoinsByPayment = () => API.get(baseURL + "/flushstationery");
// export const GetPayeeBalances = () => API.get(baseURL + "/getpayeebalances");

// export const UploadNewAdvertisement = (data) => API.post(baseURL + "/setadvertisement", data);

export const UploadNewAdvertisement = (data) => axios({
    method: "post",
    url: baseURL + "/setadvertisement",
    headers: { 'Content-Type': 'multipart/form-data' },
    data: data
});