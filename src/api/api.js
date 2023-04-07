import axios from 'axios';
export const baseURL = ("http://localhost:3000");

const API = axios.create({ baseURL: baseURL });
export default API

// START ============== ADD NEW EVENT ==============
export const AddNewEventDataToDatabase = (eventData) => axios({
    method: "post",
    url: baseURL + "/admin/setevent", eventData,
    headers: { 'Content-Type': 'multipart/form-data' },
    data: eventData
});
export const CommitteeAddNewEventDataToDatabase = (committeeEventData) => axios({
    method: "post",
    url: baseURL + "/committee/setevent", committeeEventData,
    headers: { 'Content-Type': 'multipart/form-data' },
    data: committeeEventData
});

export const UploadNewCommitteeAdvertisement = (data) => axios({
    method: "post",
    url: baseURL + "/committee/setadvertisement",
    headers: { 'Content-Type': 'multipart/form-data' },
    data: data
});

export const GetAllCommitteeEventDetails = () => API.get(baseURL + "/committee/getevents");

export const GetAdvertisements= () => API.get(baseURL + "/admin/getadvertisements");
export const GetSponserships= () => API.get(baseURL + "/admin/getsponserships");

// UpdateAdminSponsershipFormById
export const UpdateAdminSponsershipFormById = (data) => API.post(baseURL + "/admin/updatesponsership", data);

export const UpdateAdminAdvertisementById = (data) => API.post(baseURL + "/admin/updateadvertisement", data);

export const submitSponsershipForm = (data) => API.post(baseURL + "/committee/setsponsershipform",data)

export const UpdateAdminEventById = (data) => API.post(baseURL + "/admin/updateevent", data);


export const GetAllEventDetails = () => API.get(baseURL + "/admin/getevents");

export const GetCoinSupplyRedeemedAmount = () => API.get(baseURL + "/admin/getsupplyredeemed");

export const GetStudentApplicationsDetails = () => API.get(baseURL + "/admin/getstudentapplications");

export const UpdateCoinsByStudentId = (data) => API.post(baseURL + "/admin/updatestudentapplication", data);

export const RejectApplicationByStudentId = (data) => API.post(baseURL + "/admin/updatestudentapplication", data);

export const FlushCanteenCoinsByPayment = () => API.get(baseURL + "/admin/flushcanteen");

export const FlushStationeryCoinsByPayment = () => API.get(baseURL + "/admin/flushstationery");
// export const GetPayeeBalances = () => API.get(baseURL + "/getpayeebalances");

// export const UploadNewAdvertisement = (data) => API.post(baseURL + "/setadvertisement", data);

export const UploadNewAdvertisement = (data) => axios({
    method: "post",
    url: baseURL + "/admin/setadvertisement",
    headers: { 'Content-Type': 'multipart/form-data' },
    data: data
});