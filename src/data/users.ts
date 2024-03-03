
let users: { id: number, name: string, email: string, verified: boolean }[] = [];

for (let i = 22; i <= 32; i++) {
    users.push({
        id: i,
        name: `User ${i}`,
        email: `user${i}@gmail.com`,
        verified: false
    });
}

export default users;