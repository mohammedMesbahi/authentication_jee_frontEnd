interface User {
    id: number;
    name: string;
    email: string;
    password?: string;
    admin?: boolean;
    verified: boolean;
}
export default User;