export const host = "http://localhost:3000"; 
//"http://192.168.137.1:3000";
//  "http://localhost:3000"; 
//"http://172.16.3.75:3000"

export const RegisterRoute = `${host}/api/auth/register`;
export const LoginRoute = `${host}/api/auth/login`;
export const SetAvatarRoute = `${host}/api/auth/setAvatar`;
export const allUsersRoute = `${host}/api/auth/allusers`;
export const logoutRoute = `${host}/api/auth/logout`;
export const sendMessageRoute =`${host}/api/messages/addmsg`;
export const recieveMessageRoute =`${host}/api/messages/getmsg`;
export const sendImageRoute =`${host}/api/image/addimg`;
export const recieveImageRoute =`${host}/api/image/getimg`;