    const apiUrl="http://localhost:9080/g-note/api/v1";
    const authUrl = `${apiUrl}/auth`;
    const login = `${authUrl}/login`;
    const register = `${authUrl}/register`;
    const logout = `${authUrl}/logout`;
    const isAuthenticated = `${apiUrl}/isAuthenticated`;
    const adminUrl = "http://localhost:9080/g-note/api/v1/admin";
    const usersResource = `${adminUrl}/users`;
    const verifyUser = `${adminUrl}/user/verify`;
    const deleteUser =  `${adminUrl}/user`;
    const newNote =  `${apiUrl}/notes`;
    const allNotes =  `${newNote}/all`;
    const deleteNote=`${apiUrl}/notes`;

export default {
    apiUrl,
    authUrl,
    login,
    register,
    logout,
    isAuthenticated,
    adminUrl,
    usersResource,
    verifyUser,
    deleteUser,
    newNote,
    allNotes,
    deleteNote
};